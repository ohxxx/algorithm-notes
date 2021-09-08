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

class ValuePairLazy {
  constructor(key, value, isDeleted = false) {
    this.key = key;
    this.value = value;
    this.isDeleted = isDeleted;
  }
  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}

class HashTableLinearProbingLazy {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }
  loseloseHashCode(key) {
    if (typeof key === 'number') return key;

    const tableKey = this.toStrFn(key);
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
      if (
        !this.table[pos] ||
        (this.table[pos] && this.table[pos].isDeleted)
      ) {
        this.table[pos] = new ValuePairLazy(key, value)
      } else {
        let index = pos + 1

        while (this.table[index] && !this.table[pos].isDeleted) {
          index++
        }
        this.table[index] = new ValuePairLazy(key, value)
      }
      return true
    }
    return false
  }

  // 获取
  get(key) {
    const pos = this.hashCode(key)

    if (this.table[pos]) {
      if (this.table[pos].key === key && !this.table[pos].isDeleted) {
        return this.table[pos].value
      }
      let index = pos + 1
      while (
        this.table[index] &&
        (this.table[index].key !== key || this.table[index].isDeleted)
      ) {
        if (this.table[index].key === key && this.table[index].isDeleted) {
          return undefined
        }
        index++
      }
      if (
        this.table[index] &&
        this.table[index].key === key &&
        !this.table[index].isDeleted
      ) {
        return this.table[pos].value;
      }
    }
    return undefined
  }

  // 移除
  remove(key) {
    const pos = this.hashCode(key)

    if (this.table[pos]) {
      if (this.table[pos].key === key && !this.table[pos].isDeleted) {
        this.table[pos].isDeleted = true
        return true
      }

      let index = pos + 1
      while (
        this.table[index] &&
        (this.table[index].key !== key || this.table[index].isDeleted)
      ) {
        index++
      }
      if (
        this.table[index] &&
        this.table[index].key === key &&
        !this.table[index].isDeleted
      ) {
        this.table[index].isDeleted = true
        return true
      }
    }
    return false
  }
}

// test
const xxx = new HashTableLinearProbingLazy()

xxx.put('Sue', 'xxx-Sue')
xxx.put('Jamie', 'xxx-Jamie')
xxx.put('Aethelwulf', 'xxx-Aethelwulf1')

console.log('get  = ', xxx.get('Aethelwulf'));
xxx.put('Aethelwulf', 'xxx-Aethelwulf2')
console.log('get  = ', xxx.get('Aethelwulf'));

xxx.remove('Aethelwulf')

console.log(xxx);
