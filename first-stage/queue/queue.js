class Queue {
  constructor() {
    this.count = 0 // 控制队列大小
    this.lowestCount = 0 // 追踪第一个元素
    this.items = {} // 队列
  }

  /** 向队列添加元素 */
  enqueue(element) {
    this.items[this.count] = element;
    this.count++
  }

  /** 从队列中移除元素 */
  dequeue() {
    if (this.isEmpty()) return null;

    const temp = this.items[this.lowestCount] // 暂存队首数据，用来返回数据
    delete this.items[this.lowestCount] // 出队，即删除队列中第一个元素
    this.lowestCount++; // 出队后将队首的标记移到第二位
    return temp
  }

  /** 查看队列头元素 */
  peek() {
    if (this.isEmpty()) return null;

    return this.items[this.lowestCount]
  }

  /** 检查队列是否为空，并获取它的长度 */
  isEmpty() {
    return this.count - this.lowestCount === 0
  }

  /** 查看队队列个数 */
  size() {
    return this.count - this.lowestCount
  }

  /** 清空队列 */
  clear() {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }

  /** 拓展-输出当前队列 */
  toString() {
    if (this.isEmpty()) return null;

    let objString = `${this.items[this.lowestCount]}`
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`
    }
    return objString
  }

}

// test
const xxx = new Queue()
xxx.enqueue('111')
xxx.enqueue('222')
xxx.enqueue('333')
console.log('dequeue', xxx.dequeue());
console.log('peek', xxx.peek());
console.log('size', xxx.size());
console.log('toString', xxx.toString());

setTimeout(() => {
  xxx.clear()
  console.log(xxx);
}, 1000)

console.log(xxx);