/* CSP-S 2023 真题两套 — 追加题库 */

const CSP2023_BANK = [].concat(

// ============ 第一套：选择题 ============
[
  { id: 2001, type: 'choice', topic: 'C++语法', difficulty: 'easy', question: '在 C++中，下面哪个关键字用于声明一个变量，其值不能被修改？', code: null, options: [{key:'A',text:'unsigned'},{key:'B',text:'const'},{key:'C',text:'static'},{key:'D',text:'mutable'}], answer: ['B'], explanation: 'const声明常量，值不可修改。unsigned是无符号，static是静态变量，mutable允许在const方法中修改。' },
  { id: 2002, type: 'choice', topic: '计算机基础', difficulty: 'easy', question: '八进制数12345670₈和07654321₈的和为（）。', code: null, options: [{key:'A',text:'22222221₈'},{key:'B',text:'21111111₈'},{key:'C',text:'22111111₈'},{key:'D',text:'22222211₈'}], answer: ['D'], explanation: '逢8进1，对齐逐位计算即得22222211₈。' },
  { id: 2003, type: 'choice', topic: 'C++语法', difficulty: 'easy', question: '阅读下述代码，修改data的value成员以存储3.14，正确的方式是（）。union Data{ int num; float value; char symbol; }; union Data data;', code: null, options: [{key:'A',text:'data.value = 3.14;'},{key:'B',text:'value.data=3.14;'},{key:'C',text:'data->value=3.14;'},{key:'D',text:'value->data=3.14;'}], answer: ['A'], explanation: 'union用法与struct类似，点号访问成员。->用于指针。' },
  { id: 2004, type: 'choice', topic: '数据结构', difficulty: 'easy', question: '链表节点struct Node{int data;Node* next;};，要在头部插入值为42的新节点，正确的是？', code: null, options: [{key:'A',text:'newNode->next=head;head=newNode;'},{key:'B',text:'head->data=42;newNode->next=head;'},{key:'C',text:'head->next=newNode;'},{key:'D',text:'newNode->next=head;（未更新head）'}], answer: ['A'], explanation: '头部插入三步：创建节点→新节点next指向原head→head指向新节点。A完整正确。' },
  { id: 2005, type: 'choice', topic: '数据结构', difficulty: 'easy', question: '根节点高度为1，一棵拥有2023个节点的三叉树高度至少为（）。', code: null, options: [{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'},{key:'D',text:'9'}], answer: ['C'], explanation: '满三叉树h层最多(3^h-1)/2个节点。7层最多(3^7-1)/2=1093<2023，8层最多(3^8-1)/2=3280≥2023，至少8层。' },
  { id: 2006, type: 'choice', topic: '组合数学', difficulty: 'medium', question: '小明有7个空闲时间段，要选出至少一个练习唱歌，要求任意两个练习时间段之间至少有两个空闲时间段休息，共多少种方案？', code: null, options: [{key:'A',text:'31'},{key:'B',text:'18'},{key:'C',text:'21'},{key:'D',text:'33'}], answer: ['B'], explanation: '选1个：7种；选2个：间隔至少2，共10种；选3个：1种。总计18种。' },
  { id: 2007, type: 'choice', topic: '算法基础', difficulty: 'easy', question: '以下关于高精度运算的说法错误的是（）。', code: null, options: [{key:'A',text:'高精度用于处理大整数或保留多位小数'},{key:'B',text:'大整数除小整数：对齐、逐位试商、减法、累加商'},{key:'C',text:'高精度乘法时间只与较长者位数有关'},{key:'D',text:'高精度加法逐位相加并处理进位'}], answer: ['C'], explanation: '高精度乘法时间与两个整数位数的乘积有关，不是仅与较长者有关。' },
  { id: 2008, type: 'choice', topic: '数据结构', difficulty: 'medium', question: '后缀表达式"6 2 3 + - 3 8 2 / + * 2 ^ 3 +"对应的中缀表达式是（）。', code: null, options: [{key:'A',text:'((6-(2+3))*(3+8/2))^2+3'},{key:'B',text:'6-2+3*3+8/2^2+3'},{key:'C',text:'(6-(2+3))*((3+8/2)^2)+3'},{key:'D',text:'6-((2+3)*(3+8/2))^2+3'}], answer: ['A'], explanation: '后缀转中缀：遇数入栈，遇运算符弹出操作数加括号。逆序遍历得((6-(2+3))*(3+8/2))^2+3。' },
  { id: 2009, type: 'choice', topic: '计算机基础', difficulty: 'easy', question: '数101010₂和166₈的和为（）。', code: null, options: [{key:'A',text:'10110000₂'},{key:'B',text:'236₈'},{key:'C',text:'158₁₀'},{key:'D',text:'A0₁₆'}], answer: ['D'], explanation: '101010₂=42, 166₈=118, 42+118=160=A0₁₆。' },
  { id: 2010, type: 'choice', topic: '数据结构', difficulty: 'medium', question: '字符(a,b,c,d,e,f)频率为5%,9%,12%,13%,16%,45%，哈夫曼编码正确的是？', code: null, options: [{key:'A',text:'1111,1110,101,100,110,0'},{key:'B',text:'1010,1001,1000,011,010,00'},{key:'C',text:'000,001,010,011,10,11'},{key:'D',text:'1010,1011,110,111,00,01'}], answer: ['A'], explanation: '按频率从小到大合并构建哈夫曼树，得到编码：a(1111),b(1110),c(101),d(100),e(110),f(0)。' },
  { id: 2011, type: 'choice', topic: '数据结构', difficulty: 'medium', question: '二叉树前序ABDECFG，中序DEBACFG，后序是？', code: null, options: [{key:'A',text:'EDBFGCA'},{key:'B',text:'EDGBCFA'},{key:'C',text:'DEBGFC A'},{key:'D',text:'DBEGFCA'}], answer: ['A'], explanation: '前序首为根A，中序分左右：左DEB右CFG。递归还原树后得后序EDBFGCA。' },
  { id: 2012, type: 'choice', topic: '图论', difficulty: 'easy', question: '有向无环图含边(1,2),(1,3),(2,4),(3,4)，有效的拓扑排序是？', code: null, options: [{key:'A',text:'4,2,3,1'},{key:'B',text:'1,2,3,4'},{key:'C',text:'1,2,4,3'},{key:'D',text:'2,1,3,4'}], answer: ['B'], explanation: '1无前驱必须排第一，2和3依赖1，4依赖2和3。1,2,3,4和1,3,2,4都是有效拓扑序。' },
  { id: 2013, type: 'choice', topic: '计算机基础', difficulty: 'easy', question: '以下哪个选项描述的数据存储容量最小？', code: null, options: [{key:'A',text:'字节(byte)'},{key:'B',text:'比特(bit)'},{key:'C',text:'字(word)'},{key:'D',text:'千字节(KB)'}], answer: ['B'], explanation: 'bit是计算机最小存储单位。1byte=8bit，1word通常≥1byte，1KB=1024byte。' },
  { id: 2014, type: 'choice', topic: '组合数学', difficulty: 'medium', question: '10个男生12个女生，选3人小组至少含1个女生，多少种组合？', code: null, options: [{key:'A',text:'1420'},{key:'B',text:'1770'},{key:'C',text:'1540'},{key:'D',text:'2200'}], answer: ['A'], explanation: '1女2男：C(12,1)×C(10,2)=540；2女1男：C(12,2)×10=660；3女：C(12,3)=220。总计1420。' },
  { id: 2015, type: 'choice', topic: '计算机基础', difficulty: 'easy', question: '以下哪个不是操作系统？', code: null, options: [{key:'A',text:'Linux'},{key:'B',text:'Windows'},{key:'C',text:'Android'},{key:'D',text:'HTML'}], answer: ['D'], explanation: 'HTML是标记语言，不是操作系统。Linux/Windows/Android都是操作系统。' },
],

// ============ 第一套：阅读程序(1) 海伦公式 ============
[
  { id: 3016, type: 'reading', topic: '计算几何', difficulty: 'easy', question: '(16)当输入为"2 2 2"时，输出为"1.7321"。', code: '#include <iostream>\n#include <cmath>\n#include <iomanip>\nusing namespace std;\ndouble f(double a,double b,double c){\n  double s=(a+b+c)/2;\n  return sqrt(s*(s-a)*(s-b)*(s-c));\n}\nint main(){\n  cout<<fixed<<setprecision(4);\n  double a,b,c;cin>>a>>b>>c;\n  cout<<f(a,b,c)<<endl;\n  return 0;\n}', options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['A'], explanation: '边长为2的正三角形面积=√3≈1.7321。' },
  { id: 3017, type: 'reading', topic: '计算几何', difficulty: 'easy', question: '(17)将第7行(s-b)*(s-c)改为(s-c)*(s-b)不影响结果。', code: null, options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['A'], explanation: '乘法交换律，结果不变。' },
  { id: 3018, type: 'reading', topic: '计算几何', difficulty: 'easy', question: '(18)程序总是输出四位小数。', code: null, options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['B'], explanation: '输入不构成三角形时会输出nan，不总是四位小数。' },
  { id: 3019, type: 'reading', topic: '计算几何', difficulty: 'easy', question: '(19)当输入为"3 4 5"时，输出为（）。', code: null, options: [{key:'A',text:'6.0000'},{key:'B',text:'12.0000'},{key:'C',text:'24.0000'},{key:'D',text:'30.0000'}], answer: ['A'], explanation: '直角三角形面积=3×4/2=6。' },
  { id: 3020, type: 'reading', topic: '计算几何', difficulty: 'easy', question: '(20)当输入为"5 12 13"时，输出为（）。', code: null, options: [{key:'A',text:'24.0000'},{key:'B',text:'30.0000'},{key:'C',text:'60.0000'},{key:'D',text:'120.0000'}], answer: ['B'], explanation: '直角三角形面积=5×12/2=30。' },
],

// ============ 第一套：阅读程序(2) 最长公共子序列 ============
[
  { id: 3021, type: 'reading', topic: '动态规划', difficulty: 'medium', question: '(21)f函数的返回值小于等于min(n,m)。', code: '#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\nint f(string x,string y){\n  int n=x.size(),m=y.size();\n  vector<vector<int>>v(n+1,vector<int>(m+1,0));\n  for(int i=1;i<=n;i++)\n    for(int j=1;j<=m;j++){\n      if(x[i-1]==y[j-1])v[i][j]=v[i-1][j-1]+1;\n      else v[i][j]=max(v[i-1][j],v[i][j-1]);\n    }\n  return v[n][m];\n}\nbool g(string x,string y){\n  if(x.size()!=y.size())return false;\n  return f(x+x,y)==y.size();\n}\nint main(){string a,b;cin>>a>>b;cout<<g(a,b)<<endl;return 0;}', options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['A'], explanation: 'f求LCS长度，公共子序列不可能超过任一字符串长度。' },
  { id: 3022, type: 'reading', topic: '动态规划', difficulty: 'medium', question: '(22)f函数的返回值等于两个输入字符串的最长公共子串的长度。', code: null, options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['B'], explanation: 'f求的是子序列（不要求连续），不是子串（要求连续）。' },
  { id: 3023, type: 'reading', topic: '动态规划', difficulty: 'medium', question: '(23)当输入两个完全相同的字符串时，g函数的返回值总是true。', code: null, options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['A'], explanation: 'x+x包含了x的所有循环移位，相同字符串的LCS长度等于原长，返回true。' },
  { id: 3024, type: 'reading', topic: '动态规划', difficulty: 'medium', question: '(24)将第19行v[m][n]替换为v[n][m]，该程序（）。', code: null, options: [{key:'A',text:'行为不变'},{key:'B',text:'只会改变输出'},{key:'C',text:'一定非正常退出'},{key:'D',text:'可能非正常退出'}], answer: ['D'], explanation: '取决于编译器对越界的处理，可能非正常退出。' },
  { id: 3025, type: 'reading', topic: '动态规划', difficulty: 'medium', question: '(25)当输入为"csp-j p-jcs"时，输出为（）。', code: null, options: [{key:'A',text:'0'},{key:'B',text:'1'},{key:'C',text:'T'},{key:'D',text:'F'}], answer: ['B'], explanation: 'csp-jcsp-j与p-jcs的LCS为p-jcs，长度等于p-jcs，输出1(true)。' },
  { id: 3026, type: 'reading', topic: '动态规划', difficulty: 'medium', question: '(26)当输入为"csppsc spsccp"时，输出为（）。', code: null, options: [{key:'A',text:'T'},{key:'B',text:'F'},{key:'C',text:'0'},{key:'D',text:'1'}], answer: ['D'], explanation: 'LCS为spsccp，长度相等，输出1(true)。' },
],

// ============ 第一套：阅读程序(3) 因子平方和 ============
[
  { id: 3027, type: 'reading', topic: '数论', difficulty: 'medium', question: '(27)如果输入的n为正整数，solve2函数的作用是计算n所有的因子的平方和。', code: '#include <iostream>\n#include <cmath>\nusing namespace std;\nint solve1(int n){return n*n;}\nint solve2(int n){\n  int sum=0;\n  for(int i=1;i<=sqrt(n);i++){\n    if(n%i==0){\n      if(n/i==i)sum+=i*i;\n      else sum+=i*i+(n/i)*(n/i);\n    }\n  }\n  return sum;\n}\nint main(){int n;cin>>n;cout<<solve1(solve2(n))<<" "<<solve2(solve1(n))<<endl;return 0;}', options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['A'], explanation: 'solve2遍历到sqrt(n)，找到每个因子并加平方和，n/i==i避免平方根因子重复计算。' },
  { id: 3028, type: 'reading', topic: '数论', difficulty: 'easy', question: '(28)第13-14行的作用是避免n的平方根因子被计算两次。', code: null, options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['A'], explanation: 'n/i==i判断i是否为n的平方根，避免重复加。' },
  { id: 3029, type: 'reading', topic: '数论', difficulty: 'easy', question: '(29)如果输入的n为质数，solve2(n)的返回值为n²+1。', code: null, options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['A'], explanation: '质数只有因子1和自身，平方和为1+n²。' },
  { id: 3030, type: 'reading', topic: '数论', difficulty: 'hard', question: '(30)如果输入的n为质数p的平方，solve2(n)的返回值为（）。', code: null, options: [{key:'A',text:'p²+p+1'},{key:'B',text:'n²+n+1'},{key:'C',text:'n²+1'},{key:'D',text:'p⁴+2p²+1'}], answer: ['B'], explanation: 'n=p²的因子：1,p,p²。平方和=1+p²+p⁴=1+p²+n²。即n²+n+1。' },
  { id: 3031, type: 'reading', topic: '数论', difficulty: 'hard', question: '(31)当输入为正整数时，第一项减去第二项的差值一定（）。', code: null, options: [{key:'A',text:'大于0'},{key:'B',text:'大于等于0且不一定大于0'},{key:'C',text:'小于0'},{key:'D',text:'小于等于0且不一定小于0'}], answer: ['D'], explanation: '输入5时651-676<0；输入1时1-1=0。所以差值≤0且可为0。' },
  { id: 3032, type: 'reading', topic: '数论', difficulty: 'medium', question: '(32)当输入为"5"时，输出为（）。', code: null, options: [{key:'A',text:'651 625'},{key:'B',text:'650 729'},{key:'C',text:'651 676'},{key:'D',text:'652 625'}], answer: ['C'], explanation: 'solve1(5)=25, solve2(25)=1+25+625=651。solve2(5)=1+25=26, solve1(26)=676。' },
],

// ============ 第一套：完善程序(1) 寻找被移除的元素 ============
[
  { id: 4033, type: 'fill', topic: '二分查找', difficulty: 'medium', question: '(33)①处应填（）。', code: 'int missingNumber(vector<int>& nums){\n  int left=0,right=nums.size()-1;\n  while(left<right){\n    int mid=left+(right-left)/2;\n    if(nums[mid]==mid+①)left=mid+1;\n    else ②;\n  }\n  return ③;\n}', options: [{key:'A',text:'1'},{key:'B',text:'nums[0]'},{key:'C',text:'right'},{key:'D',text:'left'}], answer: ['B'], explanation: 'nums[mid]==mid+nums[0]判断mid之前是否连续。' },
  { id: 4034, type: 'fill', topic: '二分查找', difficulty: 'medium', question: '(34)②处应填（）。', code: null, options: [{key:'A',text:'left=mid+1'},{key:'B',text:'right=mid-1'},{key:'C',text:'right=mid'},{key:'D',text:'left=mid'}], answer: ['A'], explanation: '不连续时，缺失元素在左侧，left=mid+1缩小范围。' },
  { id: 4035, type: 'fill', topic: '二分查找', difficulty: 'medium', question: '(35)③处应填（）。', code: null, options: [{key:'A',text:'left=mid+1'},{key:'B',text:'right=mid-1'},{key:'C',text:'right=mid'},{key:'D',text:'left=mid'}], answer: ['C'], explanation: '连续时缺失在右侧，right=mid。配合mid=left+(right-left)/2避免死循环。' },
  { id: 4036, type: 'fill', topic: '二分查找', difficulty: 'medium', question: '(36)④处应填（）。', code: null, options: [{key:'A',text:'left+nums[0]'},{key:'B',text:'right+nums[0]'},{key:'C',text:'mid+nums[0]'},{key:'D',text:'right+1'}], answer: ['A'], explanation: '二分结束left==right，返回left+nums[0]即为缺失值。' },
  { id: 4037, type: 'fill', topic: '二分查找', difficulty: 'medium', question: '(37)⑤处应填（）。', code: null, options: [{key:'A',text:'nums[0]+n'},{key:'B',text:'nums[0]+n-1'},{key:'C',text:'nums[0]+n+1'},{key:'D',text:'nums[n-1]'}], answer: ['D'], explanation: '缺失最后一个元素时，二分查找找不到，返回nums[n-1]。' },
],

// ============ 第一套：完善程序(2) 编辑距离 ============
[
  { id: 4038, type: 'fill', topic: '动态规划', difficulty: 'medium', question: '(38)①处应填（）。', code: 'int editDistance(string str1,string str2){\n  int n=str1.size(),m=str2.size();\n  vector<vector<int>>dp(n+1,vector<int>(m+1));\n  for(int i=0;i<=n;i++)dp[i][0]=i;\n  for(int j=0;j<=m;j++)dp[0][j]=①;\n  for(int i=1;i<=n;i++)\n    for(int j=1;j<=m;j++){\n      if(②)dp[i][j]=③;\n      else dp[i][j]=min({dp[i-1][j],dp[i][j-1],④})+1;\n    }\n  return dp[n][m];\n}', options: [{key:'A',text:'j'},{key:'B',text:'i'},{key:'C',text:'m'},{key:'D',text:'n'}], answer: ['A'], explanation: 'dp[0][j]：空串变j长度需要j次插入，填j。' },
  { id: 4039, type: 'fill', topic: '动态规划', difficulty: 'easy', question: '(39)②处应填（）。', code: null, options: [{key:'A',text:'str1[i-1]==str2[j-1]'},{key:'B',text:'str1[i]==str2[j]'},{key:'C',text:'str1[i-1]!=str2[j-1]'},{key:'D',text:'str1[i]!=str2[j]'}], answer: ['A'], explanation: 'i和j表示长度（1-based），字符串下标从0开始需-1。判断当前字符是否相等。' },
  { id: 4040, type: 'fill', topic: '动态规划', difficulty: 'medium', question: '(40)③处应填（）。', code: null, options: [{key:'A',text:'dp[i-1][j-1]+1'},{key:'B',text:'dp[i-1][j-1]'},{key:'C',text:'dp[i-1][j]'},{key:'D',text:'dp[i][j-1]'}], answer: ['B'], explanation: '末尾字符相等时，不需要操作，直接继承dp[i-1][j-1]。' },
  { id: 4041, type: 'fill', topic: '动态规划', difficulty: 'medium', question: '(41)④处应填（）。', code: null, options: [{key:'A',text:'dp[i-1][j-1]+1'},{key:'B',text:'dp[i-1][j-1]'},{key:'C',text:'dp[i-1][j]'},{key:'D',text:'dp[i][j-1]'}], answer: ['B'], explanation: '不相等时，替换操作对应dp[i-1][j-1]+1。' },
  { id: 4042, type: 'fill', topic: '动态规划', difficulty: 'medium', question: '(42)⑤处应填（）。', code: null, options: [{key:'A',text:'dp[i][j]+1'},{key:'B',text:'dp[i-1][j-1]+1'},{key:'C',text:'dp[i-1][j-1]'},{key:'D',text:'dp[i][j]'}], answer: ['B'], explanation: 'min中最后一项为替换操作：dp[i-1][j-1]+1。' },
],

// ============ 第二套：选择题 ============
[
  { id: 2101, type: 'choice', topic: '计算机基础', difficulty: 'easy', question: '在Linux系统终端中，以下哪个命令用于创建一个新的目录？', code: null, options: [{key:'A',text:'newdir'},{key:'B',text:'mkdir'},{key:'C',text:'create'},{key:'D',text:'mkfolder'}], answer: ['B'], explanation: 'mkdir是Linux创建目录命令。' },
  { id: 2102, type: 'choice', topic: '组合数学', difficulty: 'easy', question: '0,1,2,3,4中选取4个数字，能组成（）个不同四位数。', code: null, options: [{key:'A',text:'96'},{key:'B',text:'18'},{key:'C',text:'120'},{key:'D',text:'84'}], answer: ['A'], explanation: '首位不能为0：4×4×3×2=96。' },
  { id: 2103, type: 'choice', topic: '算法分析', difficulty: 'medium', question: 'n个顶点m条边，m=Θ(n)的稀疏图，以下哪个算法渐近时间复杂度最小？A.O(mlogn) B.O(n²+m) C.O(n²/logm+mlogn) D.O(m+nlogn)', code: null, options: [{key:'A',text:'O(m log n)'},{key:'B',text:'O(n²+m)'},{key:'C',text:'O(n²/log m+m log n)'},{key:'D',text:'O(m+n log n)'}], answer: ['A'], explanation: '稀疏图m=Θ(n)，O(mlogn)=O(nlogn)最小。B/C含O(n²)更大。' },
  { id: 2104, type: 'choice', topic: '数学基础', difficulty: 'hard', question: '4根柱子，按规则放置编号圆环（相邻圆环编号之和为完全平方数），最多放多少个？', code: null, options: [{key:'A',text:'7'},{key:'B',text:'9'},{key:'C',text:'11'},{key:'D',text:'5'}], answer: ['C'], explanation: '4根柱分别放1,3,6,10、2,7,9、4,5,11、8，共11个。' },
  { id: 2105, type: 'choice', topic: '数据结构', difficulty: 'easy', question: '以下对数据结构的表述不恰当的一项是（）。', code: null, options: [{key:'A',text:'队列是FIFO的线性结构'},{key:'B',text:'哈夫曼树主要用于实现图的深度优先搜索'},{key:'C',text:'散列表通过散列函数映射关键字'},{key:'D',text:'二叉树每个节点最多两个子节点'}], answer: ['B'], explanation: '哈夫曼树用于最优编码，与图的DFS无关。' },
  { id: 2106, type: 'choice', topic: '图论', difficulty: 'medium', question: '以下连通无向图中，（）一定可以用不超过两种颜色染色。', code: null, options: [{key:'A',text:'完全三叉树'},{key:'B',text:'平面图'},{key:'C',text:'边双连通图'},{key:'D',text:'欧拉图'}], answer: ['A'], explanation: '树是二分图，按深度奇偶性二染色即可。平面图可能需4色。' },
  { id: 2107, type: 'choice', topic: '动态规划', difficulty: 'medium', question: '序列"ABCAAAABA"和"ABABCBABA"的最长公共子序列长度为（）。', code: null, options: [{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'},{key:'D',text:'7'}], answer: ['C'], explanation: 'LCS为"ABCABA"，长度6。' },
  { id: 2108, type: 'choice', topic: '数学基础', difficulty: 'medium', question: '掷两次骰子，第一次x得2x元，第二次y=x则失去，否则保留。收益平均值？', code: null, options: [{key:'A',text:'7元'},{key:'B',text:'35/6元'},{key:'C',text:'16/3元'},{key:'D',text:'19/3元'}], answer: ['B'], explanation: '总收益=(2+4+6+8+10+12)×5=42×5=210，方案数36，均值=210/36=35/6。' },
  { id: 2109, type: 'choice', topic: 'C++语法', difficulty: 'medium', question: 'int a=5,b=3,c=4; bool res=a&b||c^b&&a|c; res的值是？', code: null, options: [{key:'A',text:'true'},{key:'B',text:'false'},{key:'C',text:'1'},{key:'D',text:'0'}], answer: ['A'], explanation: '按优先级：(a&b)||((c^b)&&(a|c))=1||(7&&5)=true。' },
  { id: 2110, type: 'choice', topic: '排序算法', difficulty: 'easy', question: '快排输入已排序数组且总是选第一个为基准，时间复杂度是？', code: null, options: [{key:'A',text:'O(n log n)'},{key:'B',text:'O(n)'},{key:'C',text:'O(n²)'},{key:'D',text:'无法排序'}], answer: ['C'], explanation: '每次只排一个元素，退化为O(n²)。' },
  { id: 2111, type: 'choice', topic: '计算机基础', difficulty: 'easy', question: '哪个命令将main.cpp编译为可执行文件main？', code: null, options: [{key:'A',text:'g++ -o main main.cpp'},{key:'B',text:'g++ -o main.cpp main'},{key:'C',text:'g++ main -o main.cpp'},{key:'D',text:'g++ main.cpp -o main.cpp'}], answer: ['A'], explanation: 'g++ -o 输出文件 源文件。' },
  { id: 2112, type: 'choice', topic: '数据结构', difficulty: 'medium', question: '哪种树一定只有一个重心？', code: null, options: [{key:'A',text:'4个结点的树'},{key:'B',text:'6个结点的树'},{key:'C',text:'7个结点的树'},{key:'D',text:'8个结点的树'}], answer: ['C'], explanation: '奇数结点的树可以构造出对称结构使两个重心，7个结点除外。' },
  { id: 2113, type: 'choice', topic: '图论', difficulty: 'medium', question: '（缺图）6顶点有向图无拓扑序，删除一条边使其可拓扑排序，候选边数？', code: null, options: [{key:'A',text:'1'},{key:'B',text:'2'},{key:'C',text:'3'},{key:'D',text:'4'}], answer: ['C'], explanation: '删除3→4、4→1或1→3中的一条可打破环，共3条候选边。' },
  { id: 2114, type: 'choice', topic: '数学基础', difficulty: 'medium', question: '（缺图）十六进制数n各位之和迭代至一位数（不动点），100~1A0范围内不动点为9的有几个？', code: null, options: [{key:'A',text:'10'},{key:'B',text:'11'},{key:'C',text:'12'},{key:'D',text:'13'}], answer: ['B'], explanation: 'f(n)=9有9个，f(f(n))=9有2个，共计11个。' },
  { id: 2115, type: 'choice', topic: '算法分析', difficulty: 'easy', question: 'double quick_power递归计算xⁿ，时间复杂度为（）。', code: null, options: [{key:'A',text:'O(n)'},{key:'B',text:'O(1)'},{key:'C',text:'O(log n)'},{key:'D',text:'O(n log n)'}], answer: ['A'], explanation: '该实现在每层递归中调用了两次quick_power，退化到O(n)而非O(logn)。正确快速幂应只调用一次。' },
],

// ============ 第二套：阅读程序(1) 位运算 ============
[
  { id: 3116, type: 'reading', topic: '位运算', difficulty: 'medium', question: '(16)当输入非零时，输出一定不为零。', code: '#include <iostream>\nusing namespace std;\nunsigned short f(unsigned short x){\n  x^=x<<6;\n  x^=x>>8;\n  return x;\n}\nint main(){\n  unsigned short x;cin>>x;\n  cout<<f(x)<<endl;\n  return 0;\n}', options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['A'], explanation: '对任意非零unsigned short，两次异或操作不会使其变为0。' },
  { id: 3117, type: 'reading', topic: '位运算', difficulty: 'medium', question: '(17)将f函数的输入参数类型改为unsigned int，程序的输出不变。', code: null, options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['B'], explanation: 'unsigned int是32位，左移6位时原本越界16位的现在不越界，结果不同。' },
  { id: 3118, type: 'reading', topic: '位运算', difficulty: 'medium', question: '(18)当输入为"65535"时，输出为"63"。', code: null, options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['A'], explanation: '65535=16个1，x^=x<<6后剩10个1，x^=x>>8后去高8位剩6个1=63。' },
  { id: 3119, type: 'reading', topic: '位运算', difficulty: 'medium', question: '(19)当输入为"1"时，输出为"64"。', code: null, options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['B'], explanation: 'x=1时，x^=x<<6后为1^64=65，x^=x>>8后65^0=65。' },
  { id: 3120, type: 'reading', topic: '位运算', difficulty: 'hard', question: '(20)当输入为"512"时，输出为（）。', code: null, options: [{key:'A',text:'33280'},{key:'B',text:'33410'},{key:'C',text:'33106'},{key:'D',text:'33346'}], answer: ['B'], explanation: '512=2^9，x^=x<<6后=512^(512<<6)=512^32768=33280，x^=x>>8后=33280^(33280>>8)=33280^130=33410。' },
  { id: 3121, type: 'reading', topic: '位运算', difficulty: 'hard', question: '(21)当输入为"64"时，执行完第5行后x的值为（）。', code: null, options: [{key:'A',text:'8526'},{key:'B',text:'4130'},{key:'C',text:'4128'},{key:'D',text:'4160'}], answer: ['D'], explanation: '64<<6=4096，64^4096=4160。' },
],

// ============ 第二套：阅读程序(2) 因数和 ============
[
  { id: 3122, type: 'reading', topic: '数论', difficulty: 'medium', question: '(22)将第15行删去，输出不变。', code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nvector<int>d,g;\nvoid solve1(int n){\n  d.assign(n+1,1);\n  for(int i=2;i<=n;i++){\n    if(d[i]==1){\n      for(int j=i;j<=n;j+=i){\n        int t=j,c=1;\n        while(t%i==0){t/=i;c++;}\n        d[j]*=c;\n      }\n    }\n  }\n  long long s=0;\n  for(int i=1;i<=n;i++)s+=d[i]*i;\n  cout<<s<<endl;\n}\nvoid solve2(int n){\n  vector<int>f(n+1),g(n+1);\n  d.assign(n+1,0);d[1]=1;\n  for(int i=2;i<=n;i++){\n    if(!f[i]){f[i]=i;g[i]=1+i;\n      for(long long j=1LL*i*i;j<=n;j+=i)\n        if(!f[j])f[j]=i;\n    }\n  }\n  reverse(d.begin(),d.end());\n  long long s=0;\n  for(int i=1;i<=n;i++){\n    if(!d[i])d[i]=d[i/f[i]]*g[i];\n    s+=d[i];\n  }\n  cout<<s<<endl;\n}\nint main(){int n;cin>>n;solve1(n);solve2(n);return 0;}', options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['B'], explanation: '15行reverse翻转d数组，删除会影响g数组的计算，输出改变。' },
  { id: 3123, type: 'reading', topic: '数论', difficulty: 'easy', question: '(23)当输入为"10"时，输出的第一行大于第二行。', code: null, options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['B'], explanation: 'solve1和solve2都在计算1~n的因数和，输出相等。' },
  { id: 3124, type: 'reading', topic: '数论', difficulty: 'easy', question: '(24)当输入为"1000"时，输出的第一行与第二行相等。', code: null, options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['A'], explanation: '两种方法等价，无论n多大输出都相等。' },
  { id: 3125, type: 'reading', topic: '算法分析', difficulty: 'medium', question: '(25)solve1(n)的时间复杂度为（）。', code: null, options: [{key:'A',text:'O(n log²n)'},{key:'B',text:'O(n)'},{key:'C',text:'O(n log n)'},{key:'D',text:'O(n log log n)'}], answer: ['D'], explanation: '等价于埃氏筛复杂度O(n log log n)。' },
  { id: 3126, type: 'reading', topic: '算法分析', difficulty: 'easy', question: '(26)solve2(n)的时间复杂度为（）。', code: null, options: [{key:'A',text:'O(n²)'},{key:'B',text:'O(n)'},{key:'C',text:'O(n log n)'},{key:'D',text:'O(√n)'}], answer: ['B'], explanation: '仅一层循环O(n)。' },
  { id: 3127, type: 'reading', topic: '数论', difficulty: 'easy', question: '(27)当输入为"5"时，输出的第二行为（）。', code: null, options: [{key:'A',text:'20'},{key:'B',text:'21'},{key:'C',text:'22'},{key:'D',text:'23'}], answer: ['B'], explanation: '1~5的因数和=1+3+4+7+6=21。' },
],

// ============ 第二套：阅读程序(3) 二分答案第K小差值 ============
[
  { id: 3128, type: 'reading', topic: '二分查找', difficulty: 'hard', question: '(28)将第24行"m"改为"m-1"，输出有可能不变，而剩下情况为少1。', code: '#include <iostream>\n#include <algorithm>\nusing namespace std;\nconst int N=10005;\nint n,k,a[N];\nbool f(int m){\n  int s=0;\n  for(int i=0,j=0;i<n;i++){\n    while(j<n&&a[j]-a[i]<=m)j++;\n    s+=j-i-1;\n  }\n  return s>=k;\n}\nint main(){\n  cin>>n>>k;\n  for(int i=0;i<n;i++)cin>>a[i];\n  sort(a,a+n);\n  int g=0,h=a[n-1]-a[0];\n  while(g<h){\n    int m=g+(h-g)/2;\n    if(f(m))h=m;\n    else g=m+1;\n  }\n  cout<<g<<endl;\n  return 0;\n}', options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['A'], explanation: 'm改m-1可能使二分收敛到不同值，差值最多为1。' },
  { id: 3129, type: 'reading', topic: '二分查找', difficulty: 'easy', question: '(29)将第22行"g+(h-g)/2"改为"(h+g)>>1"，输出不变。', code: null, options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['A'], explanation: '两者在正数范围内等价。' },
  { id: 3130, type: 'reading', topic: '二分查找', difficulty: 'medium', question: '(30)当输入为"5 7 2 -4 5 1 -3"，输出为"5"。', code: null, options: [{key:'A',text:'正确'},{key:'B',text:'错误'}], answer: ['A'], explanation: '排序后{-4,-3,1,2,5}，第7小的差值对为5，二分验证输出5。' },
  { id: 3131, type: 'reading', topic: '算法分析', difficulty: 'hard', question: '(31)设最大值减最小值加1为A，f函数时间复杂度为（）。', code: null, options: [{key:'A',text:'O(n log A)'},{key:'B',text:'O(n²log A)'},{key:'C',text:'O(n log(nA))'},{key:'D',text:'O(n log n)'}], answer: ['C'], explanation: '排序O(nlogn)+二分O(logA)×f函数O(n)=O(nlogn+nlogA)=O(nlog(nA))。' },
  { id: 3132, type: 'reading', topic: '二分查找', difficulty: 'medium', question: '(32)将第10行">"替换为">="，原输出与现输出关系为（）。', code: null, options: [{key:'A',text:'一定小于'},{key:'B',text:'一定小于等于且不一定小于'},{key:'C',text:'一定大于等于且不一定大于'},{key:'D',text:'以上都不对'}], answer: ['B'], explanation: 's==k时原来返回true现在false，更容易执行g=m+1，答案变大。原输出≤现输出。' },
  { id: 3133, type: 'reading', topic: '二分查找', difficulty: 'medium', question: '(33)当输入为"5 8 2 -5 3 8 -12"时，输出为（）。', code: null, options: [{key:'A',text:'13'},{key:'B',text:'14'},{key:'C',text:'8'},{key:'D',text:'5'}], answer: ['B'], explanation: '排序{-12,-5,2,3,8}，二分验证得m=14时s首次≥8。' },
],

// ============ 第二套：完善程序(1) 拓扑序第K小路径 ============
[
  { id: 4134, type: 'fill', topic: '图论', difficulty: 'hard', question: '(34)①处应填（）。', code: '// 拓扑排序 + DP求从每个点出发的路径数\n// f[u]: 从u出发的路径数\n// next(cand, k): 从cand中找字典序第k小的下一个点\nint next(vector<int>&cand, long long k){\n  for(int u:cand){\n    if(①)return u;\n    k-=f[u];\n  }\n  return -1;\n}', options: [{key:'A',text:'k>=f[u]'},{key:'B',text:'k<=f[u]'},{key:'C',text:'k>f[u]'},{key:'D',text:'k<f[u]'}], answer: ['B'], explanation: '若k≤f[u]，以u开头的路径包含了第k条，返回u。' },
  { id: 4135, type: 'fill', topic: '图论', difficulty: 'hard', question: '(35)②处应填（）。', code: null, options: [{key:'A',text:'deg[v]==1'},{key:'B',text:'deg[v]==0'},{key:'C',text:'deg[v]>1'},{key:'D',text:'deg[v]>0'}], answer: ['A'], explanation: '拓扑排序入队条件：入度减1后为0才入队。判断在自减前，故deg[v]==1。' },
  { id: 4136, type: 'fill', topic: '图论', difficulty: 'hard', question: '(36)③处应填（）。', code: null, options: [{key:'A',text:'min(f[u]+f[v],LIM)'},{key:'B',text:'min(f[u]+f[v]+1,LIM)'},{key:'C',text:'min(f[u]*f[v],LIM)'},{key:'D',text:'min(f[u]*(f[v]+1),LIM)'}], answer: ['A'], explanation: 'f[u]为所有后继f[v]之和+1（自身），与LIM取min防溢出。' },
  { id: 4137, type: 'fill', topic: '图论', difficulty: 'hard', question: '(37)④处应填（）。', code: null, options: [{key:'A',text:'u!=-1'},{key:'B',text:'!E[u].empty()'},{key:'C',text:'k>0'},{key:'D',text:'k>1'}], answer: ['D'], explanation: '已输出第一个点u，k>1时还需继续找后续点。k=1时只剩自身。' },
  { id: 4138, type: 'fill', topic: '图论', difficulty: 'hard', question: '(38)⑤处应填（）。', code: null, options: [{key:'A',text:'k+=f[u]'},{key:'B',text:'k-=f[u]'},{key:'C',text:'--k'},{key:'D',text:'++k'}], answer: ['C'], explanation: '去掉只含u自身的序列，--k后在u的后继中继续找。' },
],

// ============ 第二套：完善程序(2) 最大值之和（分治） ============
[
  { id: 4139, type: 'fill', topic: '分治算法', difficulty: 'hard', question: '(39)①处应填（）。', code: '// 分治法求所有连续子序列最大值之和\nlong long solve(int l,int r){\n  if(r-l==1)return a[l];\n  int mid=(l+r)/2;\n  long long ans=solve(l,mid)+solve(mid,r);\n  vector<long long>pre(r-mid+1),sum(r-mid+1);\n  pre[0]=0;\n  for(int i=1;i<=r-mid;i++){\n    pre[i]=max(pre[i-1],a[mid+i-1]);\n    sum[i]=sum[i-1]+pre[i];\n  }\n  long long maxv=0;\n  for(int i=mid-1,j=0;i>=l;i--){\n    maxv=max(maxv,a[i]);\n    while(j<r-mid&&②)j++;\n    ans+=③;\n    ans+=④;\n  }\n  return ans;\n}', options: [{key:'A',text:'pre[i]=max(pre[i-1],a[i-1])'},{key:'B',text:'pre[i+1]=max(pre[i],pre[i+1])'},{key:'C',text:'pre[i]=max(pre[i-1],a[i])'},{key:'D',text:'pre[i]=max(pre[i],pre[i-1])'}], answer: ['D'], explanation: 'pre[i]表示右半段前i个的最大值，与pre[i-1]取max。' },
  { id: 4140, type: 'fill', topic: '分治算法', difficulty: 'hard', question: '(40)②处应填（）。', code: null, options: [{key:'A',text:'a[j]<max'},{key:'B',text:'a[j]<a[i]'},{key:'C',text:'pre[j-mid]<max'},{key:'D',text:'pre[j-mid]>max'}], answer: ['B'], explanation: '当右半段值小于左边最大值时j继续右移，找到分界点。' },
  { id: 4141, type: 'fill', topic: '分治算法', difficulty: 'hard', question: '(41)③处应填（）。', code: null, options: [{key:'A',text:'(long long)(j-mid)*max'},{key:'B',text:'(j-mid)*(i-1)*max'},{key:'C',text:'sum[j-mid]'},{key:'D',text:'sum[j-mid]*(i-1)'}], answer: ['A'], explanation: 'mid到j-1范围最大值小于max，以左半边最大值max为这些子序列的最大值：共(j-mid)个。' },
  { id: 4142, type: 'fill', topic: '分治算法', difficulty: 'hard', question: '(42)④处应填（）。', code: null, options: [{key:'A',text:'(r-j)*max'},{key:'B',text:'(r-j)*(mid-i)*max'},{key:'C',text:'sum[r-mid]-sum[j-mid]'},{key:'D',text:'(sum[r-mid]-sum[j-mid])*(mid-i)'}], answer: ['C'], explanation: 'j到r范围以右半边最大值为准，利用前缀和快速求和。' },
  { id: 4143, type: 'fill', topic: '分治算法', difficulty: 'hard', question: '(43)⑤处应填（）。', code: null, options: [{key:'A',text:'solve(0,n)'},{key:'B',text:'solve(1,n)'},{key:'C',text:'solve(0,n-1)'},{key:'D',text:'solve(1,n-1)'}], answer: ['A'], explanation: 'solve区间为左闭右开[0,n)。' },
]

);

// 追加到主题库
for (const q of CSP2023_BANK) QUESTION_BANK.push(q);

// 追加大题分组
READING_SECTIONS.push(
  { label: '2023一·海伦公式', ids: [3016,3017,3018,3019,3020], year: '2023' },
  { label: '2023一·LCS', ids: [3021,3022,3023,3024,3025,3026], year: '2023' },
  { label: '2023一·因子平方和', ids: [3027,3028,3029,3030,3031,3032], year: '2023' },
  { label: '2023二·位运算', ids: [3116,3117,3118,3119,3120,3121], year: '2023' },
  { label: '2023二·因数和', ids: [3122,3123,3124,3125,3126,3127], year: '2023' },
  { label: '2023二·第K小差值', ids: [3128,3129,3130,3131,3132,3133], year: '2023' },
);
FILL_SECTIONS.push(
  { label: '2023一·缺失元素', ids: [4033,4034,4035,4036,4037], year: '2023' },
  { label: '2023一·编辑距离', ids: [4038,4039,4040,4041,4042], year: '2023' },
  { label: '2023二·拓扑K小路径', ids: [4134,4135,4136,4137,4138], year: '2023' },
  { label: '2023二·最大值之和', ids: [4139,4140,4141,4142,4143], year: '2023' },
);
