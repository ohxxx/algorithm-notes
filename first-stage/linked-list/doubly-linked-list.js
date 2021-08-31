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
      this.tail = node // 双线链表中最后一个node
    } else {
      this.tail.next = node // 将最后一个元素的next指针指向node
      node.prev = this.tail // node的prev指针指向当前最后一个元素
      this.tail = node // 重新定义最后一个元素
    }

    this.count++
  }

  // 在任意位置插入元素
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(element)
      let current = this.head;

      if (index === 0) { // 开头
        if (!this.head) {
          this.head = node
          this.tail = node
        } else {
          node.next = this.head
          this.head.prev = node
          this.tail = node
        }
      } else if (index === this.count) { // 结尾
        current = this.tail
        current.next = node
        node.prev = current
        this.tail = node
      } else { // 中间
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
      let node = this.head

      for (let i = 0; i < index && node; i++) {
        node = node.next
      }

      return node
    }
    return undefined
  }

  // 从双向链表中移除一个元素
  remove(element) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }

  // 返回元素在双向链表中的索引
  indexOf(element) {
    let current = this.head
    let index = 0
    while (current) {
      if (this.equalsFn(element, current.element)) {
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

      if (index === 0) { // 开头
        this.head = this.head.next
        if (this.count === 1) { // 如果只有一个，只更新tail
          this.tail = undefined
        } else {
          this.head.prev = undefined
        }
      } else if (index === this.count - 1) { // 中间
        current = this.tail
        this.tail = current.prev
        this.tail.next = undefined
      } else { // 中间
        current = this.getElementAt(index)
        const previous = current.prev
        // 将previous与current的下一项链接起来，跳过current，从而移除它
        previous.next = current.next
        current.next.prev = previous
      }

      this.count--
      return current.element
    }

    return undefined
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

// test
const xxx = new DoublyLinkedList()

xxx.push(111)
xxx.push(222)
xxx.insert(333, 2)
xxx.push(444)

console.log(xxx);
console.log(xxx.toString());
xxx.removeAt(1)
console.log(xxx.toString());
xxx.removeAt(0)
console.log(xxx.toString());
xxx.removeAt(1)
console.log(xxx.toString());