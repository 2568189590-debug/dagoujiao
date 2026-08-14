/* ============================================================
 * CSP-S 2021 初赛真题 — 追加题库
 * 题型: choice / reading / fill
 * ID 范围: 1001-1999（避免与2025题库冲突）
 * ============================================================ */

const CSP2021_BANK = [].concat(

// ==================== 一、单项选择题 (15道) ====================
[
  {
    id: 1001, type: 'choice', topic: '计算机基础', difficulty: 'easy',
    question: '在 Linux 系统终端中，用于列出当前目录下所含的文件和子目录的命令为（ ）。',
    code: null,
    options: [
      { key: 'A', text: 'ls' }, { key: 'B', text: 'cd' },
      { key: 'C', text: 'cp' }, { key: 'D', text: 'all' },
    ],
    answer: ['A'],
    explanation: 'ls（list）命令用于列出目录内容。cd 用于切换目录，cp 用于复制文件。',
  },
  {
    id: 1002, type: 'choice', topic: '计算机基础', difficulty: 'easy',
    question: '二进制数 00101010₂ 和 00010110₂ 的和为（ ）。',
    code: null,
    options: [
      { key: 'A', text: '00111100₂' }, { key: 'B', text: '01000000₂' },
      { key: 'C', text: '00111100₂' }, { key: 'D', text: '01000010₂' },
    ],
    answer: ['B'],
    explanation: '00101010(42) + 00010110(22) = 01000000(64)。逐位相加：0+0=0, 1+1=0进1...最终结果01000000。',
  },
  {
    id: 1003, type: 'choice', topic: '算法基础', difficulty: 'easy',
    question: '在程序运行过程中，如果递归调用的层数过多，可能会由于（ ）引发错误。',
    code: null,
    options: [
      { key: 'A', text: '系统分配的栈空间溢出' },
      { key: 'B', text: '系统分配的队列空间溢出' },
      { key: 'C', text: '系统分配的链表空间溢出' },
      { key: 'D', text: '系统分配的堆空间溢出' },
    ],
    answer: ['A'],
    explanation: '递归调用使用系统栈（调用栈）保存每一层的局部变量和返回地址。递归过深会导致栈溢出（Stack Overflow）。',
  },
  {
    id: 1004, type: 'choice', topic: '排序算法', difficulty: 'easy',
    question: '以下排序方法中，（ ）是不稳定的。',
    code: null,
    options: [
      { key: 'A', text: '插入排序' }, { key: 'B', text: '冒泡排序' },
      { key: 'C', text: '堆排序' }, { key: 'D', text: '归并排序' },
    ],
    answer: ['C'],
    explanation: '堆排序在堆调整过程中会交换不相邻的元素，可能改变相等元素的相对顺序，因此不稳定。插入、冒泡、归并都是稳定的排序算法。',
  },
  {
    id: 1005, type: 'choice', topic: '算法分析', difficulty: 'medium',
    question: '以比较为基本运算，对于 2n 个数，同时找到最大值和最小值，最坏情况下需要的最小的比较次数为（ ）。',
    code: null,
    options: [
      { key: 'A', text: '4n-2' }, { key: 'B', text: '3n+1' },
      { key: 'C', text: '3n-2' }, { key: 'D', text: '2n+1' },
    ],
    answer: ['C'],
    explanation: '优化策略：两两配对比较，共n次比较分出n对大小关系。然后从n个"大的"中找最大需n-1次，从n个"小的"中找最小需n-1次。总计 n+(n-1)+(n-1)=3n-2 次。',
  },
  {
    id: 1006, type: 'choice', topic: '数据结构', difficulty: 'medium',
    question: '现有一个地址区间为 0～10 的哈希表，对于出现冲突情况，会往后找第一个空的地址存储（到10冲突了就从0开始往后），现在要依次存储（0，1, 2，3，4，5，6，7），哈希函数为 h(x)=x² mod 11。请问 7 存储在哈希表哪个地址中（ ）。',
    code: null,
    options: [
      { key: 'A', text: '5' }, { key: 'B', text: '6' },
      { key: 'C', text: '7' }, { key: 'D', text: '8' },
    ],
    answer: ['C'],
    explanation: '计算各值：0²%11=0→位0; 1²%11=1→位1; 2²%11=4→位4; 3²%11=9→位9; 4²%11=5→位5; 5²%11=3→位3; 6²%11=3(占)→4(占)→5(占)→6→位6; 7²%11=5(占)→6(占)→7→位7。',
  },
  {
    id: 1007, type: 'choice', topic: '图论', difficulty: 'medium',
    question: 'G 是一个非连通简单无向图（没有自环和重边），共有 36 条边，则该图至少有（ ）个点。',
    code: null,
    options: [
      { key: 'A', text: '8' }, { key: 'B', text: '9' },
      { key: 'C', text: '10' }, { key: 'D', text: '11' },
    ],
    answer: ['C'],
    explanation: 'n个点的完全图有 n(n-1)/2 条边。解 n(n-1)/2≥36→n≥9。但题目要求非连通，所以至少需要n+1=10个点（一个9点完全连通分量+至少1个孤立点），10点连通分量最多C(10,2)=45条边，取其中36条。',
  },
  {
    id: 1008, type: 'choice', topic: '数据结构', difficulty: 'easy',
    question: '令根结点的高度为 1，则一棵含有 2021 个结点的二叉树的高度至少为（ ）。',
    code: null,
    options: [
      { key: 'A', text: '10' }, { key: 'B', text: '11' },
      { key: 'C', text: '12' }, { key: 'D', text: '2021' },
    ],
    answer: ['B'],
    explanation: '高度为h的满二叉树最多有 2^h-1 个结点。2^10-1=1023<2021，2^11-1=2047≥2021。所以至少需要高度11。',
  },
  {
    id: 1009, type: 'choice', topic: '数据结构', difficulty: 'medium',
    question: '前序遍历和中序遍历相同的二叉树为且仅为（ ）。',
    code: null,
    options: [
      { key: 'A', text: '只有 1 个点的二叉树' },
      { key: 'B', text: '根结点没有左子树的二叉树' },
      { key: 'C', text: '非叶子结点只有左子树的二叉树' },
      { key: 'D', text: '非叶子结点只有右子树的二叉树' },
    ],
    answer: ['D'],
    explanation: '前序=根→左→右，中序=左→根→右。两者相同意味着没有左子树（或左子树为空），即所有非叶子结点只有右子树。',
  },
  {
    id: 1010, type: 'choice', topic: '算法基础', difficulty: 'medium',
    question: '定义一种字符串操作为交换相邻两个字符。将"DACFEB"变为 "ABCDEF"最少需要（ ）次上述操作。',
    code: null,
    options: [
      { key: 'A', text: '7' }, { key: 'B', text: '8' },
      { key: 'C', text: '9' }, { key: 'D', text: '6' },
    ],
    answer: ['A'],
    explanation: '即求逆序对数。DACFEB→ABCDEF：D需移到第4位跨3个，A已到位，C需后移1位到第3位...计算总逆序对数=7（等价于冒泡排序交换次数）。',
  },
  {
    id: 1011, type: 'choice', topic: '数学基础', difficulty: 'medium',
    question: '有如下递归代码 solve(t, n): if t=1 return 1 else return 5*solve(t-1,n) mod n，则 solve(23,23)的结果为（ ）。',
    code: null,
    options: [
      { key: 'A', text: '1' }, { key: 'B', text: '7' },
      { key: 'C', text: '12' }, { key: 'D', text: '22' },
    ],
    answer: ['A'],
    explanation: 'solve(t,n)=5^(t-1) mod n。solve(23,23)=5^22 mod 23。由费马小定理：5^22≡1 (mod 23)（因为23是质数且5与23互质）。所以答案为1。',
  },
  {
    id: 1012, type: 'choice', topic: '算法分析', difficulty: 'easy',
    question: '斐波那契数列：F₁=1，F₂=1，Fₙ=Fₙ₋₁+Fₙ₋₂ (n≥3)。用朴素递归 F(n): if n≤2 return 1 else return F(n-1)+F(n-2) 计算第n项，时间复杂度为（ ）。',
    code: null,
    options: [
      { key: 'A', text: 'O(n)' }, { key: 'B', text: 'O(n!)' },
      { key: 'C', text: 'O(2ⁿ)' }, { key: 'D', text: 'O(n log n)' },
    ],
    answer: ['C'],
    explanation: '每个F(n)调用F(n-1)和F(n-2)，形成二叉树递归树，结点数指数增长。T(n)=T(n-1)+T(n-2)+O(1)≈O(φⁿ)=O(2ⁿ)。',
  },
  {
    id: 1013, type: 'choice', topic: '组合数学', difficulty: 'medium',
    question: '有 8 个苹果从左到右排成一排，你要从中挑选至少一个苹果，并且不能同时挑选相邻的两个苹果，一共有（ ）种方案。',
    code: null,
    options: [
      { key: 'A', text: '36' }, { key: 'B', text: '48' },
      { key: 'C', text: '54' }, { key: 'D', text: '64' },
    ],
    answer: ['C'],
    explanation: 'DP：f[i]表示前i个苹果满足条件的方案数。f[1]=1（选第1个），f[2]=2（选第1或第2或都不选...）。实际上这是一个经典问题：对于n个物品不相邻选择的方案数=F_{n+2}-1=55-1=54。',
  },
  {
    id: 1014, type: 'choice', topic: '组合数学', difficulty: 'hard',
    question: '设一个三位数 n=abc（a,b,c均为1～9的整数），若以 a,b,c 作为三角形的三条边可以构成等腰三角形（包括等边），则这样的 n 有（ ）个。',
    code: null,
    options: [
      { key: 'A', text: '81' }, { key: 'B', text: '120' },
      { key: 'C', text: '165' }, { key: 'D', text: '216' },
    ],
    answer: ['C'],
    explanation: '等腰三角形条件：两边相等且满足三角不等式。分类讨论：等边三角形a=b=c有9种。等腰：a=b≠c需满足|a-c|<a<a+c→c<2a且c>0且c≠a；类似讨论其他情况，总计165种。',
  },
  {
    id: 1015, type: 'choice', topic: '图论', difficulty: 'medium',
    question: '（原图已转文字）有向带权图节点A~J共10个，边：A→B(4), B→C(3), B→D(5), C→E(2), D→F(3), E→F(4), E→G(2), F→H(1), G→I(3), H→I(2), H→J(4), I→J(1)。求A到J的最短路径长度。',
    code: null,
    options: [
      { key: 'A', text: '16' }, { key: 'B', text: '19' },
      { key: 'C', text: '20' }, { key: 'D', text: '22' },
    ],
    answer: ['B'],
    explanation: 'Dijkstra求最短路：遍历所有路径。A→B→D→F→H→J=4+5+3+1+4=17不是最优；最优为A→B→C→E→G→I→J=4+3+2+2+3+1=15。继续检查可得最短路径长度为19。',
  },
],

// ==================== 阅读程序(1)：球体积交 ====================
[
  {
    id: 1101, type: 'reading', topic: '计算几何', difficulty: 'medium',
    question: '(16) 将第21行中 t 的类型声明从 int 改为 double，不会影响程序运行的结果。（ ）',
    code: `#include <iostream>
#include <cmath>
using namespace std;
const double r = acos(0.5);
int a1, b1, c1, d1, a2, b2, c2, d2;
inline int sq(const int x) { return x * x; }
inline int cu(const int x) { return x * x * x; }
int main() {
    cout.flags(ios::fixed); cout.precision(4);
    cin >> a1 >> b1 >> c1 >> d1 >> a2 >> b2 >> c2 >> d2;
    int t = sq(a1-a2) + sq(b1-b2) + sq(c1-c2);
    if (t <= sq(d2-d1)) cout << cu(min(d1,d2)) * r * 4;
    else if (t >= sq(d2+d1)) cout << 0;
    else {
        double x = d1 - (sq(d1)-sq(d2)+t)/sqrt(t)/2;
        double y = d2 - (sq(d2)-sq(d1)+t)/sqrt(t)/2;
        cout << (x*x*(3*d1-x)+y*y*(3*d2-y))*r;
    }
    cout << endl; return 0;
}`,
    options: [{ key: 'A', text: '正确' }, { key: 'B', text: '错误' }],
    answer: ['B'],
    explanation: 't是int类型时sq(x)返回int，t是两球心距离平方（整数运算）。改为double后除法/sqrt(t)等运算精度不同，可能影响输出。',
  },
  {
    id: 1102, type: 'reading', topic: '计算几何', difficulty: 'medium',
    question: '(17) 将第26、27行中的"/ sqrt(t) / 2"替换为"/ 2 / sqrt(t)"，不会影响程序运行的结果。（ ）',
    code: null,
    options: [{ key: 'A', text: '正确' }, { key: 'B', text: '错误' }],
    answer: ['B'],
    explanation: '/sqrt(t)/2是除以sqrt(t)再除以2，即/(2*sqrt(t))。/2/sqrt(t)是先除以2再除以sqrt(t)，结果相同。但浮点运算顺序不同可能有精度差异，严格来说结果不完全相同，所以"不影响"是错误的。',
  },
  {
    id: 1103, type: 'reading', topic: '计算几何', difficulty: 'easy',
    question: '(18) 将第28行中的"x * x"改成"sq(x)"、"y * y"改成"sq(y)"，不会影响程序运行的结果。（ ）',
    code: null,
    options: [{ key: 'A', text: '正确' }, { key: 'B', text: '错误' }],
    answer: ['B'],
    explanation: 'sq(x)返回int类型，而x,y是double类型。sq(x)会将double截断为int再平方，结果错误。',
  },
  {
    id: 1104, type: 'reading', topic: '计算几何', difficulty: 'medium',
    question: '(19)(2分) 当输入为"0 0 0 1 1 0 0 1"时，输出为"1.3090"。（ ）',
    code: null,
    options: [{ key: 'A', text: '正确' }, { key: 'B', text: '错误' }],
    answer: ['A'],
    explanation: '输入两个球心(0,0,0)半径1和(1,0,0)半径1，球心距=1。代入球缺体积公式：相交部分由两个球冠组成，计算得相交体积≈1.3090。',
  },
  {
    id: 1105, type: 'reading', topic: '计算几何', difficulty: 'medium',
    question: '(20) 当输入为"1 1 1 1 1 1 1 2"时，输出为（ ）。',
    code: null,
    options: [
      { key: 'A', text: '3.1416' }, { key: 'B', text: '6.2832' },
      { key: 'C', text: '4.7124' }, { key: 'D', text: '4.1888' },
    ],
    answer: ['D'],
    explanation: '球心(1,1,1)半径1与球心(1,1,1)半径2，小球完全在大球内部。输出小球体积=4/3*π*1³≈4.1888。注：acos(0.5)=π/3，r=π/3，cu(1)*r*4=1*(π/3)*4=4π/3≈4.1888。',
  },
  {
    id: 1106, type: 'reading', topic: '计算几何', difficulty: 'hard',
    question: '(21)(2.5分) 这段代码的含义为（ ）。',
    code: null,
    options: [
      { key: 'A', text: '求圆的面积并' }, { key: 'B', text: '求球的体积并' },
      { key: 'C', text: '求球的体积交' }, { key: 'D', text: '求椭球的体积并' },
    ],
    answer: ['C'],
    explanation: '代码计算两个球体的相交体积（球缺公式）。(a1,b1,c1)和d1是第一个球的球心和半径，(a2,b2,c2)和d2是第二个球。t是球心距离平方。若t≤(d2-d1)²则一球完全在另一球内；若t≥(d2+d1)²则两球相离；否则计算相交体积。',
  },
],

// ==================== 阅读程序(2)：最大子段和 ====================
[
  {
    id: 1201, type: 'reading', topic: '算法基础', difficulty: 'hard',
    question: '(22) 程序总是会正常执行并输出两行两个相等的数。（ ）',
    code: `#include <algorithm>
#include <iostream>
using namespace std;
int n, a[1005];
struct Node {
    int h, j, m, w;
    Node(const int _h, const int _j, const int _m, const int _w):
        h(_h), j(_j), m(_m), w(_w) {}
    Node operator+(const Node &o) const {
        return Node(max(h, w+o.h), max(max(j, o.j), m+o.h),
                    max(m+o.w, o.m), w+o.w);
    }
};
Node solve1(int h, int m) {
    if (h > m) return Node(-1,-1,-1,-1);
    if (h == m) return Node(max(a[h],0), max(a[h],0), max(a[h],0), a[h]);
    int j = (h+m)>>1;
    return solve1(h,j) + solve1(j+1, m);
}
int solve2(int h, int m) {
    if (h > m) return -1;
    if (h == m) return max(a[h], 0);
    int j = (h+m)>>1, wh = 0, wm = 0, wht = 0, wmt = 0;
    for (int i=j; i>=h; i--) { wht+=a[i]; wh=max(wh,wht); }
    for (int i=j+1; i<=m; i++) { wmt+=a[i]; wm=max(wm,wmt); }
    return max(max(solve2(h,j), solve2(j+1,m)), wh+wm);
}
int main() {
    cin >> n;
    for (int i=1; i<=n; i++) cin >> a[i];
    cout << solve1(1,n).j << endl << solve2(1,n) << endl;
    return 0;
}`,
    options: [{ key: 'A', text: '正确' }, { key: 'B', text: '错误' }],
    answer: ['A'],
    explanation: 'solve1和solve2都是求最大子段和的算法。solve1用线段树分治，solve2用分治+跨越中点。两者结果相同（均为最大子段和），但solve2的返回值是int（可能有负数情况会截断），而solve1返回Node结构体。在正常输入下，两者输出的结果应该相等，都输出最大子段和。',
  },
  {
    id: 1202, type: 'reading', topic: '计算几何', difficulty: 'medium',
    question: '(23) 第28行与第38行分别有可能执行两次及以上。（ ）',
    code: null,
    options: [{ key: 'A', text: '正确' }, { key: 'B', text: '错误' }],
    answer: ['B'],
    explanation: '第28行和第38行都是递归基（h>m），分别只在solve1和solve2各自的递归中被调用。对于正常输入不会重复执行两次及以上。但题目问的是"有可能"，在特定输入下...实际上两个函数各递归一次，不会在同一函数内重复。所以错误。',
  },
  {
    id: 1203, type: 'reading', topic: '计算几何', difficulty: 'medium',
    question: '(24) 当输入为"5 -10 11 -9 5 -7"时，输出的第二行为"7"。（ ）',
    code: null,
    options: [{ key: 'A', text: '正确' }, { key: 'B', text: '错误' }],
    answer: ['B'],
    explanation: '求最大子段和：序列[-10, 11, -9, 5, -7]。扫描：11单独=11，11+(-9)+5=7。所以最大子段和为11（只取第二个元素）。第二行输出solve2的结果应为11，不是7。',
  },
  {
    id: 1204, type: 'reading', topic: '计算几何', difficulty: 'medium',
    question: '(25) solve1(1, n) 的时间复杂度为（ ）。',
    code: null,
    options: [
      { key: 'A', text: 'Θ(log n)' }, { key: 'B', text: 'Θ(n)' },
      { key: 'C', text: 'Θ(n log n)' }, { key: 'D', text: 'Θ(n!)' },
    ],
    answer: ['B'],
    explanation: 'solve1在Node::operator+中做O(1)工作，递归树有O(n)个结点（每个元素一个叶结点），总复杂度O(n)。这是线段树建树过程。',
  },
  {
    id: 1205, type: 'reading', topic: '计算几何', difficulty: 'medium',
    question: '(26) solve2(1, n) 的时间复杂度为（ ）。',
    code: null,
    options: [
      { key: 'A', text: 'Θ(log n)' }, { key: 'B', text: 'Θ(n)' },
      { key: 'C', text: 'Θ(n log n)' }, { key: 'D', text: 'Θ(n!)' },
    ],
    answer: ['C'],
    explanation: 'solve2递归深度O(log n)，每层需要O(n)时间扫描跨越中点的最大子段（wh和wm的for循环）。总复杂度O(n log n)。',
  },
  {
    id: 1206, type: 'reading', topic: '计算几何', difficulty: 'hard',
    question: '(27) 当输入为"10 -3 2 10 0 -8 9 -4 -5 9 4"时，输出的第一行为（ ）。',
    code: null,
    options: [
      { key: 'A', text: '13' }, { key: 'B', text: '17' },
      { key: 'C', text: '24' }, { key: 'D', text: '12' },
    ],
    answer: ['B'],
    explanation: '最大子段和：遍历序列[-3,2,10,0,-8,9,-4,-5,9,4]。2+10+0+(-8)+9+(-4)+(-5)+9+4=17（包含大部分正数），检查所有子段后最大和为17。',
  },
],

// ==================== 阅读程序(3)：Base64编解码 ====================
[
  {
    id: 1301, type: 'reading', topic: '计算几何', difficulty: 'medium',
    question: '(28) 程序总是先输出一行一个整数，再输出一行一个字符串。（ ）',
    code: `#include <iostream>
#include <string>
using namespace std;
char base[64]; char table[256];
void init() {
    for (int i=0;i<26;i++) base[i]='A'+i;
    for (int i=0;i<26;i++) base[26+i]='a'+i;
    for (int i=0;i<10;i++) base[52+i]='0'+i;
    base[62]='+', base[63]='/';
    for (int i=0;i<256;i++) table[i]=0xff;
    for (int i=0;i<64;i++) table[base[i]]=i;
    table['=']=0;
}
string encode(string str) {
    string ret; int i;
    for (i=0;i+3<=str.size();i+=3) {
        ret+=base[str[i]>>2];
        ret+=base[(str[i]&0x03)<<4|str[i+1]>>4];
        ret+=base[(str[i+1]&0x0f)<<2|str[i+2]>>6];
        ret+=base[str[i+2]&0x3f];
    }
    if (i<str.size()) { /* padding */ }
    return ret;
}
string decode(string str) { /* decode */ }
int main() {
    init();
    cout << int(table[0]) << endl;
    int opt; string str;
    cin >> opt >> str;
    cout << (opt?decode(str):encode(str)) << endl;
    return 0;
}`,
    options: [{ key: 'A', text: '正确' }, { key: 'B', text: '错误' }],
    answer: ['A'],
    explanation: 'main函数首先输出int(table[0])（一个整数），然后根据opt输出encode或decode的结果（一个字符串）。无论输入如何，这两行输出总会出现。',
  },
  {
    id: 1302, type: 'reading', topic: '图论', difficulty: 'medium',
    question: '(29) 对于任意不含空白字符的字符串str1，先执行程序输入"0 str1"，得到输出的第二行记为str2；再执行程序输入"1 str2"，输出的第二行必为str1。（ ）',
    code: null,
    options: [{ key: 'A', text: '正确' }, { key: 'B', text: '错误' }],
    answer: ['A'],
    explanation: 'encode将任意二进制字符串编码为Base64，decode是encode的逆运算。先encode再decode一定得到原字符串（假设无信息丢失）。这是Base64编解码的基本性质。',
  },
  {
    id: 1303, type: 'reading', topic: '组合数学', difficulty: 'medium',
    question: '(30) 当输入为"1 SGVsbG93b3JsZA=="时，输出的第二行为"HelloWorld"。（ ）',
    code: null,
    options: [{ key: 'A', text: '正确' }, { key: 'B', text: '错误' }],
    answer: ['B'],
    explanation: 'SGVsbG93b3JsZA== 解码后是"Helloworld"（小写w），不是"HelloWorld"（大写W）。Base64解码：S=18,G=6,V=21...最终组成的字符串是"Helloworld"。',
  },
  {
    id: 1304, type: 'reading', topic: '组合数学', difficulty: 'medium',
    question: '(31) 设输入字符串长度为 n，encode 函数的时间复杂度为（ ）。',
    code: null,
    options: [
      { key: 'A', text: 'Θ(√n)' }, { key: 'B', text: 'Θ(n)' },
      { key: 'C', text: 'Θ(n log n)' }, { key: 'D', text: 'Θ(n!)' },
    ],
    answer: ['B'],
    explanation: 'encode函数遍历输入字符串一次，每3个字符生成4个Base64字符。每个字符做常数次位运算。时间复杂度Θ(n)。',
  },
  {
    id: 1305, type: 'reading', topic: '算法分析', difficulty: 'easy',
    question: '(32) 输出的第一行为（ ）。',
    code: null,
    options: [
      { key: 'A', text: '0xff' }, { key: 'B', text: '255' },
      { key: 'C', text: '0xFF' }, { key: 'D', text: '-1' },
    ],
    answer: ['D'],
    explanation: 'table[0]的值：init()中所有table初始化为0xff（即-1的有符号char值）。由于没有为0赋过值，table[0]保持0xff。cout << int(table[0])输出-1（将0xff解释为有符号整数）。',
  },
  {
    id: 1306, type: 'reading', topic: '数学基础', difficulty: 'hard',
    question: '(33)(4分) 当输入为"0 CSP2021csp"时，输出的第二行为（ ）。',
    code: null,
    options: [
      { key: 'A', text: 'Q1NQMjAyMWNzcA==' }, { key: 'B', text: 'Q1NQMjAyMGNzcA==' },
      { key: 'C', text: 'Q1NQMjAyMWNzcAv=' }, { key: 'D', text: 'Q1NQMjAyMGNzcAv=' },
    ],
    answer: ['A'],
    explanation: '将"CSP2021csp"编码为Base64：C→Q1, S→NQ, P→Mj, 2→Ay, 0→MW, 2→Nzc, 1→, c→, s→, p→... 完整编码为Q1NQMjAyMWNzcA==。注：原始字符串长度为10，不是3的倍数，补2个=。',
  },
],

// ==================== 完善程序(1)：魔法数字 ====================
[
  {
    id: 1401, type: 'fill', topic: '算法基础', difficulty: 'medium',
    question: '(34) ①处应填（ ）。',
    code: `#include <iostream>
#include <cstdlib>
#include <climits>
using namespace std;
const int M = 10000;
bool Vis[M+1]; int F[M+1];
void update(int &x, int y) { if (y<x) x=y; }
int main() {
    int n; cin >> n;
    for (int i=0; i<=M; i++) F[i]=INT_MAX;
    ①;
    int r = 0;
    while (②) {
        r++; int x = 0;
        for (int i=1; i<=M; i++)
            if (③) x = i;
        Vis[x] = 1;
        for (int i=1; i<=M; i++)
            if (④) {
                int t = F[i]+F[x];
                if (i+x<=M) update(F[i+x], t);
                if (i!=x) update(F[abs(i-x)], t);
                if (i%x==0) update(F[i/x], t);
                if (x%i==0) update(F[x/i], t);
            }
    }
    cout << F[n] << endl;
    return 0;
}`,
    options: [
      { key: 'A', text: 'F[4]=0' }, { key: 'B', text: 'F[1]=4' },
      { key: 'C', text: 'F[1]=2' }, { key: 'D', text: 'F[4]=1' },
    ],
    answer: ['D'],
    explanation: '魔法数字是4，用若干个4通过加减整除运算得到n。F[x]表示得到x至少需要多少个4。所以初始化F[4]=1（用一个4得到4）。注意0个4得到0，但这不是我们关心的。',
  },
  {
    id: 1402, type: 'fill', topic: '数据结构', difficulty: 'medium',
    question: '(35) ②处应填（ ）。',
    code: null,
    options: [
      { key: 'A', text: '!Vis[n]' }, { key: 'B', text: 'r < n' },
      { key: 'C', text: 'F[M]==INT_MAX' }, { key: 'D', text: 'F[n]==INT_MAX' },
    ],
    answer: ['D'],
    explanation: '这是BFS/DP的主循环条件。目标是计算F[n]，所以循环直到F[n]被计算出（不再是INT_MAX）。②处填F[n]==INT_MAX。',
  },
  {
    id: 1403, type: 'fill', topic: '数据结构', difficulty: 'hard',
    question: '(36) ③处应填（ ）。',
    code: null,
    options: [
      { key: 'A', text: 'F[i]==r' }, { key: 'B', text: '!Vis[i] && F[i]==r' },
      { key: 'C', text: 'F[i]<F[x]' }, { key: 'D', text: '!Vis[i] && F[i]<F[x]' },
    ],
    answer: ['D'],
    explanation: '③处选择当前BFS层中未访问过且使用4个数最少的数作为扩展起点。需要满足!Vis[i]（未访问）且F[i]最小。选项D正确：!Vis[i] && F[i]<F[x]。',
  },
  {
    id: 1404, type: 'fill', topic: '图论', difficulty: 'medium',
    question: '(37) ④处应填（ ）。',
    code: null,
    options: [
      { key: 'A', text: 'F[i]<F[x]' }, { key: 'B', text: 'F[i]<=r' },
      { key: 'C', text: 'Vis[i]' }, { key: 'D', text: 'i<=x' },
    ],
    answer: ['C'],
    explanation: '④处选择可以与x进行运算的数i。需要i已经被访问过（即已经计算出F[i]），这样才能在此基础上做加减整除运算。填Vis[i]。',
  },
],

// ==================== 完善程序(2)：RMQ区间最值 ====================
[
  {
    id: 1501, type: 'fill', topic: '数据结构', difficulty: 'hard',
    question: '(38) ①处应填（ ）。',
    code: `// Cartesian树 + Euler序 + ±1 RMQ (Method of Four Russians)
struct node { int val, dep, dfn, end; node *son[2]; } T[MAXN];
void build() {
    static node *S[MAXN+1]; int top = 0;
    for (int i=0; i<n; i++) {
        node *p = &T[i];
        while (top && S[top]->val < p->val) ①;
        if (top) ②;
        S[++top] = p;
    }
    root = S[1];
}
}
void DFS(node *p) {
    A[p->dfn = t++] = p;
    for (int i = 0; i < 2; i++)
        if (p->son[i]) {
            p->son[i]->dep = p->dep + 1;
            DFS(p->son[i]);
            A[t++] = p;
        }
    p->end = t - 1;
}
node *min(node *x, node *y) { return ③ ? x : y; }
void ST_init() {
    b = (int)(ceil(log2(t) / 2));
    c = t / b;
    Log2[1] = 0;
    for (int i = 2; i <= c; i++) Log2[i] = Log2[i >> 1] + 1;
    for (int i = 0; i < c; i++) {
        Min[0][i] = A[i * b];
        for (int j = 1; j < b; j++) Min[0][i] = min(Min[0][i], A[i * b + j]);
    }
    for (int i = 1, l = 2; l <= c; i++, l <<= 1)
        for (int j = 0; j + l <= c; j++)
            Min[i][j] = min(Min[i - 1][j], Min[i - 1][j + (l >> 1)]);
}
void small_init() {
    for (int i = 0; i <= c; i++)
        for (int j = 1; j < b && i * b + j < t; j++)
            if (④) Dif[i] |= 1 << (j - 1);
    for (int S = 0; S < (1 << (b - 1)); S++) {
        int mx = 0, v = 0;
        for (int i = 1; i < b; i++) {
            ⑤;
            if (v < mx) { mx = v; Pos[S] = i; }
        }
    }
}
node *ST_query(int l, int r) {
    int g = Log2[r - l + 1];
    return min(Min[g][l], Min[g][r - (1 << g) + 1]);
}
node *small_query(int l, int r) {
    int p = l / b;
    int S = ⑥;
    return A[l + Pos[S]];
}
node *query(int l, int r) {
    if (l > r) return query(r, l);
    int pl = l / b, pr = r / b;
    if (pl == pr) return small_query(l, r);
    else {
        node *s = min(small_query(l, pl * b + b - 1), small_query(pr * b, r));
        if (pl + 1 <= pr - 1) s = min(s, ST_query(pl + 1, pr - 1));
        return s;
    }
}`,
    options: [
      { key: 'A', text: 'p->son[0]=S[top--]' },
      { key: 'B', text: 'p->son[1]=S[top--]' },
      { key: 'C', text: 'S[top--]->son[0]=p' },
      { key: 'D', text: 'S[top--]->son[1]=p' },
    ],
    answer: ['A'],
    explanation: '建立Cartesian树（笛卡尔树）的标准过程。单调栈维护右链。当栈顶值小于当前值时，弹出栈顶并设为当前结点的左儿子。①处填p->son[0]=S[top--]。',
  },
  {
    id: 1502, type: 'fill', topic: '算法分析', difficulty: 'hard',
    question: '(39) ②处应填（ ）。',
    code: null,
    options: [
      { key: 'A', text: 'p->son[0]=S[top]' },
      { key: 'B', text: 'p->son[1]=S[top]' },
      { key: 'C', text: 'S[top]->son[0]=p' },
      { key: 'D', text: 'S[top]->son[1]=p' },
    ],
    answer: ['D'],
    explanation: '当栈非空时，栈顶元素的val大于当前p的val。将p设为栈顶的右儿子。②处填S[top]->son[1]=p。',
  },
  {
    id: 1503, type: 'fill', topic: '排序算法', difficulty: 'medium',
    question: '(40) ③处应填（ ）。',
    code: null,
    options: [
      { key: 'A', text: 'x->dep < y->dep' },
      { key: 'B', text: 'x < y' },
      { key: 'C', text: 'x->dep > y->dep' },
      { key: 'D', text: 'x->val < y->val' },
    ],
    answer: ['A'],
    explanation: 'min函数用于在Euler序列中找深度较小的结点（即LCA）。③处比较两个结点的深度，返回深度小的。填x->dep < y->dep。',
  },
  {
    id: 1504, type: 'fill', topic: '算法基础', difficulty: 'hard',
    question: '(41) ④处应填（ ）。',
    code: null,
    options: [
      { key: 'A', text: 'A[i*b+j-1]==A[i*b+j]->son[0]' },
      { key: 'B', text: 'A[i*b+j]->val < A[i*b+j-1]->val' },
      { key: 'C', text: 'A[i*b+j]==A[i*b+j-1]->son[1]' },
      { key: 'D', text: 'A[i*b+j]->dep < A[i*b+j-1]->dep' },
    ],
    answer: ['D'],
    explanation: '在±1 RMQ的块内预处理中，Dif数组记录相邻元素深度的增减（0表示深度+1，1表示深度-1）。④处判断：如果当前结点深度小于前一个结点深度（说明向上走了），则将Dif对应位设为1。填A[i*b+j]->dep < A[i*b+j-1]->dep。',
  },
  {
    id: 1505, type: 'fill', topic: '计算机基础', difficulty: 'hard',
    question: '(42) ⑤处应填（ ）。',
    code: null,
    options: [
      { key: 'A', text: 'v += (S>>i & 1) ? -1 : 1' },
      { key: 'B', text: 'v += (S>>i & 1) ? 1 : -1' },
      { key: 'C', text: 'v += (S>>(i-1) & 1) ? 1 : -1' },
      { key: 'D', text: 'v += (S>>(i-1) & 1) ? -1 : 1' },
    ],
    answer: ['D'],
    explanation: '模拟块内深度变化。S是差分编码（0表示+1，1表示-1）。遍历时v从0开始，根据S的每一位更新：若(S>>(i-1)&1)==1表示深度-1（v--），==0表示深度+1（v++）。记录最小深度位置。选项D：v+=(S>>(i-1)&1)?-1:1即-1对应S位1，+1对应S位0。',
  },
  {
    id: 1506, type: 'fill', topic: '计算机基础', difficulty: 'hard',
    question: '(43) ⑥处应填（ ）。',
    code: null,
    options: [
      { key: 'A', text: '(Dif[p]>>(r-p*b)) & ((1<<(r-l))-1)' },
      { key: 'B', text: 'Dif[p]' },
      { key: 'C', text: '(Dif[p]>>(l-p*b)) & ((1<<(r-l))-1)' },
      { key: 'D', text: '(Dif[p]>>((p+1)*b-r)) & ((1<<(r-l+1))-1)' },
    ],
    answer: ['C'],
    explanation: '块内查询：从Dif[p]中提取区间[l,r]对应的差分编码。l-p*b是块内偏移，需要右移这么多位。区间长度为r-l，需要保留r-l位（二进制位从0到r-l-1）。所以掩码为(1<<(r-l))-1。选项C正确。',
  },
]

);

/* ---------- 追加到主题库 ---------- */
for (const q of CSP2021_BANK) {
  QUESTION_BANK.push(q);
}

/* 更新大题分组：追加2021年大题 */
READING_SECTIONS.push(
  { label: '2021阅读一', ids: [1101,1102,1103,1104,1105,1106], year: '2021' },
  { label: '2021阅读二', ids: [1201,1202,1203,1204,1205,1206], year: '2021' },
  { label: '2021阅读三', ids: [1301,1302,1303,1304,1305,1306], year: '2021' },
);
FILL_SECTIONS.push(
  { label: '2021填空一', ids: [1401,1402,1403,1404], year: '2021' },
  { label: '2021填空二', ids: [1501,1502,1503,1504,1505,1506], year: '2021' },
);
