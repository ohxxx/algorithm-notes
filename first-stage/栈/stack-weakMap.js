// // 数组
// const items = new WeakMap()

// class Stack {
//   constructor() {
//     items.set(this, [])
//   }

//   /** 入栈 */
//   push(element) {
//     const temp = items.get(this)
//     temp.push(element)
//   }

//   /** 出栈 */
//   pop() {
//     const temp = items.get(this)
//     const temp2 = temp.pop()
//     return temp2
//   }

//   /**
//    * 剩下的方法都是这个规则
//    */

// }


const _count = new WeakMap()
const _items = new WeakMap()

class Stack {
  constructor() {
    _count.set(this, 0)
    _items.set(this, {})
  }

  /** 入栈 */
  push(element) {
    const items = _items.get(this)
    const count = _count.get(this)
    items[count] = element
    _count.set(this, count + 1)
  }

  /** 出栈 */
  pop() {
    if (this.isEmpty()) return undefined
    const items = _items.get(this)
    let count = _count.get(this)
    count--
    _count.set(this, count)
    const result = items[count]
    delete items[count]
    return result
  }

  /** 栈顶元素 */
  peek() {
    if (this.isEmpty()) return undefined
    const items = _items.get(this);
    const count = _count.get(this);
    return items[count - 1];
  }

  /** 栈是否为空 */
  isEmpty() {
    return _count.get(this) === 0;
  }

  /** 清空栈 */
  clear() {
    _count.set(this, 0);
    _items.set(this, {});
    // 或则遵守LIFO原则
    // while (!this.isEmpty()) {
    //   this.pop()
    // }
  }

  /** 栈长 */
  size() {
    return _count.get(this);
  }

  /** 拓展-输出当前栈 */
  toString() {
    if (this.isEmpty()) return ''
    const items = _items.get(this);
    const count = _count.get(this);
    let objString = `${items[0]}`;
    for (let i = 1; i < count; i++) {
      objString = `${objString},${items[i]}`;
    }
    return objString;
  }

}

// test
const xxx = new Stack()
xxx.push(3)
xxx.push(2)
console.log('pop = ', xxx.pop());
console.log('peek = ', xxx.peek());
console.log('toString = ', xxx.toString());