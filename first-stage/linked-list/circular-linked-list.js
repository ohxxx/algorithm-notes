// 默认的相等性比较函数
function defaultEquals(a, b) {
  return a === b;
}

// 辅助类，表示我们想要添加到链表中的项
class Node {
  constructor(element, next) {
    this.element = element;
    this.next = next;
  }
}


class CircularLinkedList {
  constructor(equalsFn = defaultEquals) {
    this.equalsFn = equalsFn
    this.count = 0 // 循环链表中的数量
    this.head = undefined // 循环链表中第一个元素
  }

  // 向循环链表尾部添加元素
  push(element) {
    const node = new Node(element)
    let current

    if (!this.head) {
      this.head = node
    } else {
      current = this.getElementAt(this.size() - 1)
      current.next = node
    }
    // 闭环
    node.next = this.head
    this.count++
  }

  // 在任意位置插入元素
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element)
      let current = this.head

      if (index === 0) {
        if (!this.head) {
          this.head = node
          node.next = this.head
        } else {
          node.next = this.head
          // 最后一个
          current = this.getElementAt(this.size())
          this.head = node
          // 闭环
          current.next = this.head
        }
      } else {
        const previous = this.getElementAt(index - 1)
        node.next = previous.next
        previous.next = node
      }

      this.count++
      return true
    }

    return false
  }

  // 返回循环链表中特定位置的元素
  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let current = this.head

      for (let i = 0; i < index && current; i++) {
        current = current.next
      }

      return current
    }

    return undefined
  }

  // 从循环链表中移除一个元素
  remove(element) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }

  // 返回元素在循环链表中的索引
  indexOf(element) {
    let current = this.head

    for (let i = 0; i < this.size() && current; i++) {
      if (this.equalsFn(current, current.element)) {
        return i
      }
      current = current.next
    }
    return -1
  }

  // 从循环链表中特定位置移除一个元素
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head
      if (index === 0) {
        if (this.size() === 1) {
          this.head = undefined
        } else {
          const removed = this.head
          current = this.getElementAt(this.size() - 1)
          this.head = this.head.next
          current.next = this.head
          current = removed
        }
      } else {
        const previous = this.getElementAt(index - 1)
        current = previous.next
        previous.next = current.next
      }

      this.count--
      return current.element
    }

    return null
  }

  // 判断链表是否为空
  isEmpty() {
    return this.size() === 0
  }

  // 返回链表的长度
  size() {
    return this.count
  }

  // 返回链表
  getHead() {
    return this.head
  }

  // 清空链表
  clear() {
    this.head = undefined
    this.count = 0
  }

  // 返回整个链表的字符串
  toString() {
    if (!this.head) {
      return ''
    }
    let objString = `${this.head.element}`
    let current = this.head.next
    for (let i = 1; i < this.size() && current; i++) {
      objString = `${objString},${current.element}`
      current = current.next
    }
    return objString
  }

}

// test
const xxx = new CircularLinkedList()

xxx.push(111)
xxx.push(222)
xxx.push(333)
console.log(xxx.toString());

xxx.insert(666, 1)
console.log(xxx.toString());

xxx.removeAt(1)
console.log(xxx.toString());

xxx.removeAt(0)
console.log(xxx.toString());

xxx.removeAt(0)
console.log(xxx.toString());