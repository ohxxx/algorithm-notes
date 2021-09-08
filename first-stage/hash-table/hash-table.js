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
class HashTable {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }

  // 散列函数
  loseloseHashCode(key) {
    if (typeof key === 'number') return key;

    const tableKey = this.toStrFn(key)
    let hash = 0

    // 遍历key并并将从ASCII表中查到每个字符串对应的ASCII值添加到hash变量中
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i)
    }

    return hash % 37 // 避免操作数超过数值变量最大表示范围的风险
  }

  hashCode(key) {
    return this.loseloseHashCode(key);
  }

  // 向散列表中添加一个新的项
  put(key, value) {
    if (key && value) {
      const pos = this.hashCode(key)
      this.table[pos] = new ValuePair(key, value)
      return true
    }

    return false
  }

  // 根据键检索值
  get(key) {
    const valuePair = this.table[this.hashCode(key)]

    return valuePair == null ? undefined : valuePair.value
  }

  // 根据键移除值
  remove(key) {
    const hash = this.hashCode(key)
    const valuePair = this.table[hash]

    if (valuePair != null) {
      delete this.table[hash]
      return true
    }

    return false
  }

  // 获取散列表
  getTable() {
    return this.table
  }

  // 散列表是否为空
  isEmpty() {
    return this.size() === 0
  }

  // 返回散列表长度
  size() {
    return Object.keys(this.table).length
  }

  // 清空散列表
  clear() {
    this.table = {}
  }

  // 打印
  toString() {
    if (this.isEmpty()) return '';

    const keys = Object.keys(this.table)
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`

    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[keys[i]].toString()}}`
    }

    return objString
  }

}

// test
const xxx = new HashTable()

console.log(xxx.loseloseHashCode('xxx'));

xxx.put('xxx', 123)
xxx.put('xxx', 'xxx1')
xxx.put('123', 'xxx2')
xxx.put(123, 'xxx3')

console.log('get = ', xxx.get(111));
console.log('get = ', xxx.get("123"));

xxx.remove(123)


console.log(xxx);