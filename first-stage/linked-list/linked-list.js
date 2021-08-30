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
  push(element) { }

  // 在任意位置插入元素
  insert(element, index) { }

  // 返回链表中特定位置的元素
  getElementAt(index) { }

  // 从链表中移除一个元素
  remove(element) { }

  // 返回元素在链表中的索引
  indexOf(element) { }

  // 从链表中的特定位置移除一个元素
  removeAt(position) { }

  // 判断链表是否为空
  isEmpty() { }

  // 返回链表的长度
  size() { }

  // 返回整个链表的字符串
  toString() { }
}