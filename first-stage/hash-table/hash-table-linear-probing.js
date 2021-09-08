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

class HashTableLinearProbing {
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
        this.table[pos] = new ValuePair(key, value)
      } else {
        let index = pos + 1
        while (this.table[index]) {
          index++
        }
        this.table[index] = new ValuePair(key, value)
      }
      return true
    }

    return false
  }

  // 获取
  get(key) {
    const pos = this.hashCode(key)

    if (this.table[pos]) {
      if (this.table[pos].key === key) { // 直接匹配到
        return this.table[pos].value
      }
      let index = pos + 1
      while (this.table[index] && this.table[index].key !== key) {
        index++
      }
      if (this.table[index] && this.table[index].key === key) {
        return this.table[index].value
      }
    }

    return null
  }

  // 移除
  remove(key) {
    const pos = this.hashCode(key)

    if (this.table[pos]) {
      if (this.table[pos].key === key) { // 直接匹配到
        delete this.table[pos].value
        this.verifyRemoveSideEffect(key, pos)
        return true
      }
      let index = pos + 1
      while (this.table[index] && this.table[index].key !== key) {
        index++
      }
      if (this.table[index] && this.table[index].key === key) {
        delete this.table[index]
        this.verifyRemoveSideEffect(key, index)
        return true
      }
    }

    return false
  }

  // 验证
  verifyRemoveSideEffect(key, removedPosition) {
    const hash = this.hashCode(key)
    let index = removedPosition + 1

    while (this.table[index]) {
      const posHash = this.hashCode(this.table[index].key)

      if (posHash <= hash || posHash <= removedPosition) {
        this.table[removedPosition] = this.table[index]
        delete this.table[index]
        removedPosition = index
      }

      index++
    }
  }


}

// test
const xxx = new HashTableLinearProbing()

xxx.put('Sue', 'xxx-Sue')
xxx.put('Jamie', 'xxx-Jamie')
xxx.put('Aethelwulf', 'xxx-Aethelwulf1')

console.log('get  = ', xxx.get('Aethelwulf'));
xxx.put('Aethelwulf', 'xxx-Aethelwulf2')
console.log('get  = ', xxx.get('Aethelwulf'));

xxx.remove('Aethelwulf')

console.log(xxx);