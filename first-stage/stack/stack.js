class Stack {
  constructor() {
    this.count = 0
    this.items = {}
  }

  /** 入栈 */
  push(element) {
    this.items[this.count] = element;
    this.count++
  }

  /** 出栈 */
  pop() {
    if (this.isEmpty()) return undefined
    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }

  /** 栈顶元素 */
  peek() {
    if (this.isEmpty()) return undefined
    return this.items[this.count - 1]
  }

  /** 栈是否为空 */
  isEmpty() {
    return this.count === 0
  }

  /** 清空栈 */
  clear() {
    this.count = 0
    this.items = {}
    // 或则遵守LIFO原则
    // while (!this.isEmpty()) {
    //   this.pop()
    // }
  }

  /** 栈长 */
  size() {
    return this.count
  }

  /** 拓展-输出当前栈 */
  toString() {
    if (this.isEmpty()) return ''
    let objString = `${this.items[0]}`;
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}

module.exports = Stack

// test
// const xxx = new Stack()
// xxx.push(3)
// xxx.push(2)
// console.log('pop = ', xxx.pop());
// console.log('peek = ', xxx.peek());
// console.log('toString = ', xxx.toString());