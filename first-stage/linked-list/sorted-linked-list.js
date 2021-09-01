
// 比较元素
const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
};

// 默认比较元素
function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}


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

class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.equalsFn = equalsFn
    this.count = 0 // 链表中的数量
    this.head = undefined // 链表中第一个元素
  }

  // 向链表尾部添加元素
  push(element) {
    const node = new Node(element)
    let current
    if (this.head === undefined) {
      this.head = node
    } else {
      current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
    this.count++
  }

  // 在任意位置插入元素
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element)

      if (index === 0) {
        const current = this.head
        node.next = current
        this.head = node
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

  // 返回链表中特定位置的元素
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

  // 从链表中移除一个元素
  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  // 返回元素在链表中的索引
  indexOf(element) {
    let current = this.head
    for (let i = 0; i < this.size() && current != null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i
      }
      current = current.next
    }
    return -1
  }

  // 从链表中的特定位置移除一个元素
  removeAt(index) {
    if (index >= 0 && index <= this.count) {
      let current = this.head

      if (index === 0) {
        this.head = undefined
      } else {
        let previous = this.getElementAt(index - 1)
        current = previous.next
        // 将previous与current的下一项链接起来，跳过current，从而移除它
        previous.next = current.next
      }
      this.count--
      return current.element
    }
    return false
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

/**
 * 这个才是主角
 */
class SortedLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
    super(equalsFn)
    this.equalsFn = equalsFn
    this.compareFn = compareFn
  }

  push(element) {
    if (this.isEmpty()) {
      super.push(element)
    } else {
      const index = this.getIndexNextSortedElement(element)
      super.insert(element, index)
    }
  }

  insert(element, index = 0) {
    if (this.isEmpty()) {
      return super.insert(element, index === 0 ? index : 0)
    }
    const pos = this.getIndexNextSortedElement(element)
    return super.insert(element, pos)
  }

  getIndexNextSortedElement(element) {
    let current = this.head
    let i = 0;
    for (; i < this.size() && current; i++) {
      const comp = this.compareFn(element, current.element)
      if (comp === Compare.LESS_THAN) {
        return i;
      }
      current = current.next
    }
    return i
  }
}

// test
const xxx = new SortedLinkedList()

xxx.push(111)
xxx.push(222)
xxx.push(444)
xxx.push(333)

console.log(xxx.toString());

xxx.insert(123, 0)
console.log(xxx.toString());