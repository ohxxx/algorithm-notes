const _items = Symbol('stackItems')

class Stack {
  constructor() {
    this[_items] = []
  }

  /** 入栈 */
  push(element) {
    this[_items].push(element)
  }

  /** 出栈 */
  pop() {
    return this[_items].pop()
  }

  /** 栈顶元素 */
  peek() {
    if (this.isEmpty()) return undefined
    return this[_items][this[_items].length - 1]

  }

  /** 栈是否为空 */
  isEmpty() {
    return this[_items].length === 0
  }

  /** 清空栈 */
  clear() {
    this[_items] = []
  }

  /** 栈长 */
  size() {
    return this[_items].length
  }

  /** 拓展-查看所有栈 */
  toArray() {
    return this[_items]
  }

  /** 拓展-输出当前栈 */
  toString() {
    return this[_items].toString()
  }

  print() {
    console.log(this.toString());
  }

}

// test
const xxx = new Stack()
xxx.push(3)
xxx.push(2)
console.log('pop = ', xxx.pop());
console.log('peek = ', xxx.peek());
console.log('toString = ', xxx.toString());

/**
 * 这种方法创建了一个假的私有属性，因为ES2015中新增了getOwnPropertySymbols方法能获取
 * 到类里面声明的所有Symbols属性，可进行破坏
 */
const stack = new Stack();
const objectSymbols = Object.getOwnPropertySymbols(stack);
console.log(objectSymbols.length); // 1
console.log(objectSymbols); // [Symbol(stackItems)]
console.log(objectSymbols[0]); // Symbol(stackItems)
stack[objectSymbols[0]].push(1);
stack.print(); // 1