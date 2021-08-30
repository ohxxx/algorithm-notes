// 队列
class Queue {
  constructor() {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }

  // 入队
  enqueue(element) {
    this.items[this.count] = element
    this.count++
  }

  // 出队
  dequeue() {
    if (this.isEmpty()) return null;

    const temp = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return temp
  }

  // 队列长度
  size() {
    return this.count - this.lowestCount
  }

  // 队列是否为空
  isEmpty() {
    return this.size() === 0
  }
}

function JosephRing(arr) {
  const queue = new Queue()

  for (let i = 0; i < arr.length; i++) {
    queue.enqueue(arr[i])
  }

  let idx = 0
  while (queue.size() > 1) {
    const temp = queue.dequeue() // 先出队
    idx++
    if (idx % 3 !== 0) { // 判断是否符合出队条件，不符合入队
      queue.enqueue(temp)
    }
  }

  return queue.dequeue()
}

// test
let arr = []
for (let i = 0; i < 100; i++) {
  arr.push(i)
}
console.log(JosephRing(arr));