// 队列
class Queue {
  constructor() {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }

  // 入队
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

  // 队头
  peek() {
    if (this.isEmpty()) return null;

    return this.items[this.lowestCount]
  }
}

function Fibonacci(n) {
  if (n <= 2) return 1;

  const queue = new Queue()

  // 先存入前两个1
  queue.enqueue(1)
  queue.enqueue(1)

  let idx = 0
  while (idx < n - 2) {
    idx++
    const delItem = queue.dequeue()
    const headItem = queue.peek()
    const count = delItem + headItem
    queue.enqueue(count)
  }

  queue.dequeue() // 因为while结束后队列中还有两个元素，所以再出队一次

  return queue.peek()

}

// test
console.log('10 = ', Fibonacci(10));
console.log('100 = ', Fibonacci(100));