// 默认的相等性比较函数
function defaultEquals(a, b) {
  return a === b;
}

// 辅助类，表示我们想要添加到链表中的项
class DoublyNode {
  constructor(element, next, prev) {
    this.element = element;
    this.next = next;
    this.prev = prev
  }
}


class DoublyLinkedList {
  constructor(equalsFn = defaultEquals) {
    this.equalsFn = equalsFn
    this.count = 0 // 双向链表中的数量
    this.head = undefined // 双向链表中第一个元素
    this.tail = undefined // 双向链表中的最后一个元素
  }

  // 向双向链表尾部添加元素
  push(element) {
    const node = new DoublyNode(element)

    if (!this.head) {
      this.head = node
      this.tail = node
    } else {
      this.tail.next = node
      node.prev = this.tail
      this.tail = node
    }

    this.count++
  }

  // 在任意位置插入元素
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(element)
      let current = this.head

      if (index === 0) {
        if (!this.head) {
          this.head = node
          this.tail = node
        } else {
          node.next = this.head
          this.head.prev = node
          this.head = node
        }
      } else if (index === this.count) {
        current = this.tail
        current.next = node
        node.prev = current
        this.tail = node
      } else {
        const previous = this.getElementAt(index - 1)
        current = previous.next
        node.next = current
        previous.next = node
        current.prev = node
        node.prev = previous
      }

      this.count++
      return true
    }

    return false
  }

  // 返回双向链表中特定位置的元素
  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let current = this.head

      for (let i = 0; i < index && current; i++) {
        current = current.next
      }
      return current
    }
    return null
  }

  // 从双向链表中移除一个元素
  remove(element) {
    const index = this.getElementAt(element)
    return this.removeAt(index)
  }

  // 返回元素在双向链表中的索引
  indexOf(element) {
    let current = this.head
    let index = 0

    while (current) {
      if (this.equalsFn(current, current.element)) {
        return index
      }
      index++
      current = current.next
    }

    return -1
  }

  // 从双向链表中的特定位置移除一个元素
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head

      if (index === 0) {
        this.head = this.head.next
        if (this.count === 1) {
          this.tail = undefined
        } else {
          this.head.prev = undefined
        }
      } else if (index === this.count - 1) {
        current = this.tail
        this.tail = current.prev
        this.tail.next = undefined
      } else {
        current = this.getElementAt(index)
        const previous = current.prev
        previous.next = current.next
        current.next.prev = previous
      }

      this.count--
      return current.element
    }

    return null
  }

  // 判断双向链表是否为空
  isEmpty() {
    return this.size() === 0
  }

  // 返回双向链表的长度
  size() {
    return this.count
  }

  // 返回双向链表头
  getHead() {
    return this.head
  }

  // 返回双向链表尾
  getTail() {
    return this.tail
  }

  // 清空双向链表
  clear() {
    this.head = undefined
    this.tail = undefined
    this.count = 0
  }

  // 返回整个双向链表的字符串
  toString() {
    if (!this.head) {
      return ''
    }
    let objString = `${this.head.element}`
    let current = this.head.next
    while (current != null) {
      objString = `${objString},${current.element}`
      current = current.next
    }
    return objString
  }

}

/**
 * 这个才是主角
 */
class StackLinkedList {
  constructor() {
    this.items = new DoublyLinkedList()
  }

  push(element) {
    this.items.push(element)
  }

  pop() {
    if (this.isEmpty()) return null;
    const res = this.items.removeAt(this.size() - 1)
    return res
  }

  peek() {
    if (this.isEmpty()) return null;

    return this.items.getElementAt(this.size() - 1).element
  }

  isEmpty() {
    return this.items.isEmpty()
  }

  size() {
    return this.items.size()
  }

  clear() {
    this.items.clear()
  }

  toString() {
    return this.items.toString()
  }
}