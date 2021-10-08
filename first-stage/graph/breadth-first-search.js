const Queue = require('../queue/queue')

const Colors = {
  WHITE: 0,
  GREY: 1,
  BLACK: 2
}

const initializeColor = vertices => {
  const color = {}

  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE
  }

  return color
};

const breadthFirstSearch = (graph, startVertex, callback) => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initializeColor(vertices)
  const queue = new Queue()

  queue.enqueue(startVertex)

  while (!queue.isEmpty()) {
    const u = queue.dequeue()
    const neighbors = adjList.get(u)
    color[u] = Colors.GREY

    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i]
      if (color[w] === Colors.WHITE) {
        color[w] = Colors.GREY
        queue.enqueue(w)
      }
    }

    color[u] = Colors.BLACK

    if (callback) callback(u);
  }
}

const BFS = (graph, startVertex) => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initializeColor(vertices)
  const queue = new Queue()
  const distances = {}
  const predecessors = {}
  queue.enqueue(startVertex)

  for (let i = 0; i < vertices.length; i++) {
    distances[vertices[i]] = 0
    predecessors[vertices[i]] = null
  }

  while (!queue.isEmpty()) {
    const u = queue.dequeue()
    const neighbors = adjList.get(u)
    color[u] = Colors.GREY

    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i]
      if (color[w] === Colors.WHITE) {
        color[w] = Colors.GREY
        distances[w] = distances[u] + 1
        predecessors[w] = u
        queue.enqueue(w)
      }
    }

    color[u] = Colors.BLACK
  }

  return {
    distances,
    predecessors
  };
};

const Graph = require('./graph')
const Stack = require('../stack/stack')
const graph = new Graph();
const vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

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

console.log('********* toString ***********');
console.log(graph.toString());

console.log(' ');
console.log('********* breadthFirstSearch ***********');
const printVertex = (value) => console.log('Visited vertex: ' + value)
breadthFirstSearch(graph, vertices[0], printVertex)

console.log(' ');
console.log('********* BFS ***********');
const shortestPathA = BFS(graph, vertices[0]);
console.log('最短路径A的距离', shortestPathA.distances);
console.log('最短路径A的前溯点', shortestPathA.predecessors);

const fromVertex = vertices[0];

for (let i = 1; i < vertices.length; i++) {
  const toVertex = vertices[i]
  const path = new Stack()

  for (let v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) {
    path.push(v)
  }

  path.push(fromVertex)
  let s = path.pop()

  while (!path.isEmpty()) {
    s += ' - ' + path.pop()
  }

  console.log(s)
}
