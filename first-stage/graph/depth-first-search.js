// 标注访问状态
const Colors = {
  WHITE: 0, // 没被访问过
  GREY: 1, // 被访问过，但没有完全被探索
  BLACK: 2 // 被访问过，全部被探索
}

const initializeColor = vertices => {
  const color = {}

  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE
  }

  return color
}

const depthFirstSearchVisit = (u, color, adjList, callback) => {
  color[u] = Colors.GREY

  if (callback) callback(u)

  const neighbors = adjList.get(u);
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i]
    if (color[w] === Colors.WHITE) {
      depthFirstSearchVisit(w, color, adjList, callback)
    }
  }

  color[u] = Colors.BLACK
}

const depthFirstSearch = (graph, callback) => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initializeColor(vertices)

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      depthFirstSearchVisit(vertices[i], color, adjList, callback)
    }
  }
}

const DFSVisit = (u, color, d, f, p, time, adjList) => {
  color[u] = Colors.GREY
  d[u] = ++time.count

  const neighbors = adjList.get(u)
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i]
    if (color[w] === Colors.WHITE) {
      p[w] = u
      DFSVisit(w, color, d, f, p, time, adjList)
    }
  }

  color[u] = Colors.BLACK
  f[u] = ++time.count
}

const DFS = graph => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initializeColor(vertices)
  const d = {}
  const f = {}
  const p = {}
  const time = { count: 0 }

  for (let i = 0; i < vertices.length; i++) {
    f[vertices[i]] = 0
    d[vertices[i]] = 0
    p[vertices[i]] = null
  }

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      DFSVisit(vertices[i], color, d, f, p, time, adjList)
    }
  }

  return {
    discovery: d,
    finished: f,
    predecessors: p
  }
}

const Graph = require('./graph')
let graph = new Graph(true)
let vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

console.log('********* depthFirstSearch Fn ***********');
for (let i = 0; i < vertices.length; i++) {
  graph.addVertex(vertices[i])
}
graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')

const printVertex = value => console.log('Visited vertex: ' + value);
depthFirstSearch(graph, printVertex)


// ------------------------------------
console.log('')
console.log('********* DFS Fn ***********')
graph = new Graph(true)
vertices = ['A', 'B', 'C', 'D', 'E', 'F']

for (i = 0; i < vertices.length; i++) {
  graph.addVertex(vertices[i])
}

graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('B', 'D')
graph.addEdge('B', 'E')
graph.addEdge('C', 'F')
graph.addEdge('F', 'E')

const result = DFS(graph)

console.log('discovery', result.discovery)
console.log('finished', result.finished)
console.log('predecessors', result.predecessors)

const fTimes = result.finished
let s = ''

for (let count = 0; count < vertices.length; count++) {
  let max = 0
  let maxName = null

  for (i = 0; i < vertices.length; i++) {
    if (fTimes[vertices[i]] > max) {
      max = fTimes[vertices[i]]
      maxName = vertices[i]
    }
  }

  s += ' - ' + maxName;
  delete fTimes[maxName]
}

console.log(s)
