'use strict';
/* ============================================================
 * 大狗答题 — C++/算法 编程练习系统
 * 基于原"大狗Tap"改造：
 *   · 保留 音频引擎/角色动画/全屏特效
 *   · 新增 练习答题 & 模拟考试 两种模式
 *   · 删除 节拍交互/网格/钢琴/BGM合成
 * ============================================================ */

/* ---------- 音频常量 ---------- */
const MASTER_GAIN = 0.85;

/* ---------- 角色素材配置 ---------- */
const CHARACTER_IMAGE_SETS = Object.freeze({
  dagou: Object.freeze({
    close: 'Image/dagou_close_mouth.png',
    open: 'Image/dagou_open_mouth.png',
    alt: '大狗',
  }),
  dingdong: Object.freeze({
    close: 'Image/dingdongji_close_mouth.png',
    open: 'Image/dingdongji_open_mouth.png',
    alt: '叮咚鸡',
  }),
  hajimi: Object.freeze({
    close: 'Image/maodie_close_mouth.png',
    open: 'Image/maodie_open_mouth.png',
    alt: '哈基米',
  }),
});

/* ---------- 音效增益 ---------- */
const SFX_SAMPLE_GAIN = Object.freeze({
  da: 1.0, gou: 1.01, jiao: 0.95,
  ha: 1.28, ji: 1.48, mi: 1.48,
  dingdongji_ding: 2.59, dingdongji_dong: 2.36, dingdongji_ji: 2.35,
});

/* ---------- 全局音频状态 ---------- */
let ctx = null;
let master = null;
let bgmBus = null;
let sfxBus = null;
let noiseBuf = null;
let bgmMuted = false;
let sfxMuted = false;
const buffers = {};
let bgmTimer = 0;

/* ---------- 角色动画状态 ---------- */
let mouthTimer = 0;
let mouthPopped = false;
let barkPop = 0;
let barkPopVel = 0;
const BARK_KICK = 5.2;
let holding = false;
let holdLevel = 0;
let jellyScale = 1;
let jellyVel = 0;
let lastTick = 0;
let mouthVoice = null;

/* ---------- 特效引擎状态 ---------- */
const C = {
  cream: '#fff2dc',
  amber: '#ffb400',
  gray:  '#87837e',
  coral: '#ff5a5f',
  teal:  '#16c2a3',
  blue:  '#3e7bfa',
};
const ACCENTS = [C.coral, C.teal, C.blue];
function pickColor(rng) {
  const r = rng();
  if (r < 0.62) return C.amber;
  if (r < 0.9) return C.gray;
  return ACCENTS[(rng() * ACCENTS.length) | 0];
}
const EFFECTS = ['rings','poly','spiral','rays','confetti','zigzag','pop','cross','orbit','wave','stars','grid'];
const FX_IN = 0.55, FX_OUT = 0.4;
let fxW = 0, fxH = 0;
let fxList = [];
let beatP = 0;

/* ---------- 答题状态 ---------- */
const QUIZ_STATE = Object.freeze({
  MODE_SELECT: 'mode_select',
  TOPIC_SELECT: 'topic_select',
  QUESTION: 'question',
  FEEDBACK: 'feedback',
  RESULTS: 'results',
});
let quizState = QUIZ_STATE.MODE_SELECT;
let quizMode = null;
let currentQuestionIndex = 0;
let selectedQuestions = [];
let userAnswers = [];
let currentTopic = null;

/* ---------- 考试倒计时 ---------- */
const EXAM_DURATION = 2 * 60 * 60; // 2小时 = 7200秒
let examTimerRemaining = EXAM_DURATION;
let examTimerInterval = 0;

/* ---------- DOM 引用 ---------- */
const stage     = document.getElementById('stage');
const fxCanvas  = document.getElementById('fx');
const dogEl     = document.getElementById('dog');
const dogInner  = document.getElementById('dog-inner');
const dogJelly  = document.getElementById('dog-jelly');
const dogCloseImage = document.getElementById('dog-close');
const dogOpenImage  = document.getElementById('dog-open');
const fx2d      = fxCanvas.getContext('2d');

const overlay        = document.getElementById('overlay');
const topicSelector  = document.getElementById('topic-selector');
const topicList      = document.getElementById('topic-list');
const quizArea       = document.getElementById('quiz-area');
const feedbackBubble  = document.getElementById('feedback-bubble');
let feedbackTimer = 0;
let feedbackCountdown = 0;
const resultsArea    = document.getElementById('results-area');

const topControls    = document.getElementById('top-controls');
const musicToggle    = document.getElementById('music-toggle');
const sfxToggle      = document.getElementById('sfx-toggle');
const btnBack        = document.getElementById('btn-back');

/* ============================================================
 * 音频引擎（保留自原项目）
 * ==========================================================*/
function initAudio() {
  ctx = new (window.AudioContext || window.webkitAudioContext)();
  master = ctx.createGain();
  master.gain.value = MASTER_GAIN;
  bgmBus = ctx.createGain();
  bgmBus.gain.value = bgmMuted ? 0 : 1;
  sfxBus = ctx.createGain();
  sfxBus.gain.value = sfxMuted ? 0 : 1;
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -14;
  comp.knee.value = 24;
  comp.ratio.value = 5;
  comp.attack.value = 0.004;
  comp.release.value = 0.18;
  bgmBus.connect(master);
  sfxBus.connect(master);
  master.connect(comp);
  comp.connect(ctx.destination);

  noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
}

function b64ToArrayBuffer(b64) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
}

async function loadSamples() {
  const SAMPLE_NAMES = ['da','gou','jiao','ha','ji','mi','dingdongji_ding','dingdongji_dong','dingdongji_ji'];
  for (const n of SAMPLE_NAMES) {
    const encoded = AUDIO_B64[n];
    if (typeof encoded !== 'string' || encoded.length === 0) {
      throw new Error(`Missing audio sample: ${n}`);
    }
    buffers[n] = await ctx.decodeAudioData(b64ToArrayBuffer(encoded));
  }
}

function setBusMuted(bus, muted) {
  if (!ctx || !bus) return;
  const now = ctx.currentTime;
  bus.gain.cancelScheduledValues(now);
  bus.gain.setTargetAtTime(muted ? 0 : 1, now, 0.015);
}

function updateMuteButton(button, muted, label) {
  const action = muted ? '开启' : '关闭';
  button.classList.toggle('is-muted', muted);
  button.setAttribute('aria-pressed', String(muted));
  button.setAttribute('aria-label', `${action}${label}`);
  button.title = `${action}${label}`;
}

function toggleMusic() {
  bgmMuted = !bgmMuted;
  setBusMuted(bgmBus, bgmMuted);
  updateMuteButton(musicToggle, bgmMuted, '音乐');
}

function toggleSoundEffects() {
  sfxMuted = !sfxMuted;
  setBusMuted(sfxBus, sfxMuted);
  updateMuteButton(sfxToggle, sfxMuted, '音效');
  if (sfxMuted) {
    dogInner.classList.remove('bark-image');
  } else if (mouthVoice) {
    dogInner.classList.add('bark-image');
  }
}

/* ============================================================
 * 简化 BGM（轻量 kick+hat 循环，保持背景节奏感）
 * ==========================================================*/
function playKick(t) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(160, t);
  o.frequency.exponentialRampToValueAtTime(45, t + 0.11);
  g.gain.setValueAtTime(0.55, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
  o.connect(g); g.connect(bgmBus);
  o.start(t); o.stop(t + 0.24);
}

function playHat(t) {
  const n = ctx.createBufferSource(); n.buffer = noiseBuf;
  const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 7500;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.12, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
  n.connect(f); f.connect(g); g.connect(bgmBus);
  n.start(t); n.stop(t + 0.06);
}

function startBGM() {
  if (!ctx) return;
  const BPM = 128;
  const beat = 60 / BPM;
  let step = 0;

  function schedule() {
    const horizon = ctx.currentTime + 0.2;
    while (bgmTimer < horizon) {
      const bar = (step / 16) | 0;
      const pos = step % 16;
      if (bar === 0 && pos === 0) {
        const n = ctx.createBufferSource(); n.buffer = noiseBuf;
        const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 5000;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.18, bgmTimer);
        g.gain.exponentialRampToValueAtTime(0.001, bgmTimer + 0.8);
        n.connect(f); f.connect(g); g.connect(bgmBus);
        n.start(bgmTimer); n.stop(bgmTimer + 0.9);
      }
      if (pos % 4 === 0) playKick(bgmTimer);
      if (pos % 2 === 0) playHat(bgmTimer);
      bgmTimer += beat / 4;
      step = (step + 1) % 64;
    }
  }

  bgmTimer = ctx.currentTime + 0.1;
  setInterval(schedule, 50);
}

/* ============================================================
 * 反馈音效播放（无节拍同步，直接触发）
 * ==========================================================*/
function playFeedbackSound(sampleName, rate) {
  if (!ctx || !buffers[sampleName] || sfxMuted) return;
  rate = rate || 1.0;
  const source = ctx.createBufferSource();
  const gain = ctx.createGain();
  source.buffer = buffers[sampleName];
  source.playbackRate.setValueAtTime(rate, ctx.currentTime);
  gain.gain.setValueAtTime(SFX_SAMPLE_GAIN[sampleName] || 1, ctx.currentTime);
  source.connect(gain);
  gain.connect(sfxBus);
  source.start();
  source.onended = () => {
    try { source.disconnect(); } catch (_) {}
    try { gain.disconnect(); } catch (_) {}
  };
}

/* ============================================================
 * 角色控制
 * ==========================================================*/
function switchCharacter(characterId) {
  const images = CHARACTER_IMAGE_SETS[characterId] || CHARACTER_IMAGE_SETS.dagou;
  dogCloseImage.src = images.close;
  dogCloseImage.alt = images.alt;
  dogOpenImage.src = images.open;
  dogInner.classList.toggle('is-hajimi', characterId === 'hajimi');
}

function openMouth(holdMs) {
  mouthPopped = true;
  dogInner.classList.toggle('bark-image', !sfxMuted);
  clearTimeout(mouthTimer);
  mouthTimer = setTimeout(() => {
    if (!mouthVoice) {
      mouthPopped = false;
      dogInner.classList.remove('bark-image');
    }
  }, holdMs);
}

function lockMouth(voice) {
  mouthVoice = voice;
  clearTimeout(mouthTimer);
  mouthPopped = true;
  dogInner.classList.toggle('bark-image', !sfxMuted);
  holding = true;
}

function unlockMouth(voice, holdMs) {
  if (mouthVoice !== voice) return;
  mouthVoice = null;
  holding = false;
  openMouth(holdMs);
}

/* ============================================================
 * 工具函数
 * ==========================================================*/
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;
const smooth = t => t * t * (3 - 2 * t);
const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
const easeOutBack = t => { const c = 1.70158, u = t - 1; return 1 + (c + 1) * u * u * u + c * u * u; };
const easeOutElastic = t =>
  t <= 0 ? 0 : t >= 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI / 3)) + 1;
function nowSec() { return ctx ? ctx.currentTime : performance.now() / 1000; }
function getStageMetrics() {
  const rect = stage.getBoundingClientRect();
  return {
    width: Math.max(1, rect.width || stage.clientWidth || 1),
    height: Math.max(1, rect.height || stage.clientHeight || 1),
    left: rect.left,
    top: rect.top,
  };
}
const cx0 = () => fxW / 2, cy0 = () => fxH / 2;

/* ============================================================
 * 全屏特效引擎（完整保留自原项目）
 * ==========================================================*/
function tracePoly(g, x, y, r, sides, rot) {
  g.beginPath();
  for (let i = 0; i < sides; i++) {
    const a = rot + (i * 2 * Math.PI) / sides;
    const px = x + Math.cos(a) * r, py = y + Math.sin(a) * r;
    i ? g.lineTo(px, py) : g.moveTo(px, py);
  }
  g.closePath();
}
function traceStar(g, x, y, r, points, rot) {
  g.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const rr = i % 2 ? r * 0.46 : r;
    const a = rot + (i * Math.PI) / points;
    const px = x + Math.cos(a) * rr, py = y + Math.sin(a) * rr;
    i ? g.lineTo(px, py) : g.moveTo(px, py);
  }
  g.closePath();
}
function drawPiece(g, kind, color, x, y, r, rot) {
  if (r <= 0) return;
  g.save();
  g.translate(x, y);
  g.rotate(rot || 0);
  switch (kind) {
    case 'circle':
      g.fillStyle = color;
      g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill();
      break;
    case 'ring':
      g.strokeStyle = color;
      g.lineWidth = Math.max(2, r * 0.3);
      g.beginPath(); g.arc(0, 0, r, 0, 7); g.stroke();
      break;
    case 'square':
      g.fillStyle = color;
      g.fillRect(-r, -r, r * 2, r * 2);
      break;
    case 'triangle':
      g.fillStyle = color;
      tracePoly(g, 0, 0, r * 1.2, 3, -Math.PI / 2); g.fill();
      break;
    case 'diamond':
      g.fillStyle = color;
      tracePoly(g, 0, 0, r * 1.15, 4, 0); g.fill();
      break;
    case 'hexagon':
      g.fillStyle = color;
      tracePoly(g, 0, 0, r * 1.1, 6, 0); g.fill();
      break;
    case 'star':
      g.fillStyle = color;
      traceStar(g, 0, 0, r * 1.25, 5, -Math.PI / 2); g.fill();
      break;
    case 'cross': {
      g.fillStyle = color;
      const w = r * 0.62;
      g.fillRect(-r, -w / 2, r * 2, w);
      g.fillRect(-w / 2, -r, w, r * 2);
      break;
    }
  }
  g.restore();
}
function strokePartial(g, pts, lens, vis) {
  g.beginPath();
  g.moveTo(pts[0].x, pts[0].y);
  let acc = 0;
  for (let i = 1; i < pts.length; i++) {
    const seg = lens[i - 1];
    if (acc + seg <= vis) {
      g.lineTo(pts[i].x, pts[i].y);
      acc += seg;
    } else {
      const f = seg > 0 ? (vis - acc) / seg : 0;
      const tx = pts[i - 1].x + (pts[i].x - pts[i - 1].x) * f;
      const ty = pts[i - 1].y + (pts[i].y - pts[i - 1].y) * f;
      g.lineTo(tx, ty);
      return { x: tx, y: ty };
    }
  }
  return pts[pts.length - 1];
}

/* 12 种特效的随机参数预生成 */
const BUILD = {
  rings(inst, rng) {
    const minD = Math.min(fxW, fxH);
    for (let i = 0; i < 7; i++) inst.shapes.push({
      delay: i * 0.05,
      rEnd: minD * (0.13 + rng() * 0.29),
      w: 5 + rng() * 9,
      color: pickColor(rng),
    });
    inst.dotR = minD * 0.07;
  },
  poly(inst, rng) {
    const sides = 3 + (rng() * 5 | 0);
    const minD = Math.min(fxW, fxH);
    [[0.46, C.amber, 0], [0.3, C.gray, 0.09], [0.17, C.amber, 0.18]].forEach(([s, color, d], i) =>
      inst.shapes.push({
        sides, delay: d, color,
        rEnd: minD * s,
        w: minD * (0.034 - i * 0.007),
      }));
  },
  spiral(inst, rng) {
    const minD = Math.min(fxW, fxH);
    for (let i = 0; i < 36; i++) inst.shapes.push({
      ang: i * 0.55,
      rad: 6 + i * minD * 0.0125,
      size: minD * (0.009 + i * 0.0008),
      delay: i * 0.018,
      color: pickColor(rng),
    });
  },
  rays(inst, rng) {
    const minD = Math.min(fxW, fxH);
    const n = 13 + (rng() * 4 | 0);
    inst.r0 = minD * 0.06;
    for (let i = 0; i < n; i++) inst.shapes.push({
      ang: (i / n) * 2 * Math.PI + rng() * 0.15,
      w: 0.09 + rng() * 0.13,
      len: minD * (0.36 + rng() * 0.1),
      delay: rng() * 0.12,
      color: rng() < 0.12 ? ACCENTS[(rng() * 3) | 0] : (i % 2 ? C.gray : C.amber),
    });
  },
  confetti(inst, rng) {
    const maxD = Math.hypot(fxW, fxH);
    const minD = Math.min(fxW, fxH);
    const kinds = ['square', 'circle', 'triangle', 'diamond'];
    for (let i = 0; i < 30; i++) inst.shapes.push({
      ang: rng() * 2 * Math.PI,
      dist: maxD * (0.12 + rng() * 0.46),
      size: minD * (0.026 + rng() * 0.05),
      spin: inst.dir * (1 + rng() * 2) * 2.2,
      delay: rng() * 0.18,
      kind: kinds[(rng() * 4) | 0],
      color: pickColor(rng),
    });
  },
  zigzag(inst, rng) {
    const minD = Math.min(fxW, fxH);
    const horiz = rng() < 0.5;
    const n = 5 + (rng() * 3 | 0);
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const f = i / n;
      if (horiz) pts.push({
        x: -fxW * 0.08 + f * fxW * 1.16,
        y: fxH * (i % 2 ? 0.72 + rng() * 0.14 : 0.14 + rng() * 0.14),
      });
      else pts.push({
        x: fxW * (i % 2 ? 0.7 + rng() * 0.16 : 0.14 + rng() * 0.16),
        y: -fxH * 0.08 + f * fxH * 1.16,
      });
    }
    const lens = [];
    let total = 0;
    for (let i = 1; i < pts.length; i++) {
      const l = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
      lens.push(l); total += l;
    }
    inst.shapes.push({ pts, lens, total, w: minD * (0.026 + rng() * 0.024), color: C.amber });
  },
  pop(inst, rng) {
    const minD = Math.min(fxW, fxH);
    const kinds = ['circle', 'square', 'ring', 'triangle', 'hexagon'];
    for (let i = 0; i < 16; i++) inst.shapes.push({
      x: fxW * (0.06 + rng() * 0.88),
      y: fxH * (0.06 + rng() * 0.88),
      size: minD * (0.036 + rng() * 0.06),
      delay: rng() * 0.28,
      rot: rng() * Math.PI,
      kind: kinds[(rng() * kinds.length) | 0],
      color: pickColor(rng),
    });
  },
  cross(inst, rng) {
    const minD = Math.min(fxW, fxH);
    const size = minD * (0.6 + rng() * 0.25);
    inst.shapes.push({
      size,
      w: size * (0.14 + rng() * 0.08),
      color: rng() < 0.2 ? ACCENTS[(rng() * 3) | 0] : C.amber,
    });
  },
  orbit(inst, rng) {
    const minD = Math.min(fxW, fxH);
    const kinds = ['circle', 'square', 'triangle', 'ring'];
    const n = 10;
    for (let i = 0; i < n; i++) inst.shapes.push({
      ang0: (i / n) * 2 * Math.PI,
      rad: minD * (0.18 + rng() * 0.24),
      speed: inst.dir * (0.45 + rng() * 0.5),
      size: minD * (0.026 + rng() * 0.032),
      delay: rng() * 0.15,
      kind: kinds[i % 4],
      color: pickColor(rng),
    });
    inst.coreR = minD * 0.055;
  },
  wave(inst, rng) {
    const minD = Math.min(fxW, fxH);
    for (let i = 0; i < 4; i++) inst.shapes.push({
      y0: fxH * (0.14 + i * 0.24) + (rng() - 0.5) * fxH * 0.08,
      amp: minD * (0.03 + rng() * 0.05),
      wl: fxW * (0.45 + rng() * 0.4),
      speed: inst.dir * (1 + rng() * 1.2),
      th: minD * (0.07 + rng() * 0.06),
      side: i % 2 ? 1 : -1,
      delay: i * 0.08,
      color: rng() < 0.12 ? ACCENTS[(rng() * 3) | 0] : (i % 2 ? C.gray : C.amber),
    });
  },
  stars(inst, rng) {
    const minD = Math.min(fxW, fxH);
    for (let i = 0; i < 12; i++) inst.shapes.push({
      x: fxW * (0.07 + rng() * 0.86),
      y: fxH * (0.07 + rng() * 0.86),
      r: minD * (0.034 + rng() * 0.055),
      delay: rng() * 0.25,
      rot: rng() * Math.PI,
      color: pickColor(rng),
    });
  },
  grid(inst, rng) {
    const minD = Math.min(fxW, fxH);
    const n = 11;
    const radius = minD * (0.4 + rng() * 0.04);
    const lines = [];
    for (let i = 0; i < n; i++) lines.push({
      y: (i - (n - 1) / 2) * (radius * 2 / n),
      w: 4.5 + ((i * 7) % 3) * 4,
      delay: i * 0.045,
      color: i % 2 ? C.gray : C.amber,
    });
    inst.shapes.push({ radius, lines });
  },
};

const DRAW = {
  rings(g, inst, t, fade) {
    const minD = Math.min(fxW, fxH);
    inst.shapes.forEach((s, i) => {
      const k = easeOutCubic(clamp01((t - s.delay) / FX_IN));
      if (k <= 0) return;
      const r = k * s.rEnd * (1 + 0.04 * Math.sin(t * 1.4 + i)) + beatP * minD * 0.012;
      g.globalAlpha = (1 - k * 0.5) * fade;
      g.strokeStyle = s.color;
      g.lineWidth = s.w * (1 + beatP * 0.5);
      g.beginPath(); g.arc(inst.cx, inst.cy, r, 0, 7); g.stroke();
    });
    const dk = easeOutBack(clamp01(t / FX_IN));
    if (dk > 0) {
      g.globalAlpha = fade;
      g.fillStyle = C.amber;
      g.beginPath(); g.arc(inst.cx, inst.cy, inst.dotR * dk * (1 + beatP * 0.2), 0, 7); g.fill();
    }
  },
  poly(g, inst, t, fade) {
    const minD = Math.min(fxW, fxH);
    inst.shapes.forEach((s, i) => {
      const k = easeOutCubic(clamp01((t - s.delay) / FX_IN));
      if (k <= 0) return;
      const r = k * s.rEnd * (1 + beatP * 0.035 + 0.03 * Math.sin(t * 1.1 + i * 1.9));
      const rot = inst.rot0 + inst.dir * (1 - k) * 1.3 + t * 0.18 * inst.dir;
      g.globalAlpha = (1 - k * 0.3) * fade;
      g.strokeStyle = s.color;
      g.lineWidth = s.w * (1 + beatP * 0.4) + beatP * minD * 0.0015;
      tracePoly(g, inst.cx, inst.cy, r, s.sides, rot);
      g.stroke();
    });
  },
  spiral(g, inst, t, fade) {
    const rot = inst.rot0 + t * 0.45 * inst.dir + beatP * 0.05 * inst.dir;
    inst.shapes.forEach((s, i) => {
      const k = easeOutBack(clamp01((t - s.delay) / FX_IN));
      if (k <= 0) return;
      const a = s.ang + rot;
      const r = s.rad * k * (1 + beatP * 0.04) + Math.sin(t * 1.5 + i * 0.5) * 4;
      const x = inst.cx + Math.cos(a) * r;
      const y = inst.cy + Math.sin(a) * r;
      const sz = s.size * k * (1 + beatP * 0.25);
      g.globalAlpha = fade;
      drawPiece(g, i % 6 === 5 ? 'square' : 'circle', s.color, x, y, sz, a);
    });
  },
  rays(g, inst, t, fade) {
    for (const s of inst.shapes) {
      const k = easeOutCubic(clamp01((t - s.delay) / 0.5));
      if (k <= 0) continue;
      const rot = inst.rot0 + inst.dir * (1 - k) * 0.8 + t * 0.14 * inst.dir;
      const len = s.len * k * (1 + beatP * 0.09);
      const a = s.ang + rot;
      g.globalAlpha = 0.88 * fade;
      g.fillStyle = s.color;
      g.beginPath();
      g.moveTo(inst.cx, inst.cy);
      g.arc(inst.cx, inst.cy, inst.r0 + len, a - s.w, a + s.w);
      g.closePath(); g.fill();
    }
  },
  confetti(g, inst, t, fade) {
    inst.shapes.forEach((s, i) => {
      const k = easeOutBack(clamp01((t - s.delay) / FX_IN));
      if (k <= 0) return;
      const x = inst.cx + Math.cos(s.ang) * s.dist * k * (1 + beatP * 0.025);
      const y = inst.cy + Math.sin(s.ang) * s.dist * k * (1 + beatP * 0.025)
        + Math.sin(t * 2.2 + i * 1.3) * 6;
      const sz = s.size * k * (1 + beatP * 0.18);
      const rot = s.spin * k + t * 0.6 * inst.dir;
      g.globalAlpha = fade;
      drawPiece(g, s.kind, s.color, x, y, sz, rot);
    });
  },
  zigzag(g, inst, t, fade) {
    const s = inst.shapes[0];
    const k = easeOutCubic(clamp01(t / 0.6));
    if (k <= 0) return;
    g.save();
    g.translate(0, Math.sin(t * 1.6) * 7);
    g.lineJoin = 'round';
    g.lineCap = 'round';
    g.save();
    g.translate(0, s.w * 2.1);
    g.globalAlpha = 0.4 * fade;
    g.strokeStyle = C.gray;
    g.lineWidth = s.w * (1 + beatP * 0.2);
    strokePartial(g, s.pts, s.lens, k * s.total);
    g.stroke();
    g.restore();
    g.globalAlpha = fade;
    g.strokeStyle = s.color;
    g.lineWidth = s.w * (1 + beatP * 0.3);
    const tip = strokePartial(g, s.pts, s.lens, k * s.total);
    g.stroke();
    g.fillStyle = C.gray;
    g.beginPath(); g.arc(tip.x, tip.y, s.w * (1.1 + beatP * 0.45), 0, 7); g.fill();
    g.restore();
  },
  pop(g, inst, t, fade) {
    inst.shapes.forEach((s, i) => {
      const k = easeOutBack(clamp01((t - s.delay) / FX_IN));
      if (k <= 0) return;
      const y = s.y + Math.sin(t * 2 + i * 1.7) * 7;
      const sz = s.size * k * (1 + beatP * 0.2);
      g.globalAlpha = 0.96 * fade;
      drawPiece(g, s.kind, s.color, s.x, y, sz, s.rot + t * 0.4 * inst.dir + beatP * 0.08 * inst.dir);
    });
  },
  cross(g, inst, t, fade) {
    const s = inst.shapes[0];
    const k1 = easeOutBack(clamp01(t / FX_IN));
    const k2 = easeOutBack(clamp01((t - 0.13) / FX_IN));
    if (k1 <= 0) return;
    g.save();
    g.translate(inst.cx, inst.cy);
    g.rotate(inst.rot0 + inst.dir * (1 - k1) * 1.6 + Math.sin(t * 1.3) * 0.07 + beatP * 0.02 * inst.dir);
    const pulse = 1 + beatP * 0.12;
    g.scale(pulse, pulse);
    const L = s.size / 2, w = s.w / 2;
    g.globalAlpha = fade;
    g.fillStyle = s.color;
    g.fillRect(-L * k1, -w, L * 2 * k1, w * 2);
    if (k2 > 0) g.fillRect(-w, -L * k2, w * 2, L * 2 * k2);
    g.globalAlpha = 0.6 * fade;
    g.strokeStyle = C.gray;
    g.lineWidth = Math.max(2, s.w * 0.28);
    g.beginPath(); g.arc(0, 0, s.size * 0.68 * k1 * (1 + beatP * 0.08), 0, 7); g.stroke();
    g.restore();
  },
  orbit(g, inst, t, fade) {
    inst.shapes.forEach(s => {
      const k = easeOutCubic(clamp01((t - s.delay) / FX_IN));
      if (k <= 0) return;
      const a = s.ang0 + t * s.speed + inst.dir * (1 - k) * 1.8;
      const R = s.rad * k * (1 + beatP * 0.09);
      const x = inst.cx + Math.cos(a) * R;
      const y = inst.cy + Math.sin(a) * R;
      g.globalAlpha = fade;
      drawPiece(g, s.kind, s.color, x, y, s.size * (0.6 + 0.4 * k) * (1 + beatP * 0.15), t * 1.2 * inst.dir);
    });
    const ck = easeOutBack(clamp01(t / FX_IN));
    if (ck > 0) {
      g.globalAlpha = fade;
      drawPiece(g, 'circle', C.amber, inst.cx, inst.cy, inst.coreR * ck * (1 + beatP * 0.2), 0);
    }
  },
  wave(g, inst, t, fade) {
    const step = Math.max(14, fxW / 28);
    for (const s of inst.shapes) {
      const k = easeOutCubic(clamp01((t - s.delay) / 0.6));
      if (k <= 0) continue;
      const off = (1 - k) * (fxW + 120) * s.side;
      const amp = s.amp * (0.6 + 0.4 * k) * (1 + beatP * 0.3);
      g.globalAlpha = 0.9 * fade;
      g.fillStyle = s.color;
      g.beginPath();
      for (let x = -60; x <= fxW + 60; x += step) {
        const y = s.y0 + Math.sin((x / s.wl) * Math.PI * 2 + t * s.speed) * amp;
        x === -60 ? g.moveTo(x + off, y) : g.lineTo(x + off, y);
      }
      for (let x = fxW + 60; x >= -60; x -= step) {
        const y = s.y0 + s.th * (1 + beatP * 0.12)
          + Math.sin((x / s.wl) * Math.PI * 2 + t * s.speed + 0.9) * amp;
        g.lineTo(x + off, y);
      }
      g.closePath(); g.fill();
    }
  },
  stars(g, inst, t, fade) {
    inst.shapes.forEach((s, i) => {
      const k = easeOutElastic(clamp01((t - s.delay) / FX_IN));
      if (k <= 0) return;
      const tw = 1 + 0.15 * Math.sin(t * 3.2 + i * 2.1) + beatP * 0.18;
      g.globalAlpha = 0.97 * fade;
      drawPiece(g, 'star', s.color, s.x, s.y, s.r * k * tw, s.rot + t * 0.7 * inst.dir);
    });
  },
  grid(g, inst, t, fade) {
    const s = inst.shapes[0];
    const R = s.radius * (1 + beatP * 0.06 + 0.03 * Math.sin(t * 1.3));
    g.save();
    g.translate(inst.cx, inst.cy);
    g.rotate(inst.rot0 + t * 0.22 * inst.dir + beatP * 0.025 * inst.dir);
    g.beginPath(); g.arc(0, 0, R, 0, 7); g.clip();
    for (const ln of s.lines) {
      const k = easeOutCubic(clamp01((t - ln.delay) / FX_IN));
      if (k <= 0) continue;
      g.globalAlpha = 0.92 * fade;
      g.strokeStyle = ln.color;
      g.lineWidth = ln.w * (1 + beatP * 0.35);
      g.beginPath();
      g.moveTo(-R * k, ln.y);
      g.lineTo(R * k, ln.y);
      g.stroke();
    }
    g.restore();
    const ok = easeOutBack(clamp01(t / FX_IN));
    if (ok > 0) {
      g.globalAlpha = fade;
      g.strokeStyle = C.amber;
      g.lineWidth = 6 * (1 + beatP * 0.35);
      g.beginPath(); g.arc(inst.cx, inst.cy, R * ok, 0, 7); g.stroke();
    }
  },
};

function buildEffect(type) {
  const rng = mulberry32((Math.random() * 1e9) | 0);
  const inst = {
    type,
    cx: cx0(), cy: cy0(),
    t0: 0, state: 'in', outT0: 0,
    rot0: rng() * Math.PI * 2,
    dir: rng() < 0.5 ? -1 : 1,
    shapes: [],
  };
  BUILD[type](inst, rng);
  return inst;
}

function spawnEffect(type, when) {
  const now = nowSec();
  for (const e of fxList) {
    if (e.state !== 'out') { e.state = 'out'; e.outT0 = now; }
  }
  while (fxList.length > 6) fxList.shift();
  const inst = buildEffect(type);
  inst.t0 = Math.min(when, now + 0.05);
  fxList.push(inst);
}

function spawnCelebrationEffect() {
  const types = ['confetti', 'pop', 'stars', 'spiral', 'orbit', 'rays'];
  const type = types[(Math.random() * types.length) | 0];
  spawnEffect(type, nowSec());
}

function fxFrame(now) {
  fx2d.clearRect(0, 0, fxW, fxH);
  for (let i = fxList.length - 1; i >= 0; i--) {
    const inst = fxList[i];
    let outK = 0;
    if (inst.state === 'out') {
      outK = clamp01((now - inst.outT0) / FX_OUT);
      if (outK >= 1) { fxList.splice(i, 1); continue; }
    }
    const t = now - inst.t0;
    if (t < 0) continue;
    const fade = 1 - smooth(outK);
    const sc = inst.state === 'out' ? 1 - 0.22 * outK : 1 + beatP * 0.02;
    fx2d.save();
    fx2d.translate(inst.cx, inst.cy);
    fx2d.scale(sc, sc);
    fx2d.translate(-inst.cx, -inst.cy);
    DRAW[inst.type](fx2d, inst, t, fade);
    fx2d.restore();
  }
}

function fxResize() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const { width, height } = getStageMetrics();
  fxW = width;
  fxH = height;
  const sceneUnit = fxW >= fxH ? fxH / 2 : fxW / 1.5;
  stage.style.setProperty('--scene-unit', `${sceneUnit}px`);
  fxCanvas.width = Math.round(fxW * dpr);
  fxCanvas.height = Math.round(fxH * dpr);
  fxCanvas.style.width = fxW + 'px';
  fxCanvas.style.height = fxH + 'px';
  fx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
  for (const e of fxList) { e.cx = cx0(); e.cy = cy0(); }
}

/* ============================================================
 * 答题逻辑
 * ==========================================================*/

// ---- 界面切换 ----
function hideAllPanels() {
  overlay.classList.add('hide');
  topicSelector.classList.remove('is-visible');
  quizArea.classList.remove('is-visible');
  hideFeedbackBubble();
  resultsArea.classList.remove('is-visible');
  dogEl.classList.remove('is-front');
}

function showModeSelector() {
  hideAllPanels();
  stopExamTimer();
  quizArea.style.opacity = '';
  quizArea.style.pointerEvents = '';
  overlay.classList.remove('hide');
  quizState = QUIZ_STATE.MODE_SELECT;
  quizMode = null;
  userAnswers = [];
  btnBack.classList.add('hidden');
  document.getElementById('btn-prev-question').style.display = 'none';
  document.getElementById('btn-next-question').style.display = 'none';
}

function showTopicSelector() {
  hideAllPanels();
  topicSelector.classList.add('is-visible');
  quizState = QUIZ_STATE.TOPIC_SELECT;
  renderTopicButtons();
  btnBack.classList.remove('hidden');
}

function showQuizUI() {
  hideAllPanels();
  quizArea.classList.add('is-visible');
  quizState = QUIZ_STATE.QUESTION;
  btnBack.classList.remove('hidden');
  document.getElementById('btn-prev-question').style.display = 'none';
  document.getElementById('btn-next-question').style.display = 'inline-block';
}

function showResultsUI() {
  hideAllPanels();
  stopExamTimer();
  resultsArea.classList.add('is-visible');
  quizState = QUIZ_STATE.RESULTS;
  btnBack.classList.remove('hidden');
}

// ---- 考试倒计时 ----
function startExamTimer() {
  const timerEl = document.getElementById('exam-timer');
  const timerText = document.getElementById('exam-timer-text');
  timerEl.classList.add('is-visible');
  timerEl.classList.remove('is-warning');
  examTimerRemaining = EXAM_DURATION;

  updateTimerDisplay();

  clearInterval(examTimerInterval);
  examTimerInterval = setInterval(() => {
    examTimerRemaining--;
    if (examTimerRemaining <= 0) {
      examTimerRemaining = 0;
      updateTimerDisplay();
      clearInterval(examTimerInterval);
      // 时间到，自动交卷
      autoSubmitExam();
      return;
    }
    updateTimerDisplay();
    // 剩余5分钟警告
    if (examTimerRemaining <= 300) {
      timerEl.classList.add('is-warning');
    }
  }, 1000);
}

function updateTimerDisplay() {
  const h = Math.floor(examTimerRemaining / 3600);
  const m = Math.floor((examTimerRemaining % 3600) / 60);
  const s = examTimerRemaining % 60;
  document.getElementById('exam-timer-text').textContent =
    `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function stopExamTimer() {
  clearInterval(examTimerInterval);
  const timerEl = document.getElementById('exam-timer');
  timerEl.classList.remove('is-visible', 'is-warning');
}

function autoSubmitExam() {
  // 对未作答的题目标记为未作答
  for (let i = userAnswers.length; i < selectedQuestions.length; i++) {
    userAnswers[i] = null;
  }
  hideFeedbackBubble();
  quizArea.style.opacity = '';
  quizArea.style.pointerEvents = '';
  dogEl.classList.remove('is-front');
  showExamResults();
}

// ---- 知识点按钮 ----
function renderTopicButtons() {
  const topics = getAllTopics();
  topicList.innerHTML = '';
  for (const topic of topics) {
    const btn = document.createElement('button');
    btn.className = 'topic-button';
    btn.textContent = topic;
    btn.addEventListener('click', () => {
      currentTopic = topic;
      for (const b of topicList.querySelectorAll('.topic-button')) {
        b.classList.toggle('is-active', b === btn);
      }
    });
    topicList.appendChild(btn);
  }
  // 添加"全部"按钮
  const allBtn = document.createElement('button');
  allBtn.className = 'topic-button is-active';
  allBtn.textContent = '全部';
  allBtn.addEventListener('click', () => {
    currentTopic = null;
    for (const b of topicList.querySelectorAll('.topic-button')) {
      b.classList.toggle('is-active', b === allBtn);
    }
  });
  topicList.insertBefore(allBtn, topicList.firstChild);
  currentTopic = null;
}

// ---- 进入模式 ----
function enterPracticeMode() {
  quizMode = 'practice';
  showTopicSelector();
}

function enterExamMode() {
  quizMode = 'exam';
  currentQuestionIndex = 0;
  userAnswers = [];
  selectedQuestions = buildExamPaper();
  showQuizUI();
  displayQuestion(0);
  startExamTimer();
}

function startPracticeWithTopic() {
  quizMode = 'practice';
  currentQuestionIndex = 0;
  userAnswers = [];
  const pool = getQuestionsByTopic(currentTopic);
  if (pool.length === 0) {
    alert('该知识点暂无题目，请选择其他知识点。');
    return;
  }
  selectedQuestions = shuffleArray(pool);
  showQuizUI();
  displayQuestion(0);
}

// ---- 题目展示 ----
function displayQuestion(index, isGoingBack) {
  if (index >= selectedQuestions.length) {
    finishQuiz();
    return;
  }
  currentQuestionIndex = index;
  const q = selectedQuestions[index];
  const prevAnswer = userAnswers[index];

  // 进度
  const total = selectedQuestions.length;
  document.getElementById('quiz-progress-bar').style.width = `${((index) / total) * 100}%`;
  document.getElementById('quiz-progress-text').textContent = `第 ${index + 1} / ${total} 题`;

  // 标签：选择题显示"选择"，阅读/填空显示大题名称
  const tag = document.getElementById('question-topic-tag');
  let sectionLabel = '';
  if (q.type !== 'choice') {
    const allSections = [...READING_SECTIONS, ...FILL_SECTIONS];
    const sec = allSections.find(s => s.ids.includes(q.id));
    if (sec) sectionLabel = ' · ' + sec.label;
  }
  tag.textContent = (quizMode === 'exam' ? '考试' : '练习') + ' · ' + q.topic + sectionLabel;
  if (q.difficulty === 'hard') tag.style.background = 'rgba(255,90,95,.14)';
  else if (q.difficulty === 'medium') tag.style.background = 'rgba(255,180,0,.18)';
  else tag.style.background = 'rgba(22,194,163,.14)';

  // 题目文字
  document.getElementById('question-text').textContent = q.question;

  // 代码块：阅读/填空题自动从大题第一题获取代码（id百位相同=同一大题）
  const codeDisplay = document.getElementById('code-display');
  let codeToShow = q.code;
  if (!codeToShow && q.type !== 'choice') {
    // 自动查找同大题的首题代码
    const sectionBase = Math.floor(q.id / 100) * 100;
    const firstInSection = QUESTION_BANK.find(
      qq => qq.id >= sectionBase && qq.id < sectionBase + 100 && qq.code
    );
    if (firstInSection) codeToShow = firstInSection.code;
  }
  if (codeToShow) {
    codeDisplay.classList.remove('hidden');
    codeDisplay.innerHTML = `<div class="code-block"><code>${escapeHTML(codeToShow)}</code></div>`;
  } else {
    codeDisplay.classList.add('hidden');
    codeDisplay.innerHTML = '';
  }

  // 选项 / 填空
  const optionsDiv = document.getElementById('answer-options');
  const fillArea = document.getElementById('fill-input-area');

  if (q.type === 'fill' && (!q.options || q.options.length === 0)) {
    // 传统文本填空
    optionsDiv.innerHTML = '';
    optionsDiv.classList.add('hidden');
    fillArea.classList.remove('hidden');
    fillArea.innerHTML = `
      <input type="text" class="fill-input" id="fill-answer" placeholder="输入你的答案…" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
      <button id="btn-submit-fill" class="big-button" type="button" style="min-width:140px;min-height:44px;font-size:15px;">确认提交</button>
    `;
    document.getElementById('btn-submit-fill').addEventListener('click', handleFillSubmit);
    document.getElementById('fill-answer').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleFillSubmit();
    });
    // 返回上一题时恢复之前的填空答案
    if (prevAnswer && isGoingBack && prevAnswer.userAnswer) {
      setTimeout(() => {
        const inp = document.getElementById('fill-answer');
        if (inp) {
          inp.value = prevAnswer.userAnswer[0];
          if (quizMode === 'exam') {
            // 考试模式可修改，不禁用
            inp.style.boxShadow = 'inset 0 0 0 2px var(--amber)';
          } else {
            inp.disabled = true;
            inp.classList.add(prevAnswer.isCorrect ? 'is-correct' : 'is-wrong');
          }
        }
        const btn = document.getElementById('btn-submit-fill');
        if (btn && quizMode !== 'exam') btn.disabled = true;
      }, 150);
    }
    setTimeout(() => {
      const inp = document.getElementById('fill-answer');
      if (inp && !inp.disabled) inp.focus();
    }, 200);
  } else {
    // 选择/阅读/选项填空：考试模式随机打乱选项顺序
    fillArea.innerHTML = '';
    optionsDiv.classList.remove('hidden');
    optionsDiv.innerHTML = '';
    const shuffledOpts = (quizMode === 'exam')
      ? shuffleArray(q.options)
      : [...q.options];
    for (const opt of shuffledOpts) {
      const btn = document.createElement('button');
      btn.className = 'answer-button';
      btn.innerHTML = `<span class="answer-key">${opt.key}</span><span>${escapeHTML(opt.text)}</span>`;
      btn.addEventListener('click', () => handleChoiceAnswer(opt.key));
      optionsDiv.appendChild(btn);
    }
    // 返回上一题时恢复之前的作答状态
    if (prevAnswer && isGoingBack) {
      const buttons = document.querySelectorAll('#answer-options .answer-button');
      for (const btn of buttons) {
        const btnKey = btn.querySelector('.answer-key').textContent;
        if (quizMode === 'exam') {
          // 考试模式：只标记已选答案（琥珀色边框），不显示对错，允许修改
          if (btnKey === prevAnswer.userAnswer[0]) {
            btn.style.boxShadow = 'inset 0 0 0 3px var(--amber)';
            btn.style.background = 'rgba(255,180,0,.12)';
          }
          // 考试返回可修改答案，不禁用按钮
        } else {
          // 练习模式：显示对错，锁定不可改
          if (prevAnswer.isCorrect) {
            if (q.answer.includes(btnKey)) btn.classList.add('is-correct');
          } else {
            if (btnKey === prevAnswer.userAnswer[0]) btn.classList.add('is-wrong');
            if (q.answer.includes(btnKey)) btn.classList.add('is-correct');
          }
          btn.style.pointerEvents = 'none';
        }
      }
    }
  }

  // 上一题/下一题按钮
  const btnPrev = document.getElementById('btn-prev-question');
  const btnNext = document.getElementById('btn-next-question');
  btnPrev.style.display = (currentQuestionIndex === 0) ? 'none' : 'inline-block';
  btnNext.style.display = (currentQuestionIndex >= selectedQuestions.length - 1) ? 'none' : 'inline-block';

  // 滚动到顶部
  quizArea.scrollTop = 0;
}

// ---- 答题处理 ----
function handleChoiceAnswer(key) {
  if (quizState !== QUIZ_STATE.QUESTION) return;
  const q = selectedQuestions[currentQuestionIndex];
  const isCorrect = q.answer.includes(key);

  // 考试模式：不显示对错，直接往后走
  if (quizMode === 'exam') {
    const buttons = document.querySelectorAll('#answer-options .answer-button');
    for (const btn of buttons) {
      const btnKey = btn.querySelector('.answer-key').textContent;
      if (btnKey === key) btn.style.boxShadow = 'inset 0 0 0 3px var(--amber)';
      btn.style.pointerEvents = 'none';
    }
    userAnswers[currentQuestionIndex] = { questionId: q.id, userAnswer: [key], isCorrect };
    clearTimeout(examNavTimer);
    examNavTimer = setTimeout(() => goToNextInExam(), 150);
    return;
  }

  // 练习模式：高亮对错
  const buttons = document.querySelectorAll('#answer-options .answer-button');
  for (const btn of buttons) {
    const btnKey = btn.querySelector('.answer-key').textContent;
    if (btnKey === key && !isCorrect) btn.classList.add('is-wrong');
    if (q.answer.includes(btnKey)) btn.classList.add('is-correct');
    btn.style.pointerEvents = 'none';
  }

  // 记录答案
  userAnswers[currentQuestionIndex] = {
    questionId: q.id,
    userAnswer: [key],
    isCorrect,
  };

  // 反馈
  if (isCorrect) {
    handleCorrectAnswer(q);
  } else {
    handleWrongAnswer(q);
  }
}

function handleFillSubmit() {
  if (quizState !== QUIZ_STATE.QUESTION) return;
  const input = document.getElementById('fill-answer');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  const q = selectedQuestions[currentQuestionIndex];
  const isCorrect = q.answer.some(a => a.toLowerCase() === text.toLowerCase());

  userAnswers[currentQuestionIndex] = { questionId: q.id, userAnswer: [text], isCorrect };

  // 考试模式：不显示对错，直接往后
  if (quizMode === 'exam') {
    input.style.boxShadow = 'inset 0 0 0 2px var(--amber)';
    input.disabled = true;
    const sb = document.getElementById('btn-submit-fill');
    if (sb) sb.disabled = true;
    setTimeout(() => goToNextInExam(), 150);
    return;
  }

  input.classList.add(isCorrect ? 'is-correct' : 'is-wrong');
  input.disabled = true;
  const submitBtn = document.getElementById('btn-submit-fill');
  if (submitBtn) submitBtn.disabled = true;

  if (isCorrect) {
    handleCorrectAnswer(q);
  } else {
    handleWrongAnswer(q);
  }
}

// ---- 答对/答错反馈 ----
function handleCorrectAnswer(q) {
  if (quizMode === 'exam') {
    // 考试模式：不高亮、不弹角色、不弹气泡，直接下一题
    goToNextInExam();
    return;
  }
  quizState = QUIZ_STATE.FEEDBACK;
  quizArea.style.opacity = '0';
  quizArea.style.pointerEvents = 'none';
  switchCharacter('dagou');
  openMouth(1000);
  playFeedbackSound('da');
  setTimeout(() => playFeedbackSound('gou'), 160);
  setTimeout(() => playFeedbackSound('jiao'), 340);
  spawnCelebrationEffect();
  barkPopVel = Math.min(barkPopVel + BARK_KICK, 9);
  dogEl.classList.add('is-front');
  void dogEl.offsetHeight;
  showFeedbackBubble('correct', q);
}

function handleWrongAnswer(q) {
  if (quizMode === 'exam') {
    // 考试模式：不高亮、不弹角色、不弹气泡，直接下一题
    goToNextInExam();
    return;
  }
  quizState = QUIZ_STATE.FEEDBACK;
  quizArea.style.opacity = '0';
  quizArea.style.pointerEvents = 'none';
  switchCharacter('hajimi');
  openMouth(900);
  playFeedbackSound('ha');
  barkPopVel = Math.min(barkPopVel + BARK_KICK, 9);
  dogEl.classList.add('is-front');
  void dogEl.offsetHeight;
  showFeedbackBubble('wrong', q);
}

let examNavTimer = 0;
let navigatingExam = false;

/** 考试模式专用：跳过反馈直接进入下一题 */
function goToNextInExam() {
  if (navigatingExam) return;
  navigatingExam = true;
  clearTimeout(examNavTimer);
  currentQuestionIndex++;
  if (currentQuestionIndex >= selectedQuestions.length) {
    navigatingExam = false;
    finishQuiz();
  } else {
    displayQuestion(currentQuestionIndex);
    navigatingExam = false;
  }
}

/** 返回上一题 */
function goToPrevQuestion() {
  if (quizState !== QUIZ_STATE.QUESTION) return;
  if (currentQuestionIndex <= 0 || navigatingExam) return;
  clearTimeout(examNavTimer);
  currentQuestionIndex--;
  displayQuestion(currentQuestionIndex, true);
}

function showFeedbackBubble(result, q) {
  const icon = document.getElementById('feedback-bubble-icon');
  const text = document.getElementById('feedback-bubble-text');
  const expl = document.getElementById('feedback-bubble-exp-text');
  const bubble = feedbackBubble;

  if (result === 'correct') {
    icon.textContent = '✅';
    text.textContent = '恭喜答对了！';
    text.className = 'is-correct';
    document.getElementById('feedback-bubble-exp').classList.add('hidden');
    bubble.classList.remove('is-centered');
    bubble.classList.add('is-visible');
    bubble.setAttribute('aria-hidden', 'false');
    // 答对2秒后自动进入下一题
    startFeedbackTimer();
  } else {
    icon.textContent = '❌';
    text.textContent = '答错了！看看解析吧';
    text.className = 'is-wrong';
    document.getElementById('feedback-bubble-exp').classList.remove('hidden');
    expl.textContent = q.explanation;
    bubble.classList.add('is-centered');
    bubble.classList.add('is-visible');
    bubble.setAttribute('aria-hidden', 'false');
    // 答错需要手动点击才进入下一题
    document.getElementById('feedback-bubble-timer').textContent = '';
    document.getElementById('feedback-bubble-next-label').textContent = '下一题';
  }
}

function hideFeedbackBubble() {
  clearTimeout(feedbackTimer);
  clearInterval(feedbackCountdown);
  feedbackBubble.classList.remove('is-visible');
  feedbackBubble.setAttribute('aria-hidden', 'true');
}

function startFeedbackTimer() {
  clearTimeout(feedbackTimer);
  clearInterval(feedbackCountdown);

  const timerEl = document.getElementById('feedback-bubble-timer');
  const labelEl = document.getElementById('feedback-bubble-next-label');
  labelEl.textContent = '点击继续';
  let remaining = 2;
  timerEl.textContent = ' · ' + remaining + 's';

  feedbackCountdown = setInterval(() => {
    remaining--;
    if (remaining <= 0) {
      clearInterval(feedbackCountdown);
    } else {
      timerEl.textContent = ' · ' + remaining + 's';
    }
  }, 1000);

  feedbackTimer = setTimeout(() => {
    dismissFeedbackAndNext();
  }, 2000);
}

let dismissingFeedback = false;

function dismissFeedbackAndNext() {
  if (dismissingFeedback) return;
  dismissingFeedback = true;

  hideFeedbackBubble();
  quizArea.style.opacity = '';
  quizArea.style.pointerEvents = '';
  setTimeout(() => {
    dogEl.classList.remove('is-front');
  }, 300);

  // 考试模式下绝对不能跳回主页，只走 finishQuiz
  if (quizMode === 'exam') {
    currentQuestionIndex++;
    if (currentQuestionIndex >= selectedQuestions.length) {
      finishQuiz();
    } else {
      quizState = QUIZ_STATE.QUESTION;
      displayQuestion(currentQuestionIndex);
    }
  } else {
    nextQuestion();
  }

  dismissingFeedback = false;
}

function nextQuestion() {
  quizState = QUIZ_STATE.QUESTION;
  quizArea.style.opacity = '';
  quizArea.style.pointerEvents = '';

  if (quizMode === 'practice') {
    if (currentQuestionIndex + 1 >= selectedQuestions.length) {
      showModeSelector();
      return;
    }
  }

  currentQuestionIndex++;
  if (currentQuestionIndex >= selectedQuestions.length) {
    finishQuiz();
  } else {
    displayQuestion(currentQuestionIndex);
  }
}

// ---- 考试完成 ----
function finishQuiz() {
  if (quizMode === 'exam') {
    showExamResults();
  } else {
    // 练习模式：做完了回到菜单
    showModeSelector();
  }
}

function showExamResults() {
  showResultsUI();

  // 切换叮咚鸡 + 浮现到最前
  switchCharacter('dingdong');
  dogEl.classList.add('is-front');
  openMouth(1500);

  // 播放叮咚鸡音效序列
  playFeedbackSound('dingdongji_ding');
  setTimeout(() => playFeedbackSound('dingdongji_dong'), 200);
  setTimeout(() => playFeedbackSound('dingdongji_ji'), 420);

  // 庆祝特效
  spawnCelebrationEffect();

  // 计算分数
  const total = selectedQuestions.length;
  const correct = userAnswers.filter(a => a && a.isCorrect).length;
  const percent = Math.round(correct / total * 100);

  document.getElementById('results-score').textContent =
    `得分: ${correct} / ${total} (${percent}%)`;

  // 渲染逐题回顾
  const reviewList = document.getElementById('review-list');
  reviewList.innerHTML = '';
  for (let i = 0; i < selectedQuestions.length; i++) {
    const q = selectedQuestions[i];
    const ans = userAnswers[i];
    const isCorrect = ans && ans.isCorrect;

    const card = document.createElement('div');
    card.className = `review-card ${isCorrect ? 'is-correct' : 'is-wrong'}`;

    const correctAnswerStr = q.type === 'fill'
      ? q.answer.join(' 或 ')
      : q.answer.join(', ');

    card.innerHTML = `
      <div class="review-q">${i + 1}. ${escapeHTML(q.question)}</div>
      <div class="review-meta">
        <span>你的答案: <span class="${isCorrect ? 'correct-ans' : 'wrong-ans'}">${ans ? escapeHTML(ans.userAnswer.join(', ')) : '未作答'}</span></span>
        <span>正确答案: <span class="correct-ans">${escapeHTML(correctAnswerStr)}</span></span>
        <span style="color:rgba(135,131,126,.6)">${q.topic}</span>
      </div>
      ${!isCorrect ? `<div class="review-exp">💡 ${escapeHTML(q.explanation)}</div>` : ''}
    `;
    reviewList.appendChild(card);
  }

  // 滚动到顶部
  resultsArea.scrollTop = 0;
}

// ---- 返回 ----
function goBack() {
  switch (quizState) {
    case QUIZ_STATE.TOPIC_SELECT:
      showModeSelector();
      break;
    case QUIZ_STATE.QUESTION:
    case QUIZ_STATE.FEEDBACK:
      if (confirm('确定要退出吗？当前进度将丢失。')) {
        showModeSelector();
      }
      break;
    case QUIZ_STATE.RESULTS:
      showModeSelector();
      break;
    default:
      showModeSelector();
  }
}

// ---- 工具 ----
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ============================================================
 * 动画循环（保留弹簧物理 + 特效渲染，移除节拍律动）
 * ==========================================================*/
function tick() {
  requestAnimationFrame(tick);
  const now = nowSec();
  const dt = Math.min(0.05, Math.max(0.001, now - lastTick));
  lastTick = now;

  // 简化节拍脉冲（约120BPM，用于特效轻微呼吸感）
  if (ctx) {
    const fakePhase = ((now * 2) % 1 + 1) % 1;
    beatP = Math.pow(1 - fakePhase, 2.4);
  }

  // 叫弹跳弹簧（保留自原项目）
  const popTarget = mouthPopped ? 1 : 0;
  barkPopVel += (popTarget - barkPop) * 320 * dt;
  barkPopVel *= Math.exp(-13 * dt);
  barkPopVel = Math.max(-10, Math.min(10, barkPopVel));
  barkPop += barkPopVel * dt;
  dogInner.style.transform =
    `scale(${(1 + 0.17 * barkPop).toFixed(4)}) rotate(${(-3.5 * barkPop).toFixed(2)}deg)`;

  // 果冻动画（保留，答对时可触发长按效果）
  const holdTarget = holding ? 1 : 0;
  const tau = holding ? 1.1 : 0.22;
  holdLevel += (holdTarget - holdLevel) * (1 - Math.exp(-dt / tau));
  const scaleTarget = 1 + 0.16 * holdLevel;
  jellyVel += (scaleTarget - jellyScale) * 55 * dt;
  jellyVel *= Math.exp(-7 * dt);
  jellyScale += jellyVel * dt;
  const amp = 6 * holdLevel;
  const jx = (Math.sin(now * 120) + Math.sin(now * 197 + 1.7) * 0.6) * amp * 0.55;
  const jy = (Math.cos(now * 128 + 0.6) + Math.sin(now * 233 + 3.1) * 0.6) * amp * 0.55;
  const jr = (Math.sin(now * 108 + 2.2) + Math.sin(now * 181) * 0.5) * 2.4 * holdLevel;
  dogJelly.style.transform =
    `translate(${jx.toFixed(2)}px, ${jy.toFixed(2)}px)` +
    ` rotate(${jr.toFixed(2)}deg) scale(${jellyScale.toFixed(4)})`;
  if (holdLevel > 0.004) {
    dogJelly.style.filter =
      `hue-rotate(${(-42 * holdLevel).toFixed(1)}deg)` +
      ` saturate(${(1 + 0.7 * holdLevel).toFixed(3)})` +
      ` brightness(${(1 + 0.04 * holdLevel).toFixed(3)})`;
  } else {
    dogJelly.style.filter = '';
  }

  // 角色轻微律动（简单替代原项目的节拍律动）
  dogEl.style.transform = 'translate(0, 0)';

  fxFrame(now);
}

/* ============================================================
 * 事件绑定
 * ==========================================================*/
document.getElementById('btn-practice').addEventListener('click', enterPracticeMode);
document.getElementById('btn-exam').addEventListener('click', enterExamMode);
document.getElementById('btn-start-practice').addEventListener('click', startPracticeWithTopic);
document.getElementById('btn-topic-back').addEventListener('click', () => showModeSelector());
document.getElementById('feedback-bubble-next').addEventListener('click', dismissFeedbackAndNext);
document.getElementById('btn-retry').addEventListener('click', enterExamMode);
document.getElementById('btn-results-back').addEventListener('click', () => showModeSelector());
document.getElementById('btn-back').addEventListener('click', goBack);
document.getElementById('btn-prev-question').addEventListener('click', goToPrevQuestion);
document.getElementById('btn-next-question').addEventListener('click', () => {
  if (quizState !== QUIZ_STATE.QUESTION || navigatingExam) return;
  if (currentQuestionIndex >= selectedQuestions.length - 1) return;
  clearTimeout(examNavTimer);
  currentQuestionIndex++;
  displayQuestion(currentQuestionIndex);
});

musicToggle.addEventListener('click', toggleMusic);
sfxToggle.addEventListener('click', toggleSoundEffects);

// 气泡上的指针事件不穿透
feedbackBubble.addEventListener('pointerdown', (e) => e.stopPropagation());

/* ============================================================
 * 初始化 & 启动
 * ==========================================================*/
let initialized = false;

async function initApp() {
  if (initialized) return;
  initialized = true;

  initAudio();
  if (ctx.state === 'suspended') await ctx.resume();
  await loadSamples();

  startBGM();

  updateMuteButton(musicToggle, bgmMuted, '音乐');
  updateMuteButton(sfxToggle, sfxMuted, '音效');

  // 显示控制栏
  topControls.classList.add('is-visible');
}

// 首次用户交互时初始化音频（模式选择按钮点击触发）
document.getElementById('btn-practice').addEventListener('click', initApp, { once: true });
document.getElementById('btn-exam').addEventListener('click', initApp, { once: true });

/* ---------- 响应式调整 ---------- */
function handleLayoutResize() {
  fxResize();
}
window.addEventListener('resize', handleLayoutResize);
if (window.ResizeObserver) {
  const stageResizeObserver = new ResizeObserver(handleLayoutResize);
  stageResizeObserver.observe(stage);
}

fxResize();
requestAnimationFrame(tick);
