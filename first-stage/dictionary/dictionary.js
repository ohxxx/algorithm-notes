// 默认转string
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

// key-value to [key: value]
class ValuePair {
  constructor(key, value) {
    this.key = key
    this.value = value
  }
  toString() {
    return `[#${this.key}: ${this.value}]`
  }
}

class Dictionary {

  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }

  // 向字典中添加新元素
  set(key, value) {
    if (key && value) {
      const tableKey = this.toStrFn(key)
      this.table[tableKey] = new ValuePair(key, value)
      return true
    }

    return false
  }

  // 从字典中移除键值对应的数据值
  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)]
      return true
    }

    return false
  }

  // 判断在字典中是否存在key
  hasKey(key) {
    return this.table[this.toStrFn(key)] != null
  }

  // 查找特定的数值并返回
  get(key) {
    const valuePair = this.table[this.toStrFn(key)]
    return valuePair == null ? undefined : valuePair.value
  }

  // 清空字典
  clear() {
    this.table = {}
  }

  // 返回字典长度
  size() {
    return Object.keys(this.table).length
  }

  // 判断字典是否为空
  isEmpty() {
    return this.size() === 0
  }

  // 返回字典键，以数组形式返回
  keys() {
    return this.keyValues().map(valuePair => valuePair.value)
  }

  // 返回字典值，以数组形式返回
  values() {
    return this.keyValues().map(valuePair => valuePair.key)
  }

  // 将字典中所有[键， 值]对返回
  keyValues() {
    return Object.values(this.table)
  }

  // 迭代字典中所有的键值对
  forEach(callbackFn) {
    const valuePairs = this.keyValues()

    for (let i = 0; i < valuePairs.length; i++) {
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value)

      if (result === false) break;
    }
  }
}

// test 
const xxx = new Dictionary()
xxx.set(1, '111')
xxx.set(2, '222')
xxx.set(3, '333')

console.log('get = ', xxx.get(2));
console.log('has = ', xxx.hasKey(1));

xxx.remove(2)

console.log(xxx);