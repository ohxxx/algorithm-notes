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
  set(key, value) { }

  // 从字典中移除键值对应的数据值
  remove(key) { }

  // 判断在字典中是否存在key
  hasKey(key) { }

  // 查找特定的数值并返回
  get(key) { }

  // 清空字典
  clear() { }

  // 返回字典长度
  size() { }

  // 判断字典是否为空
  isEmpty()

  // 返回字典键，以数组形式返回
  keys() { }

  // 返回字典值，以数组形式返回
  values() { }

  // 将字典中所有[键， 值]对返回
  keyValues() { }

  // 迭代字典中所有的键值对
  forEach(callbackFn) { }
}