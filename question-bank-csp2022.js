/* CSP 2022 真题两套 */

const CSP2022_BANK = [].concat(

// ============ 第一套：选择题 ============
[
  { id: 2201, type: 'choice', topic: 'C++语法', difficulty: 'easy', question: '以下哪种功能没有涉及C++语言的面向对象特性支持？', code: null, options: [{key:'A',text:'调用printf函数'},{key:'B',text:'调用用户定义的类成员函数'},{key:'C',text:'构造class或struct'},{key:'D',text:'构造来源于同一基类的多个派生类'}], answer: ['A'], explanation: 'printf是C语言函数，与类、继承、多态等OOP机制无关。' },
  { id: 2202, type: 'choice', topic: '数据结构', difficulty: 'medium', question: '6个元素按6,5,4,3,2,1依次入栈，下列哪个出栈序列不可能出现？', code: null, options: [{key:'A',text:'5 4 3 6 1 2'},{key:'B',text:'4 5 3 1 2 6'},{key:'C',text:'3 4 6 5 2 1'},{key:'D',text:'2 3 4 1 5 6'}], answer: ['C'], explanation: '4出栈时6和5仍在栈内且5在6之上，不能先出6再出5。' },
  { id: 2203, type: 'choice', topic: 'C++语法', difficulty: 'easy', question: 'int x=101,y=201; int *p=&x; int *q=&y; p=q; 指针p指向哪里？', code: null, options: [{key:'A',text:'指向x'},{key:'B',text:'指向y'},{key:'C',text:'指向q'},{key:'D',text:'指向201'}], answer: ['B'], explanation: 'p=q把q的值(&y)赋给p，p指向y。' },
  { id: 2204, type: 'choice', topic: '数据结构', difficulty: 'easy', question: '关于链表与数组的区别，说法正确的是？', code: null, options: [{key:'A',text:'数组不能排序，链表可以'},{key:'B',text:'链表比数组能存储更多信息'},{key:'C',text:'数组大小固定，链表大小可动态调整'},{key:'D',text:'以上均正确'}], answer: ['C'], explanation: '数组创建时长度固定；链表可动态伸缩。A、B均错误。' },
  { id: 2205, type: 'choice', topic: '数据结构', difficulty: 'medium', question: 'e1~e6依次进栈S，出队列顺序为e2,e4,e3,e6,e5,e1，栈S容量至少为？', code: null, options: [{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'},{key:'D',text:'6'}], answer: ['B'], explanation: '模拟进出过程，栈内同时最多出现3个元素。' },
  { id: 2206, type: 'choice', topic: '数据结构', difficulty: 'medium', question: '表达式a+(b-c)*d的前缀形式是？', code: null, options: [{key:'A',text:'* + a - b c d'},{key:'B',text:'+ a * - b c d'},{key:'C',text:'a b c - d * +'},{key:'D',text:'a b c - + d *'}], answer: ['B'], explanation: '运算符前置：先b-c→-bc，再×d→*-bcd，最后a+→+a*-bcd。' },
  { id: 2207, type: 'choice', topic: '数据结构', difficulty: 'medium', question: '字母{a,b,c,d,e}频率10%,15%,30%,16%,29%，哈夫曼编码中d的编码长度？', code: null, options: [{key:'A',text:'1'},{key:'B',text:'2'},{key:'C',text:'2或3'},{key:'D',text:'3'}], answer: ['B'], explanation: '构建哈夫曼树：10-15→25；25-16→41；30-29→59；41-59→100。d位于第二层，编码长度2。' },
  { id: 2208, type: 'choice', topic: '数据结构', difficulty: 'medium', question: '完全二叉树数组存储，根在1号。9号节点既有兄弟又有两个孩子，则兄弟与右孩子分别是？', code: null, options: [{key:'A',text:'8、18'},{key:'B',text:'10、18'},{key:'C',text:'8、19'},{key:'D',text:'10、19'}], answer: ['C'], explanation: '9为右孩子→父4→兄弟8。右孩子下标=9×2+1=19。' },
  { id: 2209, type: 'choice', topic: '图论', difficulty: 'easy', question: 'N个顶点有向连通图用邻接矩阵表示，至少存在多少个非零元素？', code: null, options: [{key:'A',text:'N-1'},{key:'B',text:'N'},{key:'C',text:'N+1'},{key:'D',text:'N²'}], answer: ['A'], explanation: '弱连通图最少需N-1条有向边。' },
  { id: 2210, type: 'choice', topic: '数据结构', difficulty: 'easy', question: '关于数据结构表述不恰当的是？', code: null, options: [{key:'A',text:'图的DFS常用栈实现'},{key:'B',text:'栈后进先出，队列先进先出'},{key:'C',text:'队列常用于BFS'},{key:'D',text:'栈与队列本质不同，无法用栈实现队列'}], answer: ['D'], explanation: '两个栈即可模拟队列。' },
  { id: 2211, type: 'choice', topic: '数据结构', difficulty: 'medium', question: '在双向循环链表节点p之后插入节点s，正确的操作顺序是？', code: null, options: [{key:'A',text:'p->next->prev=s; s->prev=p; p->next=s; s->next=p->next;'},{key:'B',text:'s->prev=p; s->next=p->next; p->next=s; p->next->prev=s;'},{key:'C',text:'p->next=s; p->next->prev=s; s->prev=p; s->next=p->next;'},{key:'D',text:'s->next=p->next; p->next->prev=s; s->prev=p; p->next=s;'}], answer: ['D'], explanation: '先保存p->next再改指针，防止断链。D顺序正确。' },
  { id: 2212, type: 'choice', topic: '排序算法', difficulty: 'easy', question: '关于排序算法稳定性，说法错误的是？', code: null, options: [{key:'A',text:'冒泡排序稳定'},{key:'B',text:'简单选择排序稳定'},{key:'C',text:'简单插入排序稳定'},{key:'D',text:'归并排序稳定'}], answer: ['B'], explanation: '简单选择排序交换不相邻元素，破坏稳定性。' },
  { id: 2213, type: 'choice', topic: '计算机基础', difficulty: 'easy', question: '八进制数32.1对应的十进制数是？', code: null, options: [{key:'A',text:'24.125'},{key:'B',text:'24.250'},{key:'C',text:'26.125'},{key:'D',text:'26.250'}], answer: ['C'], explanation: '3×8+2=26；1×8⁻¹=0.125；合计26.125。' },
  { id: 2214, type: 'choice', topic: '字符串算法', difficulty: 'medium', question: '字符串"abcab"共有多少个互不相同的子串（含空串）？', code: null, options: [{key:'A',text:'12'},{key:'B',text:'13'},{key:'C',text:'14'},{key:'D',text:'15'}], answer: ['B'], explanation: '空串1+长度1的3+长度2的3+长度3的3+长度4的2+长度5的1=13。' },
  { id: 2215, type: 'choice', topic: '算法基础', difficulty: 'easy', question: '下列对递归的描述中，正确的是？', code: null, options: [{key:'A',text:'递归允许使用多组参数调用函数'},{key:'B',text:'递归通过调用自身求解问题'},{key:'C',text:'递归是面向对象而非逻辑的模型'},{key:'D',text:'递归是将高级语言翻译成机器码的技术'}], answer: ['B'], explanation: '递归的核心特征是函数直接或间接调用自身。' },
],

// ============ 第一套：阅读(1) Sunday字符串匹配 ============
[
  { id: 3216, type: 'reading', topic: '字符串算法', difficulty: 'medium', question: '(16)输入abcde fg时，输出为-1。', code: '#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\nint f(const string &s, const string &t) {\n  int n=s.length(), m=t.length();\n  vector<int> shift(128, m+1);\n  int i, j;\n  for (j=0; j<m; j++) shift[t[j]] = m-j;\n  for (i=0; i<=n-m; i+=shift[s[i+m]]) {\n    j=0;\n    while (j<m && s[i+j]==t[j]) j++;\n    if (j==m) return i;\n  }\n  return -1;\n}\nint main() { string a,b; cin>>a>>b; cout<<f(a,b)<<endl; return 0; }', options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['A'], explanation: 'fg不是abcde的子串，返回-1。' },
  { id: 3217, type: 'reading', topic: '字符串算法', difficulty: 'medium', question: '(17)输入abbababbbab abab时，输出为4。', code: null, options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['B'], explanation: 'abab在abbababbbab中首次出现位置是3（0-based），不是4。' },
  { id: 3218, type: 'reading', topic: '字符串算法', difficulty: 'medium', question: '(18)输入GoodLuckCsp2022 22时，第20行j++执行次数为2。', code: null, options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['A'], explanation: '模式串22长度m=2，匹配成功时j从0到2，j++执行2次。' },
  { id: 3219, type: 'reading', topic: '算法分析', difficulty: 'medium', question: '(19)该算法最坏时间复杂度为（）。', code: null, options: [{key:'A',text:'O(n+m)'},{key:'B',text:'O(n log m)'},{key:'C',text:'O(m log n)'},{key:'D',text:'O(nm)'}], answer: ['D'], explanation: '构造s="aaa...a",t="aaa...b"时退化为O(nm)。' },
  { id: 3220, type: 'reading', topic: '字符串算法', difficulty: 'easy', question: '(20)f(a,b)与下列哪个语句功能最类似？', code: null, options: [{key:'A',text:'a.find(b)'},{key:'B',text:'a.rfind(b)'},{key:'C',text:'a.substr(b)'},{key:'D',text:'a.compare(b)'}], answer: ['A'], explanation: 'f在a中查找b首次出现位置，找不到返回-1，与find一致。' },
  { id: 3221, type: 'reading', topic: '字符串算法', difficulty: 'hard', question: '(21)输入baaabaaabaaabaaaa aaaa时，j++执行次数为（）。', code: null, options: [{key:'A',text:'9'},{key:'B',text:'10'},{key:'C',text:'11'},{key:'D',text:'12'}], answer: ['B'], explanation: '逐次模拟位移和匹配，j++总计执行10次。' },
],

// ============ 第一套：阅读(2) k进制基数排序 ============
[
  { id: 3222, type: 'reading', topic: '排序算法', difficulty: 'medium', question: '(22)这是一个不稳定的排序算法。', code: '#include <iostream>\nusing namespace std;\nconst int MAXN=1010;\nint n,k,val[MAXN],m;\nvoid init(){\n  int maximum=val[0];\n  for(int i=1;i<n;i++)if(val[i]>maximum)maximum=val[i];\n  m=0;\n  while(maximum>=k){maximum/=k;m++;}\n  m++;\n}\nvoid solve(){\n  int base=1;\n  for(int i=0;i<m;i++){\n    int cnt[MAXN]={0},temp[MAXN];\n    for(int j=0;j<n;j++)cnt[val[j]/base%k]++;\n    for(int j=1;j<k;j++)cnt[j]+=cnt[j-1];\n    for(int j=n-1;j>=0;j--){cnt[val[j]/base%k]--;temp[cnt[val[j]/base%k]]=val[j];}\n    for(int j=0;j<n;j++)val[j]=temp[j];\n    base*=k;\n  }\n}\nint main(){cin>>n>>k;for(int i=0;i<n;i++)cin>>val[i];init();solve();for(int i=0;i<n;i++)cout<<val[i]<<" ";return 0;}', options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['B'], explanation: '基数排序基于稳定计数排序，从后向前放置保证稳定性，整体稳定。' },
  { id: 3223, type: 'reading', topic: '排序算法', difficulty: 'medium', question: '(23)该算法空间复杂度仅与n有关。', code: null, options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['B'], explanation: 'cnt[]大小为k，temp[]大小为n。空间复杂度O(n+k)，与n和k都有关。' },
  { id: 3224, type: 'reading', topic: '算法分析', difficulty: 'easy', question: '(24)该算法时间复杂度为O(m(n+k))。', code: null, options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['A'], explanation: '外层m次，每次O(n+k)，总计O(m(n+k))。' },
  { id: 3225, type: 'reading', topic: '排序算法', difficulty: 'medium', question: '(25)输入5 3 98 26 91 37 46时，第一次执行到第36行val[]为（）。', code: null, options: [{key:'A',text:'91 26 46 37 98'},{key:'B',text:'91 46 37 26 98'},{key:'C',text:'98 26 46 91 37'},{key:'D',text:'91 37 46 98 26'}], answer: ['D'], explanation: '按3进制第0位稳定排序后得91 37 46 98 26。' },
  { id: 3226, type: 'reading', topic: '算法分析', difficulty: 'medium', question: '(26)val[i]最大值为100，k取（）时运算次数最少。', code: null, options: [{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'10'},{key:'D',text:'不确定'}], answer: ['D'], explanation: '运算次数=m(n+k)，n的大小影响最优k，无法确定。' },
  { id: 3227, type: 'reading', topic: '排序算法', difficulty: 'medium', question: '(27)当k>max(val[i])时，该算法退化为（）。', code: null, options: [{key:'A',text:'选择排序'},{key:'B',text:'冒泡排序'},{key:'C',text:'计数排序'},{key:'D',text:'桶排序'}], answer: ['C'], explanation: 'k大于所有值→所有数一位(m=1)，退化为计数排序。' },
],

// ============ 第一套：阅读(3) 负进制转换 ============
[
  { id: 3228, type: 'reading', topic: '数学基础', difficulty: 'medium', question: '(28)该算法时间复杂度为O(log_k n)。', code: '#include <iostream>\n#include <algorithm>\nusing namespace std;\nchar ans[100];int n,k,m;\nvoid solve(){\n  if(n==0){ans[m++]=\'0\';return;}\n  while(n!=0){\n    int digit=((n%k)+k)%k;\n    ans[m++]=(char)(digit<10?\'0\'+digit:\'A\'+digit-10);\n    n=(n-digit)/k;\n  }\n  reverse(ans,ans+m);\n}\nint main(){cin>>n>>k;solve();cout<<ans<<endl;return 0;}', options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['B'], explanation: 'n可为负数，应为O(log_k|n|)，非O(log_k n)。' },
  { id: 3229, type: 'reading', topic: '计算机基础', difficulty: 'easy', question: '(29)删除第16行强制类型转换，程序行为不变。', code: null, options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['B'], explanation: '删除(char)可能导致类型推断变化。' },
  { id: 3230, type: 'reading', topic: '算法分析', difficulty: 'easy', question: '(30)除非n=0，否则输出字符数为O(⌊log_k|n|⌋+1)。', code: null, options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['A'], explanation: '绝对值每次除以k，循环次数⌊log_k|n|⌋+1。' },
  { id: 3231, type: 'reading', topic: '计算机基础', difficulty: 'easy', question: '(31)输入100 7时输出为（）。', code: null, options: [{key:'A',text:'202'},{key:'B',text:'1515'},{key:'C',text:'244'},{key:'D',text:'1754'}], answer: ['A'], explanation: '100转7进制：100÷7=14余2,14÷7=2余0,2÷7=0余2→202。' },
  { id: 3232, type: 'reading', topic: '数学基础', difficulty: 'hard', question: '(32)输入-255 8时输出为（）。', code: null, options: [{key:'A',text:'1400'},{key:'B',text:'1401'},{key:'C',text:'417'},{key:'D',text:'400'}], answer: ['B'], explanation: '负进制转换(-8进制)：-255→1401。验证：1×(-8)³+4×(-8)²+0×(-8)+1=-255。' },
  { id: 3233, type: 'reading', topic: '数学基础', difficulty: 'hard', question: '(33)输入1000000 19时输出为（）。', code: null, options: [{key:'A',text:'BG939'},{key:'B',text:'87GIB'},{key:'C',text:'1CD428'},{key:'D',text:'7CF1B'}], answer: ['B'], explanation: '1000000转-19进制得87GIB。' },
],

// ============ 第一套：完善(1) 归并第k小 ============
[
  { id: 4234, type: 'fill', topic: '二分查找', difficulty: 'hard', question: '(34)①处应填（）。', code: 'int solve(int *a1,int *a2,int n,int k){\n  int left1=0,right1=n-1,left2=0,right2=n-1;\n  while(left1<=right1&&left2<=right2){\n    int m1=(left1+right1)>>1,m2=(left2+right2)>>1;\n    int cnt=①;\n    if(②){\n      if(cnt<k)left1=m1+1;else right2=m2-1;\n    }else{\n      if(cnt<k)left2=m2+1;else right1=m1-1;\n    }\n  }\n  if(③){\n    if(left1==0)return a2[k-1];\n    else{int x=a1[left1-1],④;return max(x,y);}\n  }else{\n    if(left2==0)return a1[k-1];\n    else{int x=a2[left2-1],⑤;return max(x,y);}\n  }\n}', options: [{key:'A',text:'(m1+m2)*2'},{key:'B',text:'(m1-1)+(m2-1)'},{key:'C',text:'m1+m2'},{key:'D',text:'(m1+1)+(m2+1)'}], answer: ['C'], explanation: 'cnt统计两个数组中mid位置之前的元素总数，即m1+m2。' },
  { id: 4235, type: 'fill', topic: '二分查找', difficulty: 'hard', question: '(35)②处应填（）。', code: null, options: [{key:'A',text:'a1[m1]==a2[m2]'},{key:'B',text:'a1[m1]<=a2[m2]'},{key:'C',text:'a1[m1]>=a2[m2]'},{key:'D',text:'a1[m1]!=a2[m2]'}], answer: ['B'], explanation: '比较a1[m1]与a2[m2]大小，决定收缩哪个数组区间。' },
  { id: 4236, type: 'fill', topic: '二分查找', difficulty: 'hard', question: '(36)③处应填（）。', code: null, options: [{key:'A',text:'left1==right1'},{key:'B',text:'left1<right1'},{key:'C',text:'left1>right1'},{key:'D',text:'left1!=right1'}], answer: ['C'], explanation: 'while循环结束条件：left1>right1或left2>right2。③判断a1是否被排除(left1>right1)，若是则答案在a2。' },
  { id: 4237, type: 'fill', topic: '二分查找', difficulty: 'hard', question: '(37)④处应填（）。', code: null, options: [{key:'A',text:'y=a1[k-left2-1]'},{key:'B',text:'y=a1[k-left2]'},{key:'C',text:'y=a2[k-left1-1]'},{key:'D',text:'y=a2[k-left1]'}], answer: ['C'], explanation: 'a1已排除left1个元素，答案在a2中第(k-left1)个，下标k-left1-1。' },
  { id: 4238, type: 'fill', topic: '二分查找', difficulty: 'hard', question: '(38)⑤处应填（）。', code: null, options: [{key:'A',text:'y=a1[k-left2-1]'},{key:'B',text:'y=a1[k-left2]'},{key:'C',text:'y=a2[k-left1-1]'},{key:'D',text:'y=a2[k-left1]'}], answer: ['A'], explanation: '对称情况：a2已排除left2个元素，答案在a1中第(k-left2)个，下标k-left2-1。' },
  { id: 4335, type: 'fill', topic: '数论', difficulty: 'easy', question: '(35)①处应填（）。', code: 'int main(){\n  int n;cin>>n;\n  vector<int>fac;fac.reserve(ceil(sqrt(n)));\n  int i;\n  for(i=1;i*i<n;++i){if(①)fac.push_back(i);}\n  for(int k=0;k<fac.size();++k)cout<<②<<" ";\n  if(③)cout<<④<<" ";\n  for(int k=fac.size()-1;k>=0;--k)cout<<⑤<<" ";\n}', options: [{key:'A',text:'n%i==0'},{key:'B',text:'n%i==1'},{key:'C',text:'n%(i-1)==0'},{key:'D',text:'n%(i-1)==1'}], answer: ['A'], explanation: '判断i是否为n的因数：n%i==0。' },
  { id: 4336, type: 'fill', topic: '数论', difficulty: 'easy', question: '(36)②处应填（）。', code: null, options: [{key:'A',text:'n/fac[k]'},{key:'B',text:'fac[k]'},{key:'C',text:'fac[k]-1'},{key:'D',text:'n/(fac[k]-1)'}], answer: ['B'], explanation: 'fac存储小于√n的因数，直接输出fac[k]。' },
  { id: 4337, type: 'fill', topic: '数论', difficulty: 'easy', question: '(37)③处应填（）。', code: null, options: [{key:'A',text:'(i-1)*(i-1)==n'},{key:'B',text:'(i-1)*i==n'},{key:'C',text:'i*i==n'},{key:'D',text:'i*(i-1)==n'}], answer: ['C'], explanation: '检查是否有平方根因子：i*i==n。' },
  { id: 4338, type: 'fill', topic: '数论', difficulty: 'easy', question: '(38)④处应填（）。', code: null, options: [{key:'A',text:'n-i'},{key:'B',text:'n-i+1'},{key:'C',text:'i-1'},{key:'D',text:'i'}], answer: ['D'], explanation: 'i*i==n时输出平方根i。' },
  { id: 4339, type: 'fill', topic: '数论', difficulty: 'easy', question: '(39)⑤处应填（）。', code: null, options: [{key:'A',text:'n/fac[k]'},{key:'B',text:'fac[k]'},{key:'C',text:'fac[k]-1'},{key:'D',text:'n/(fac[k]-1)'}], answer: ['A'], explanation: '逆序输出对应的较大因数n/fac[k]。' },
],

// ============ 第二套：完善(2) 洪水填充BFS ============
[
  { id: 4340, type: 'fill', topic: '搜索算法', difficulty: 'medium', question: '(40)is_valid中①处应填（）。', code: 'bool is_valid(char image[8][8],Point pt,int prev_color,int new_color){\n  int r=pt.r,c=pt.c;\n  return (0<=r&&r<8&&0<=c&&c<8&&①&&image[r][c]!=new_color);\n}\nvoid flood_fill(char image[8][8],Point cur,int new_color){\n  queue<Point>q;q.push(cur);\n  int prev_color=image[cur.r][cur.c];\n  ②;\n  while(!q.empty()){\n    Point pt=q.front();q.pop();\n    Point points[4]={③,Point(pt.r-1,pt.c),Point(pt.r,pt.c+1),Point(pt.r,pt.c-1)};\n    for(auto p:points)\n      if(is_valid(image,p,prev_color,new_color)){④;⑤;}\n  }\n}', options: [{key:'A',text:'image[r][c]==prev_color'},{key:'B',text:'image[r][c]!=prev_color'},{key:'C',text:'image[r][c]==new_color'},{key:'D',text:'image[r][c]!=new_color'}], answer: ['A'], explanation: '需判断该像素颜色与起始颜色相同。注意原选项D的表述在题中是image[r][c]!=new_color。' },
  { id: 4341, type: 'fill', topic: '搜索算法', difficulty: 'medium', question: '(41)②处应填（）。', code: null, options: [{key:'A',text:'image[cur.r][cur.c]=new_color'},{key:'B',text:'image[cur.r][cur.c]=new_color'},{key:'C',text:'prev_color=new_color'},{key:'D',text:'new_color=prev_color'}], answer: ['B'], explanation: '将起始像素颜色替换为新颜色。' },
  { id: 4342, type: 'fill', topic: '搜索算法', difficulty: 'medium', question: '(42)③处应填（）。', code: null, options: [{key:'A',text:'Point(pt.r,pt.c+1)'},{key:'B',text:'Point(pt.r+1,pt.c+1)'},{key:'C',text:'Point(pt.r+1,pt.c)'},{key:'D',text:'Point(pt.r-1,pt.c-1)'}], answer: ['C'], explanation: '四个方向：上(r-1,c)、下(r+1,c)、右(r,c+1)、左(r,c-1)。③是下方向。' },
  { id: 4343, type: 'fill', topic: '搜索算法', difficulty: 'medium', question: '(43)④处应填（）。', code: null, options: [{key:'A',text:'image[p.r][p.c]=prev_color'},{key:'B',text:'image[p.r][p.c]=cur_color'},{key:'C',text:'prev_color=image[p.r][p.c]'},{key:'D',text:'image[p.r][p.c]=new_color'}], answer: ['D'], explanation: '将有效相邻像素颜色替换为新颜色。' },
  { id: 4344, type: 'fill', topic: '搜索算法', difficulty: 'easy', question: '(44)⑤处应填（）。', code: null, options: [{key:'A',text:'queue.push(p)'},{key:'B',text:'queue.pop()'},{key:'C',text:'queue.front()'},{key:'D',text:'queue.push(pt)'}], answer: ['A'], explanation: '将有效相邻像素加入队列继续BFS。' },
]

);

for (const q of CSP2022_BANK) QUESTION_BANK.push(q);

READING_SECTIONS.push(
  { label: '2022一·Sunday匹配', ids: [3216,3217,3218,3219,3220,3221], year: '2022' },
  { label: '2022一·基数排序', ids: [3222,3223,3224,3225,3226,3227], year: '2022' },
  { label: '2022一·负进制转换', ids: [3228,3229,3230,3231,3232,3233], year: '2022' },
  { label: '2022二·位运算', ids: [3316,3317,3318,3319,3320,3321], year: '2022' },
  { label: '2022二·扔鸡蛋DP', ids: [3322,3323,3324,3325,3326,3327], year: '2022' },
  { label: '2022二·二分牛顿', ids: [3328,3329,3330,3331,3332,3333,3334], year: '2022' },
);
FILL_SECTIONS.push(
  { label: '2022一·归并第k小', ids: [4234,4235,4236,4237,4238], year: '2022' },
  { label: '2022一·容器分水', ids: [4239,4240,4241,4242,4243], year: '2022' },
  { label: '2022二·打印因数', ids: [4335,4336,4337,4338,4339], year: '2022' },
  { label: '2022二·洪水填充', ids: [4340,4341,4342,4343,4344], year: '2022' },
);
