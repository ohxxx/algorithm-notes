## 200. 岛屿数量

**描述**

> 给你一个由  '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
> 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
> 此外，你可以假设该网格的四条边均被水包围。

**实例**

```
1、
  输入：grid = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
  ]
  输出：1
2、
  输入：grid = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
  ]
  输出：3
```

**思路**

```
1、找到陆地的位置
2、然后沿着当前位置广度搜索
```

**实现**

```js
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const LAND = "1";
  const WATER = "0";
  const DIRECTION = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const gridRow = grid.length;
  const gridCol = grid[0].length;
  const islandsQ = [];
  let count = 0;
  for (let i = 0; i < gridRow; i++) {
    for (let j = 0; j < gridCol; j++) {
      if (grid[i][j] === LAND) {
        count++;
        grid[i][j] = "0";
        islandsQ.push([i, j]);

        while (islandsQ.length) {
          const cur = islandsQ.shift();
          for (const dir of DIRECTION) {
            const newRow = cur[0] + dir[0];
            const newCol = cur[1] + dir[1];
            if (
              newRow < 0 ||
              newCol < 0 ||
              newRow >= gridRow ||
              newCol >= gridCol ||
              grid[newRow][newCol] !== LAND
            ) {
              continue;
            }

            grid[newRow][newCol] = grid[cur[0]][cur[1]] + 1;
            islandsQ.push([newRow, newCol]);
          }
        }
      }
    }
  }

  return count;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(mn)  
`空间复杂度`：O(mn)

**官方**

```java
class Solution {
  public int numIslands(char[][] grid) {
    if (grid == null || grid.length == 0) {
        return 0;
    }

    int nr = grid.length;
    int nc = grid[0].length;
    int num_islands = 0;

    for (int r = 0; r < nr; ++r) {
      for (int c = 0; c < nc; ++c) {
        if (grid[r][c] == '1') {
          ++num_islands;
          grid[r][c] = '0';
          Queue<Integer> neighbors = new LinkedList<>();
          neighbors.add(r * nc + c);
          while (!neighbors.isEmpty()) {
            int id = neighbors.remove();
            int row = id / nc;
            int col = id % nc;
            if (row - 1 >= 0 && grid[row-1][col] == '1') {
              neighbors.add((row-1) * nc + col);
              grid[row-1][col] = '0';
            }
            if (row + 1 < nr && grid[row+1][col] == '1') {
              neighbors.add((row+1) * nc + col);
              grid[row+1][col] = '0';
            }
            if (col - 1 >= 0 && grid[row][col-1] == '1') {
              neighbors.add(row * nc + col-1);
              grid[row][col-1] = '0';
            }
            if (col + 1 < nc && grid[row][col+1] == '1') {
              neighbors.add(row * nc + col+1);
              grid[row][col+1] = '0';
            }
          }
        }
      }
    }

    return num_islands;
  }
}
```

**官方-复杂度分析**  
`时间复杂度`：O(MN)，其中 M 和 N 分别为行数和列数。  
`空间复杂度`：O(min(M,N))，在最坏情况下，整个网格均为陆地，队列的大小可以达到 min(M,N)。
