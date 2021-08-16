class Stack {
  constructor() {
    this.items = []
  }

  /** 入栈 */
  push(element) {
    this.items.push(element)
  }

  /** 出栈 */
  pop() {
    return this.items.pop()
  }

  /** 栈顶元素 */
  peek() {
    if (this.isEmpty()) return undefined
    return this.items[this.items.length - 1]

  }

  /** 栈是否为空 */
  isEmpty() {
    return this.items.length === 0
  }

  /** 清空栈 */
  clear() {
    this.items = []
  }

  /** 栈长 */
  size() {
    return this.items.length
  }

  /** 拓展-查看所有栈 */
  toArray() {
    return this.items
  }

  /** 拓展-输出当前栈 */
  toString() {
    return this.items.toString()
  }

}

// test
const xxx = new Stack()
xxx.push(3)
xxx.push(2)
console.log('pop = ', xxx.pop());
console.log('peek = ', xxx.peek());
console.log('toString = ', xxx.toString());