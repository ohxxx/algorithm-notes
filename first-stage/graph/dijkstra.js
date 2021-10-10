const INF = Number.MAX_SAFE_INTEGER

const minDistance = (dist, visited) => {
  let min = INF
  let minIndex = -1

  for (let v = 0; v < dist.length; v++) {
    if (visited[v] === false && dist[v] <= min) {
      min = dist[v]
      minIndex = v
    }
  }

  return minIndex
}

const dijkstra = (graph, src) => {
  const dist = []
  const visited = []
  const { length } = graph

  for (let i = 0; i < length; i++) { // 把所有距离(dist)、标记点(visited) 初始化
    dist[i] = INF
    visited[i] = false
  }

  dist[src] = 0 // 把源顶点到自己的距离设为0

  for (let i = 0; i < length - 1; i++) { // 找出到其余顶点的最短路径
    const u = minDistance(dist, visited)  // 需要从尚未处理的顶点中选出距离最近的顶点
    visited[u] = true // 把选出的顶点标为visited
    for (let v = 0; v < length; v++) {
      if (
        !visited[v] &&
        graph[u][v] !== 0 &&
        dist[u] !== INF &&
        dist[u] + graph[u][v] < dist[v]
      ) { // 找到更短的路径
        dist[v] = dist[u] + graph[u][v]
      }
    }
  }
  return dist
}

// test
const graph = [
  [0, 2, 4, 0, 0, 0],
  [0, 0, 2, 4, 2, 0],
  [0, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 2],
  [0, 0, 0, 3, 0, 2],
  [0, 0, 0, 0, 0, 0]
]

const dist = dijkstra(graph, 0)

for (i = 0; i < dist.length; i++) {
  console.log(i + '\t\t' + dist[i])
}
