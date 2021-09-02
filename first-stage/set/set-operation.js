class SetOperation {
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

  // 并集
  union(otherSet) {
    const unionSet = new SetOperation()

    this.values().forEach(value => unionSet.add(value))
    otherSet.values().forEach(value => unionSet.add(value))

    return unionSet
  }

  // 交集
  intersection(otherSet) {
    const intersectionSet = new SetOperation()
    const values = this.values()
    const otherValues = otherSet.values()

    let biggerSet = values
    let smallerSet = otherValues
    // 比较
    if (otherValues.length - values.length > 0) {
      biggerSet = otherValues
      smallerSet = values
    }

    smallerSet.forEach(value => {
      if (biggerSet.includes(value)) {
        intersectionSet.add(value)
      }
    })

    return intersectionSet
  }

  // 差集
  difference(otherSet) {
    const differenceSet = new SetOperation()

    this.values().forEach(value => {
      if (!otherSet.has(value)) {
        differenceSet.add(value)
      }
    })

    return differenceSet
  }

  // 子集
  isSubsetOf(otherSet) {
    if (this.size() > otherSet.size()) return false;

    let isSubset = true
    this.values().every(value => {
      if (!otherSet.has(value)) {
        isSubset = false
        return false
      }

      return true
    })

    return isSubset
  }
}

// test
const xxxA = new SetOperation()
xxxA.add(111)
xxxA.add(222)
xxxA.add(333)

const xxxB = new SetOperation()
xxxB.add(333)
xxxB.add(444)
xxxB.add(555)
xxxB.add(666)

const unionB = xxxA.union(xxxB)
console.log('并集 = ', unionB);

const intersectionB = xxxA.intersection(xxxB)
console.log('交集 = ', intersectionB.values());

const differenceB = xxxA.difference(xxxB)
console.log('差集 = ', differenceB.values());


const xxxAA = new SetOperation()
xxxAA.add(111)
xxxAA.add(222)
xxxAA.add(333)
const xxxBB = new SetOperation()
xxxBB.add(333)

console.log('AA是BB的子集', xxxAA.isSubsetOf(xxxBB));
console.log('BB是AA的子集', xxxBB.isSubsetOf(xxxAA));
