class Set {
  constructor() {
    this.items = {}
  }

  // 添加新元素
  add(element) {
    if (!this.has(element)) {
      this.items[element] = element
      return true
    }
    return false
  }

  // 移除元素
  delete(element) {
    if (this.has(element)) {
      delete this.items[element]
      return true
    }
    return false
  }

  // 判断元素是否存在集合中
  has(element) {
    return Object.prototype.hasOwnProperty.call(this.items, element)
  }

  // 移除集合中所有元素
  clear() {
    this.items = {}
  }

  // 返回集合所包含元素的数量
  size() {
    return Object.keys(this.items).length
  }

  // 返回一个包含集合中所有值（元素）的数组
  values() {
    return Object.values(this.items)
  }
}

// test
const xxx = new Set()

xxx.add(111)
xxx.add(222)
xxx.add(333)

xxx.delete(333)

console.log('has', xxx.has(111));
console.log('size', xxx.size());
console.log('values', xxx.values());

console.log(xxx.items);