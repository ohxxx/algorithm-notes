
/**
 * 借助Dictionary，温习一下
 * 最下面才是主角
 */

/******************************************
*                                         *
*              Dictionary                 *
*                                         *
******************************************/
function defaultToString(item) {
  if (item === null) {
    return 'NULL';
  } else if (item === undefined) {
    return 'UNDEFINED';
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}

class ValuePair {
  constructor(key, value) {
    this.key = key
    this.value = value
  }
  toString() {
    return `[#${this.key}: ${this.value}]`
  }
}

class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }

  set(key, value) {
    if (key && value) {
      const tableKey = this.toStrFn(key)
      this.table[tableKey] = new ValuePair(key, value)
      return true
    }

    return false
  }

  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)]
      return true
    }

    return false
  }

  hasKey(key) {
    return this.table[this.toStrFn(key)] != null
  }

  get(key) {
    const valuePair = this.table[this.toStrFn(key)]
    return valuePair == null ? undefined : valuePair.value
  }

  clear() {
    this.table = {}
  }

  size() {
    return Object.keys(this.table).length
  }

  isEmpty() {
    return this.size() === 0
  }

  keys() {
    return this.keyValues().map(valuePair => valuePair.value)
  }

  values() {
    return this.keyValues().map(valuePair => valuePair.key)
  }

  keyValues() {
    return Object.values(this.table)
  }

  forEach(callbackFn) {
    const valuePairs = this.keyValues()

    for (let i = 0; i < valuePairs.length; i++) {
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value)

      if (result === false) break;
    }
  }
}

/******************************************
*                                         *
*                 Graph                   *
*                                         *
******************************************/
class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected; // 是否有向 - 默认无向
    this.vertices = []; // 顶点名称
    this.adjList = new Dictionary(); // 存储领接表
  }

  // 添加顶点
  addVertex(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v)
      this.adjList.set(v, [])
    }
  }

  // 添加边
  // a = 
  addEdge(a, b) {
    if (!this.adjList.get(a)) {
      this.addVertex(a)
    }

    if (!this.adjList.get(b)) {
      this.addVertex(b)
    }

    this.adjList.get(a).push(b)

    if (!this.isDirected) {
      this.adjList.get(b).push(a)
    }

  }

  // 返回顶点列表
  getVertices() {
    return this.vertices
  }

  // 返回邻接表 
  getAdjList() {
    return this.adjList
  }

  toString() {
    let s = '';
    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} -> `;
      const neighbors = this.adjList.get(this.vertices[i]);
      for (let j = 0; j < neighbors.length; j++) {
        s += `${neighbors[j]} `;
      }
      s += '\n';
    }
    return s;
  }
}

module.exports = Graph

// test
// const xxx = new Graph()

// const vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
// for (let i = 0; i < vertices.length; i++) {
//   xxx.addVertex(vertices[i])
// }

// xxx.addEdge('A', 'B')
// xxx.addEdge('A', 'C')
// xxx.addEdge('A', 'D')
// xxx.addEdge('C', 'D')
// xxx.addEdge('C', 'G')
// xxx.addEdge('D', 'G')
// xxx.addEdge('D', 'H')
// xxx.addEdge('B', 'E')
// xxx.addEdge('B', 'F')
// xxx.addEdge('E', 'I')

// console.log(xxx.toString());