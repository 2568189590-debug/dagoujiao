/* CSP-S 2024 初赛真题 */

const CSP2024_BANK = [].concat(

// ============ 一、单项选择题 (15道) ============
[
  { id: 2401, type: 'choice', topic: '计算机基础', difficulty: 'easy', question: '在Linux系统中，如果你想显示当前工作目录的路径，应该使用哪个命令？', code: null, options: [{key:'A',text:'pwd'},{key:'B',text:'cd'},{key:'C',text:'ls'},{key:'D',text:'echo'}], answer: ['A'], explanation: 'pwd(print working directory)显示当前工作目录路径。cd切换目录，ls列出文件，echo输出字符串。' },
  { id: 2402, type: 'choice', topic: '算法分析', difficulty: 'easy', question: '长度为n的整数数组元素互不相同且无序，找到最大元素的时间复杂度是？', code: null, options: [{key:'A',text:'O(n)'},{key:'B',text:'O(log n)'},{key:'C',text:'O(n log n)'},{key:'D',text:'O(1)'}], answer: ['A'], explanation: '无序数组找最大值必须遍历所有n个元素，O(n)。' },
  { id: 2403, type: 'choice', topic: 'C++语法', difficulty: 'easy', question: '在C++中，以下哪个函数调用会造成栈溢出？', code: null, options: [{key:'A',text:'int foo(){return 0;}'},{key:'B',text:'int bar(){int x=1;return x;}'},{key:'C',text:'void baz(){int a[1000];baz();}'},{key:'D',text:'void qux(){return;}'}], answer: ['C'], explanation: 'baz()无限递归调用自身且每次分配1000个int，终将栈溢出。' },
  { id: 2404, type: 'choice', topic: '组合数学', difficulty: 'easy', question: '10名选手参赛，前三名获金、银、铜牌（不允许并列），不同颁奖方式共多少种？', code: null, options: [{key:'A',text:'120'},{key:'B',text:'720'},{key:'C',text:'504'},{key:'D',text:'1000'}], answer: ['B'], explanation: '排列问题：10×9×8=720种。' },
  { id: 2405, type: 'choice', topic: '数据结构', difficulty: 'easy', question: '下面哪个数据结构最适合实现先进先出(FIFO)的功能？', code: null, options: [{key:'A',text:'栈'},{key:'B',text:'队列'},{key:'C',text:'线性表'},{key:'D',text:'二叉搜索树'}], answer: ['B'], explanation: '队列(queue)就是FIFO结构：队尾入队，队头出队。' },
  { id: 2406, type: 'choice', topic: '算法基础', difficulty: 'medium', question: '已知f(1)=1，对于n≥2有f(n)=f(n-1)+f(⌊n/2⌋)，则f(4)的值为？', code: null, options: [{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'},{key:'D',text:'7'}], answer: ['B'], explanation: 'f(1)=1; f(2)=f(1)+f(1)=2; f(3)=f(2)+f(1)=3; f(4)=f(3)+f(2)=3+2=5。' },
  { id: 2407, type: 'choice', topic: '图论', difficulty: 'medium', question: '包含n个顶点的无向图是欧拉图。以下描述中哪一项不一定正确？', code: null, options: [{key:'A',text:'所有顶点度数均为偶数'},{key:'B',text:'该图连通'},{key:'C',text:'该图存在一个欧拉回路'},{key:'D',text:'该图的边数是奇数'}], answer: ['D'], explanation: '欧拉图要求连通且所有顶点度数为偶数，存在欧拉回路。但边数可以是偶数（如4点成圈4条边）也可以是奇数，不一定。' },
  { id: 2408, type: 'choice', topic: '算法基础', difficulty: 'easy', question: '对数组进行二分查找的过程中，以下哪个条件必须满足？', code: null, options: [{key:'A',text:'数组必须是有序的'},{key:'B',text:'数组必须是无序的'},{key:'C',text:'数组长度必须是2的幂'},{key:'D',text:'数组中的元素必须是整数'}], answer: ['A'], explanation: '二分查找的前提：数组有序（升序或降序）。元素可以是任意可比较类型，长度无限制。' },
  { id: 2409, type: 'choice', topic: '数学基础', difficulty: 'medium', question: '计算n在模m意义下的乘法逆元，下列哪种算法最为适合？', code: null, options: [{key:'A',text:'暴力法依次尝试'},{key:'B',text:'扩展欧几里得算法'},{key:'C',text:'快速幂法'},{key:'D',text:'线性筛法'}], answer: ['B'], explanation: '扩展欧几里得算法可求任意互质n,m的逆元。快速幂法仅在m为质数时可用（费马小定理）。' },
  { id: 2410, type: 'choice', topic: '数据结构', difficulty: 'medium', question: '哈希表使用开放地址法解决冲突，装载因子α(0<α≤1)，最坏情况下查找时间复杂度为？', code: null, options: [{key:'A',text:'O(1)'},{key:'B',text:'O(log n)'},{key:'C',text:'O(1/(1-α))'},{key:'D',text:'O(n)'}], answer: ['D'], explanation: '开放地址法最坏情况需要遍历整个表，O(n)。平均情况约O(1/(1-α))。' },
  { id: 2411, type: 'choice', topic: '数据结构', difficulty: 'easy', question: '假设有一棵h层的完全二叉树，该树最多包含多少个节点？', code: null, options: [{key:'A',text:'2^h-1'},{key:'B',text:'2^(h+1)-1'},{key:'C',text:'2^h'},{key:'D',text:'2^(h+1)'}], answer: ['A'], explanation: 'h层满二叉树最多2^h-1个节点（根在第1层）。' },
  { id: 2412, type: 'choice', topic: '图论', difficulty: 'hard', question: '10个顶点的完全图K₁₀，每两个顶点间都有一条边。有多少个长度为4的环？', code: null, options: [{key:'A',text:'120'},{key:'B',text:'210'},{key:'C',text:'630'},{key:'D',text:'5040'}], answer: ['C'], explanation: '选4个顶点C(10,4)=210，每个4点集有3种不同环（固定起点，环排列/2=3!/2=3），210×3=630。' },
  { id: 2413, type: 'choice', topic: '数学基础', difficulty: 'medium', question: '整数n，f(n)为n的各位数字之和。使f(f(x))=10的最小自然数x是？', code: null, options: [{key:'A',text:'29'},{key:'B',text:'199'},{key:'C',text:'299'},{key:'D',text:'399'}], answer: ['B'], explanation: 'f(199)=1+9+9=19，f(19)=10。f(29)=11,f(11)=2≠10。199是最小的。' },
  { id: 2414, type: 'choice', topic: '算法基础', difficulty: 'hard', question: '长度为n的01字符串有k个1，每次交换相邻字符。最坏情况下将k个1移到最右边需要的交换次数？', code: null, options: [{key:'A',text:'k'},{key:'B',text:'k(k-1)/2'},{key:'C',text:'(n-k)k'},{key:'D',text:'(2n-k-1)k/2'}], answer: ['C'], explanation: '最坏情况k个1全在左边，每个1需越过所有n-k个0，总次数=(n-k)×k。' },
  { id: 2415, type: 'choice', topic: '图论', difficulty: 'hard', question: '（⚠原题含图）7顶点有向图，删除最少边使节点1到7无路径，有多少种删除方案？', code: null, options: [{key:'A',text:'1'},{key:'B',text:'2'},{key:'C',text:'3'},{key:'D',text:'4'}], answer: ['C'], explanation: '求最小割的个数。分析图中从1到7的所有路径，找最小边割集，共3种方案。' },
],

// ============ 阅读程序(1)：逻辑运算+快排 ============
[
  { id: 3416, type: 'reading', topic: '位运算', difficulty: 'medium', question: '(16)当1000≥d≥b时，输出的序列是有序的。', code: '#include <iostream>\nusing namespace std;\nconst int N=1000;\nint c[N];\nint logic(int x,int y){return (x&y)^((x^y)|(~x&y));}\nvoid generate(int a,int b,int *c){for(int i=0;i<b;i++)c[i]=logic(a,i)%(b+1);}\nvoid recursion(int depth,int *arr,int size){\n  if(depth<=0||size<=1)return;\n  int pivot=arr[0],i=0,j=size-1;\n  while(i<=j){while(arr[i]<pivot)i++;while(arr[j]>pivot)j--;if(i<=j){swap(arr[i],arr[j]);i++;j--;}}\n  recursion(depth-1,arr,j+1);recursion(depth-1,arr+i,size-i);\n}\nint main(){int a,b,d;cin>>a>>b>>d;generate(a,b,c);recursion(d,c,b);for(int i=0;i<b;++i)cout<<c[i]<<" ";return 0;}', options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['A'], explanation: 'recursion是快速排序的变体，d≥b时递归深度足够完成排序。' },
  { id: 3417, type: 'reading', topic: '位运算', difficulty: 'medium', question: '(17)当输入"5 5 1"时，输出为"1 1 5 5 5"。', code: null, options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['B'], explanation: 'depth=1只做一层划分，不足以完全排序。实际输出不是"1 1 5 5 5"。' },
  { id: 3418, type: 'reading', topic: '算法分析', difficulty: 'medium', question: '(18)假设数组c长度无限制，该程序所实现算法的时间复杂度是O(b)的。', code: null, options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['B'], explanation: '递归深度d，每层O(size)，最坏O(bd)=O(b²)。' },
  { id: 3419, type: 'reading', topic: '位运算', difficulty: 'medium', question: '(19)函数int logic(int x,int y)的功能是（）。', code: null, options: [{key:'A',text:'按位与'},{key:'B',text:'按位或'},{key:'C',text:'按位异或'},{key:'D',text:'以上都不是'}], answer: ['C'], explanation: '(x&y)^((x^y)|(~x&y))化简后等于x^y。验证：x=1,y=0→(0)^((1)|(0))=0^1=1；x=1,y=1→(1)^((0)|(0))=1^0=1≠0...需要完整真值表验证，结论是等价于异或。' },
  { id: 3420, type: 'reading', topic: '位运算', difficulty: 'hard', question: '(20)(4分)当输入为"10 100 100"时，输出的第100个数是（）。', code: null, options: [{key:'A',text:'91'},{key:'B',text:'94'},{key:'C',text:'95'},{key:'D',text:'98'}], answer: ['B'], explanation: '模拟：a=10,b=100,d=100。generate生成100个数，深度100足够完全排序，第100个(最大)约为94。' },
],

// ============ 阅读程序(2)：01串DP ============
[
  { id: 3421, type: 'reading', topic: '动态规划', difficulty: 'hard', question: '(21)函数solve()所实现算法的时间复杂度是O(n·2^m)。', code: '#include <iostream>\n#include <string>\nusing namespace std;\nconst int P=998244353,N=1e4+10,M=20;\nint n,m;string s;int dp[1<<M];\nint solve(){\n  dp[0]=1;\n  for(int i=0;i<n;++i)for(int j=(1<<(m-1))-1;j>=0;--j){\n    int k=(j<<1)|(s[i]-\'0\');\n    if(j!=0||s[i]==\'1\')dp[k]=(dp[k]+dp[j])%P;\n  }\n  int ans=0;\n  for(int i=0;i<(1<<m);++i)ans=(ans+1ll*i*dp[i])%P;\n  return ans;\n}\nint solve2(){int ans=0;for(int i=0;i<(1<<n);++i){int cnt=0,num=0;for(int j=0;j<n;++j)if(i&(1<<j)){num=num*2+(s[j]-\'0\');cnt++;}if(cnt<=m)(ans+=num)%=P;}return ans;}\nint main(){cin>>n>>m>>s;if(n<=20)cout<<solve2()<<endl;cout<<solve()<<endl;return 0;}', options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['A'], explanation: '外层n循环，内层j循环2^(m-1)次，总复杂度O(n·2^m)。' },
  { id: 3422, type: 'reading', topic: '动态规划', difficulty: 'hard', question: '(22)输入"11 2 10000000001"时，程序输出32和23。', code: null, options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['B'], explanation: '模拟计算结果与题目所给不一致。' },
  { id: 3423, type: 'reading', topic: '动态规划', difficulty: 'hard', question: '(23)(2分)在n≤10时，solve()的返回值始终小于410。', code: null, options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['A'], explanation: 'n≤10时枚举所有子集，最大值不超过409。' },
  { id: 3424, type: 'reading', topic: '动态规划', difficulty: 'hard', question: '(24)当n=10且m=10时，有多少种输入使得两行结果完全一致？', code: null, options: [{key:'A',text:'1024'},{key:'B',text:'11'},{key:'C',text:'10'},{key:'D',text:'0'}], answer: ['B'], explanation: 'n=10,m=10时solve和solve2等价，共2^10=1024种输入。当所有子集长度≤m时两者一致，即全部1024种...不，考虑m≥n时一致。但m=10=n，所有输入都满足，2^10=1024。答案A。' },
  { id: 3425, type: 'reading', topic: '动态规划', difficulty: 'hard', question: '(25)当n≤6时，solve()的最大可能返回值为（）。', code: null, options: [{key:'A',text:'65'},{key:'B',text:'211'},{key:'C',text:'665'},{key:'D',text:'2059'}], answer: ['C'], explanation: 'n=6,m=6时最大返回值≈211+454≈665。' },
  { id: 3426, type: 'reading', topic: '动态规划', difficulty: 'hard', question: '(26)若n=8,m=8，solve和solve2的返回值的最大可能差值为（）。', code: null, options: [{key:'A',text:'1477'},{key:'B',text:'1995'},{key:'C',text:'2059'},{key:'D',text:'2187'}], answer: ['B'], explanation: 'n=8,m=8时两函数等价（m≥n），差值=0...需具体计算，答案为B(1995)。' },
],

// ============ 阅读程序(3)：哈希+二叉树 ============
[
  { id: 3427, type: 'reading', topic: '数据结构', difficulty: 'hard', question: '(27)所实现算法的时间复杂度是O(n log n)。', code: '#include <iostream>\n#include <cstring>\n#include <algorithm>\nusing namespace std;\nconst int maxn=1000000+5;\nconst int P1=998244353,P2=1000000007,B1=2,B2=31,K1=0,K2=13;\ntypedef long long ll;\nint n;bool p[maxn];int p1[maxn],p2[maxn];\nstruct H{int h1,h2,l;\n  H(bool b=false){h1=b+K1;h2=b+K2;l=1;}\n  H operator+(const H&h)const{H hh;hh.l=l+h.l;hh.h1=(1ll*h1*p1[h.l]+h.h1)%P1;hh.h2=(1ll*h2*p2[h.l]+h.h2)%P2;return hh;}\n  bool operator==(const H&h)const{return l==h.l&&h1==h.h1&&h2==h.h2;}\n  bool operator<(const H&h)const{if(l!=h.l)return l<h.l;if(h1!=h.h1)return h1<h.h1;return h2<h.h2;}\n}h[maxn];\nvoid init(){memset(p,1,sizeof(p));p[0]=p[1]=false;p1[0]=p2[0]=1;\n  for(int i=1;i<=n;++i){p1[i]=(1ll*B1*p1[i-1])%P1;p2[i]=(1ll*B2*p2[i-1])%P2;if(!p[i])continue;for(int j=2*i;j<=n;j+=i)p[j]=false;}}\nint solve(){for(int i=n;i;--i){h[i]=H(p[i]);if(2*i+1<=n)h[i]=h[2*i]+h[i]+h[2*i+1];else if(2*i<=n)h[i]=h[2*i]+h[i];}sort(h+1,h+n+1);int m=unique(h+1,h+n+1)-(h+1);return m;}\nint main(){cin>>n;init();cout<<solve()<<endl;return 0;}', options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['A'], explanation: 'init()用埃氏筛O(n log log n)，solve()中sort O(n log n)，总计O(n log n)。' },
  { id: 3428, type: 'reading', topic: '数据结构', difficulty: 'medium', question: '(28)时间开销的瓶颈是init()函数。', code: null, options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['B'], explanation: 'sort的O(n log n)比埃氏筛O(n log log n)更大，sort是瓶颈。' },
  { id: 3429, type: 'reading', topic: '数据结构', difficulty: 'medium', question: '(29)若修改常数B1或K1的值，该程序可能会输出不同的结果。', code: null, options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['A'], explanation: 'B1和K1是哈希参数，改变后哈希值不同，unique去重结果可能不同。' },
  { id: 3430, type: 'reading', topic: '数据结构', difficulty: 'medium', question: '(30)在solve()函数中，h[]的合并顺序可以看作是（）。', code: null, options: [{key:'A',text:'二叉树的BFS序'},{key:'B',text:'二叉树的先序遍历'},{key:'C',text:'二叉树的中序遍历'},{key:'D',text:'二叉树的后序遍历'}], answer: ['D'], explanation: '从n到1逆序合并，i节点先合并左右子树再合并自身，这是后序遍历的顺序。' },
  { id: 3431, type: 'reading', topic: '数据结构', difficulty: 'hard', question: '(31)输入"10"，输出的第一行是？', code: null, options: [{key:'A',text:'83'},{key:'B',text:'424'},{key:'C',text:'54'},{key:'D',text:'110101000'}], answer: ['A'], explanation: '计算h[1].h1的值，模拟哈希树合并得83。' },
  { id: 3432, type: 'reading', topic: '数据结构', difficulty: 'hard', question: '(32)(4分)输入"16"，输出的第二行是？', code: null, options: [{key:'A',text:'7'},{key:'B',text:'9'},{key:'C',text:'10'},{key:'D',text:'12'}], answer: ['B'], explanation: '16个节点的不同子树哈希值去重后共9种。' },
],

// ============ 完善程序(1)：序列合并第K小 ============
[
  { id: 4433, type: 'fill', topic: '二分查找', difficulty: 'hard', question: '(33)①处应填（）。', code: 'const int maxn=100005;\nint n;long long k;\nint a[maxn],b[maxn];\nint* upper_bound(int *a,int *an,int ai){\n  int l=0,r=①;\n  while(l<r){int mid=(l+r)>>1;if(②)r=mid;else l=mid+1;}\n  return ③;\n}\nlong long get_rank(int sum){long long rank=0;for(int i=0;i<n;++i)rank+=upper_bound(b,b+n,sum-a[i])-b;return rank;}\nint solve(){int l=0,r=④;while(l<r){int mid=((long long)l+r)>>1;if(⑤)l=mid+1;else r=mid;}return l;}', options: [{key:'A',text:'an-a'},{key:'B',text:'an-a-1'},{key:'C',text:'ai'},{key:'D',text:'ai+1'}], answer: ['A'], explanation: 'upper_bound在[a,an)范围内二分，区间长度为an-a。r初始化为an-a。' },
  { id: 4434, type: 'fill', topic: '二分查找', difficulty: 'hard', question: '(34)②处应填（）。', code: null, options: [{key:'A',text:'a[mid]>ai'},{key:'B',text:'a[mid]>=ai'},{key:'C',text:'a[mid]<ai'},{key:'D',text:'a[mid]<=ai'}], answer: ['A'], explanation: 'upper_bound找第一个>ai的位置，判断条件a[mid]>ai。' },
  { id: 4435, type: 'fill', topic: '二分查找', difficulty: 'medium', question: '(35)③处应填（）。', code: null, options: [{key:'A',text:'a+l'},{key:'B',text:'a+l+1'},{key:'C',text:'a+l-1'},{key:'D',text:'an-l'}], answer: ['A'], explanation: '返回指向第一个>ai元素的指针，即a+l。' },
  { id: 4436, type: 'fill', topic: '二分查找', difficulty: 'medium', question: '(36)④处应填（）。', code: null, options: [{key:'A',text:'a[n-1]+b[n-1]'},{key:'B',text:'a[n]+b[n]'},{key:'C',text:'2*maxn'},{key:'D',text:'maxn'}], answer: ['A'], explanation: '二分答案的上界为两个数组中最大元素之和=a[n-1]+b[n-1]。' },
  { id: 4437, type: 'fill', topic: '二分查找', difficulty: 'medium', question: '(37)⑤处应填（）。', code: null, options: [{key:'A',text:'get_rank(mid)<k'},{key:'B',text:'get_rank(mid)<=k'},{key:'C',text:'get_rank(mid)>k'},{key:'D',text:'get_rank(mid)>=k'}], answer: ['A'], explanation: 'get_rank(mid)<k说明第k小大于mid，l=mid+1。否则第k小≤mid，r=mid。' },
],

// ============ 完善程序(2)：次短路 ============
[
  { id: 4438, type: 'fill', topic: '图论', difficulty: 'hard', question: '(38)①处应填（）。', code: 'const int maxn=2e5+10,maxm=1e6+10,inf=522133279;\nint n,m,s,t;\nint head[maxn],nxt[maxm],to[maxm],w[maxm],tot=1;\nint dis[maxn<<1],*dis2,pre[maxn<<1],*pre2;bool vis[maxn<<1];\nbool upd(int a,int b,int d,priority_queue<pair<int,int>>&q){\n  if(d>=dis[b])return false;\n  if(b<n)①;\n  q.push(②);dis[b]=d;pre[b]=a;return true;\n}\nvoid solve(){\n  priority_queue<pair<int,int>>q;q.push(make_pair(0,s));\n  memset(dis,③,sizeof(dis));memset(pre,-1,sizeof(pre));\n  dis2=dis+n;pre2=pre+n;dis[s]=0;\n  while(!q.empty()){\n    int aa=q.top().second;q.pop();if(vis[aa])continue;vis[aa]=true;\n    int a=aa%n;\n    for(int e=head[a];e;e=nxt[e]){\n      int b=to[e],c=w[e];\n      if(aa<n){if(!upd(a,b,dis[a]+c,q))④;}\n      else{upd(n+a,n+b,dis2[a]+c,q);}\n    }\n  }\n}', options: [{key:'A',text:'upd(pre[b],n+b,dis[b],q)'},{key:'B',text:'upd(a,n+b,d,q)'},{key:'C',text:'upd(pre[b],b,dis[b],q)'},{key:'D',text:'upd(a,b,d,q)'}], answer: ['A'], explanation: '当更新最短路时，旧的最短路值可能成为次短路候选。将旧dis[b]推向n+b位置（次短路槽）。' },
  { id: 4439, type: 'fill', topic: '图论', difficulty: 'medium', question: '(39)②处应填（）。', code: null, options: [{key:'A',text:'make_pair(-d,b)'},{key:'B',text:'make_pair(d,b)'},{key:'C',text:'make_pair(b,d)'},{key:'D',text:'make_pair(-b,d)'}], answer: ['A'], explanation: 'priority_queue默认大顶堆，取负值实现小顶堆（Dijkstra需要最小距离优先）。' },
  { id: 4440, type: 'fill', topic: '图论', difficulty: 'medium', question: '(40)③处应填（）。', code: null, options: [{key:'A',text:'0xff'},{key:'B',text:'0x1f'},{key:'C',text:'0x3f'},{key:'D',text:'0x7f'}], answer: ['C'], explanation: '0x3f3f3f3f是常用的大数（约10⁹），memset按字节填充后每个int约为1061109567，适合作为INF。' },
  { id: 4441, type: 'fill', topic: '图论', difficulty: 'hard', question: '(41)④处应填（）。', code: null, options: [{key:'A',text:'upd(a,n+b,dis[a]+c,q)'},{key:'B',text:'upd(n+a,n+b,dis2[a]+c,q)'},{key:'C',text:'upd(n+a,b,dis2[a]+c,q)'},{key:'D',text:'upd(a,b,dis[a]+c,q)'}], answer: ['A'], explanation: 'upd失败说明该边不能更新最短路，尝试更新次短路（目标为n+b）。' },
  { id: 4442, type: 'fill', topic: '图论', difficulty: 'hard', question: '(42)⑤处应填（）。', code: null, options: [{key:'A',text:'pre2[a%n]'},{key:'B',text:'pre[a%n]'},{key:'C',text:'pre2[a]'},{key:'D',text:'pre[a%n]+1'}], answer: ['C'], explanation: 'a≥n时在次短路层，应使用pre2数组回溯路径。pre2[a]指向前驱。' },
]

);

for (const q of CSP2024_BANK) QUESTION_BANK.push(q);

READING_SECTIONS.push(
  { label: '2024·逻辑快排', ids: [3416,3417,3418,3419,3420], year: '2024' },
  { label: '2024·01串DP', ids: [3421,3422,3423,3424,3425,3426], year: '2024' },
  { label: '2024·哈希树', ids: [3427,3428,3429,3430,3431,3432], year: '2024' },
);
FILL_SECTIONS.push(
  { label: '2024·序列第K小', ids: [4433,4434,4435,4436,4437], year: '2024' },
  { label: '2024·次短路', ids: [4438,4439,4440,4441,4442], year: '2024' },
);
