// node节点
class Node {
  constructor(key) {
    this.key = key; // 节点值
    this.left = undefined; // 左侧子节点引用
    this.right = undefined; // 右侧子节点饮用
  }
  toString() {
    return `${this.key}`;
  }
}

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
};

function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn; // 用来比较节点值
    this.root = undefined; // 根节点
  }

  // 插入
  insert(key) {
    if (!this.root) {
      this.root = new Node(key)
    } else {
      this.insertNode(this.root, key)
    }
  }

  // 找到新节点插入到正确位置
  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) { // 新节点小于当前节点，左侧插入
      if (!node.left) {
        node.left = new Node(key)
      } else {
        this.insertNode(node.left, key)
      }
    } else { // 新节点大于当前节点，右侧插入
      if (!node.right) {
        node.right = new Node(key)
      } else {
        this.insertNode(node.right, key)
      }
    }
  }

  // 在树中查找一个键
  search(key) {
    return this.searchNode(this.root, key)
  }

  searchNode(node, key) {
    if (!node) return false;

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) { // 小于，在左侧查找
      return this.searchNode(node.left, key)
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) { // 大于，在右侧查找
      return this.searchNode(node.right, key)
    } else {
      return true
    }
  }

  // 中序遍历方式遍历所有节点
  inOrderTraverse(callback) {
    /**
     * inOrderTraverse方法接收一个回调函数作为参数，回调函数用来定义我们对
     * 遍历到的每个节点进行的操作（这也叫访问者模式）
     */
    this.inOrderTraverseNode(this.root, callback)
  }

  inOrderTraverseNode(node, callback) {
    if (node) { // node不为空 - 递归算法的基线条件
      this.inOrderTraverseNode(node.left, callback)
      callback(node.key) // 关键点
      this.inOrderTraverseNode(node.right, callback)
    }
  }

  // 先序遍历方法遍历所有节点
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback)
  }

  preOrderTraverseNode(node, callback) {
    if (node) {
      callback(node.key) // 关键点
      this.preOrderTraverseNode(node.left, callback)
      this.preOrderTraverseNode(node.right, callback)
    }
  }

  // 后序遍历方式遍历所有节点
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback)
  }

  postOrderTraverseNode(node, callback) {
    if (node) {
      this.postOrderTraverseNode(node.left, callback)
      this.postOrderTraverseNode(node.right, callback)
      callback(node.key) // 关键点
    }

  }

  // 返回树中最小的值/键
  min() {
    return this.minNode(this.root)
  }

  minNode(node) {
    let current = node
    while (current && current.left) {
      current = current.left
    }

    return current
  }

  // 返回树中最大的值/键
  max() {
    return this.maxNode(this.root)
  }

  maxNode(node) {
    let current = node
    while (current && current.right) {
      current = current.right
    }

    return current
  }

  // 从树中移除某个键
  remove(key) {
    this.root = this.removeNode(this.root, key)
  }

  removeNode(node, key) {
    if (!node) return null;

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) { // 小于，在左侧查找删除
      node.left = this.removeNode(node.left, key)
      return node
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) { // 大于，在右侧查找删除
      node.right = this.removeNode(node.right, key)
      return node
    } else { // 等于，匹配到了
      /**
       * 第一种情况：该删除节点是一个没有左右侧子节点的叶节点
       */
      if (!node.left && !node.right) {
        node = null
        return node
      }
      /**
       * 第二种情况：移除一个左侧子节点或右侧子节点的节点
       * 这种情况下，需要跳过这个节点，直接将父节点指向它的指针指向子节点
       */
      if (!node.left) {
        node = node.right
        return node
      } else if (!node.right) {
        node = node.left
        return node
      }

      /**
       * 第三种情况：要移除的节点有两个子节点
       */
      const aux = this.minNode(node.right)
      node.key = aux.key
      node.right = this.removeNode(node.right, aux.key)
      return node
    }
  }
}

// test
const xxx = new BinarySearchTree()
xxx.insert(11)
xxx.insert(7)
xxx.insert(15)
xxx.insert(5)
xxx.insert(3)
xxx.insert(9)
xxx.insert(8)
xxx.insert(10)
xxx.insert(13)
xxx.insert(12)
xxx.insert(14)
xxx.insert(20)
xxx.insert(18)
xxx.insert(25)
xxx.insert(6)

const printNode = (value) => console.log(value)
// 中序遍历
// xxx.inOrderTraverse(printNode)

// 先序遍历
// xxx.preOrderTraverse(printNode)

// 后序遍历
// xxx.postOrderTraverse(printNode)

console.log('树的最小值 = ', xxx.min());

console.log('树的最大值 = ', xxx.max());

console.log('查找树12 = ', xxx.search(12) ? '存在' : '不存在');

// 1
xxx.remove(6)

// 2
xxx.remove(5)

// 3
xxx.remove(15)


console.log(JSON.stringify(xxx));