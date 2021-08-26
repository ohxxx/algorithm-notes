## 算法设计和技巧

### 分而治之

> 它将一个问题分成多个和原问题相似的小问题，递归解决小问题，再将解决方式合并已解决原来问题
> 分成三部分：
> 1、分解原问题为多个子问题
> 2、解决子问题，用返回解决子问题的方式的递归算法
> 3、组合这些子问题的解决方法，得到原问题的解

**[`BinarySearchRecursive Demo`](./binary-search-recursive.js)**

### 动态规划

**动态规划的定义**

> 动态规划（dynamic programming， DP）是一种将复杂问题分解成更小的子问题来解决的优化技术。
> 注意，动态规划和分而治之是不同的方法。分而治之方法是把问题分解成相互独立的子问题，然后组合它们的答案，而动态规划则是将问题分解成相互依赖的子问题。

> 使用动态规划需要注意三个步骤：
> 1、定义子问题
> 2、实现要反复执行来解决子问题的部分（类似递归
> 3、识别并求解出基线条件

**最小硬币找零问题**

> 硬币找零：给出面额为 d1—dn 的一定数量的硬币和要找零的钱数，找出有多少种方法，而最少硬币找零，是其中一种变种，找出最少需要的硬币个数。

**[`MinCoinChange Demo`](./dynamic-programming/min-coin-change.js)**

**背包问题**

> 背包问题：给出一组项，各自有值和容量，目标是找出总值最大的项的集合。限制在于总容量必须小于等于“背包”的容量

**[`KnapSack Demo`](./dynamic-programming/knap-sack.js)**

**最长公共子序列**

> 找出一组序列的最长公共子序列（可由另一序列删除元素但不改变余下元素的顺序而得到的）

**[`LongestCommonSubsequence Demo`](./dynamic-programming/longest-common-subsequence.js)**

**矩阵链相乘**

> 给出一系列矩阵，目标是找到这些矩阵相乘的最高效办法（计算次数尽可能少）。相乘运算不会进行，解决方案是找到这些矩阵各自相乘的顺序

**[`MatrixChainMultiplication Demo`](./dynamic-programming/matrix-chain-multiplication.js)**

### 贪心算法

> 贪心算法遵循一种近似解决问题的技术，期盼通过每个阶段的局部最优选择（当前最好的解），从而达到全局的最优（全局最优解）。它不像动态规划算法那样计算更大的格局。

**最小硬币找零问题**

**[`MinCoinChange Demo`](./greedy/min-coin-change.js)**

**分数背包问题**

**[`KnapSack Demo`](./greedy/knap-sack.js)**

### 回溯算法

> 回溯是一种渐进式寻找并构建问题解决方式的策略。我们从一个可能的动作开始并试着用这个动作解决问题。如果不能解决，就回溯并选择另一个动作直到将问题解决。根据这种行为，回溯算法会尝试所有可能的动作（如果更快找到了解决办法就尝试较少的次数）来解决问题。

**迷宫老鼠问题**

**[`RatInMaze Demo`](./backtracking/rat-in-maze.js)**
**数独解题器**

**[`SudokuSolver Demo`](./backtracking/sudoku-solver.js)**
