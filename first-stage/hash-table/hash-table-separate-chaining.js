/**
 * 借助LinkedList，温习一下
 * 最下面才是主角
 */

/******************************************
*                                         *
*              LinkedList                 *
*                                         *
******************************************/

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
    this.count = 0
    this.head = undefined
  }

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

  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

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

  removeAt(index) {
    if (index >= 0 && index <= this.count) {
      let current = this.head

      if (index === 0) {
        this.head = undefined
      } else {
        let previous = this.getElementAt(index - 1)
        current = previous.next
        previous.next = current.next
      }
      this.count--
      return current.element
    }
    return false
  }

  isEmpty() {
    return this.size() === 0
  }

  size() {
    return this.count
  }

  getHead() {
    return this.head
  }

  clear() {
    this.head = undefined
    this.count = 0
  }

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
 * 主角
 */
/******************************************
*                                         *
*        HashTableSeparateChaining        *
*                                         *
******************************************/
function defaultToString(item) {
  if (item === null) {
    return 'NULL';
  } else if (item === undefined) {
    return 'UNDEFINED';
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}


class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}

class HashTableSeparateChaining {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }

  loseloseHashCode(key) {
    if (typeof key === 'number') return key;

    const tableKey = this.toStrFn(key)
    let hash = 0

    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i)
    }

    return hash % 37
  }

  hashCode(key) {
    return this.loseloseHashCode(key)
  }

  // 添加
  put(key, value) {
    if (key && value) {
      const pos = this.hashCode(key)

      if (!this.table[pos]) {
        this.table[pos] = new LinkedList()
      }

      this.table[pos].push(new ValuePair(key, value))

      return true
    }

    return false
  }

  //获取
  get(key) {
    const pos = this.hashCode(key)
    const linkedList = this.table[pos]

    if (linkedList && !linkedList.isEmpty()) {
      let cur = linkedList.getHead()
      while (cur) {
        if (cur.element.key === key) {
          return cur.element.value
        }
        cur = cur.next
      }
    }

    return null
  }

  // 移除
  remove(key) {
    const pos = this.hashCode(key)
    const linkedList = this.table[pos]

    if (linkedList && !linkedList.isEmpty()) {
      let cur = linkedList.getHead()
      while (cur) {
        if (cur.element.key === key) {
          linkedList.remove(cur.element)
          if (linkedList.isEmpty()) {
            delete this.table[pos]
          }
          return true
        }
        cur = cur.next
      }
    }
    return false
  }

}

// test
const xxx = new HashTableSeparateChaining()

xxx.put('Sue', 'xxx-Sue')
xxx.put('Aethelwulf', 'xxx-Aethelwulf')

console.log('get = ', xxx.get('Sue'));

xxx.remove('Sue')

console.log(xxx);




