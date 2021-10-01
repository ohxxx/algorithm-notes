
/**
 * 借助BinarySearchTree，温习一下
 * 最下面才是主角
 */

/******************************************
*                                         *
*           BinarySearchTree              *
*                                         *
******************************************/
class Node {
  constructor(key) {
    this.key = key;
    this.left = undefined;
    this.right = undefined;
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
    this.compareFn = compareFn;
    this.root = undefined;
  }

  insert(key) {
    if (!this.root) {
      this.root = new Node(key)
    } else {
      this.insertNode(this.root, key)
    }
  }

  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (!node.left) {
        node.left = new Node(key)
      } else {
        this.insertNode(node.left, key)
      }
    } else {
      if (!node.right) {
        node.right = new Node(key)
      } else {
        this.insertNode(node.right, key)
      }
    }
  }

  search(key) {
    return this.searchNode(this.root, key)
  }

  searchNode(node, key) {
    if (!node) return false;

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key)
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key)
    } else {
      return true
    }
  }

  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback)
  }

  inOrderTraverseNode(node, callback) {
    if (node) {
      this.inOrderTraverseNode(node.left, callback)
      callback(node.key)
      this.inOrderTraverseNode(node.right, callback)
    }
  }

  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback)
  }

  preOrderTraverseNode(node, callback) {
    if (node) {
      callback(node.key)
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
      callback(node.key)
    }

  }

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

  remove(key) {
    this.root = this.removeNode(this.root, key)
  }

  removeNode(node, key) {
    if (!node) return null;

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key)
      return node
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key)
      return node
    } else {
      if (!node.left && !node.right) {
        node = null
        return node
      }

      if (!node.left) {
        node = node.right
        return node
      } else if (!node.right) {
        node = node.left
        return node
      }

      const aux = this.minNode(node.right)
      node.key = aux.key
      node.right = this.removeNode(node.right, aux.key)
      return node
    }
  }
}


/******************************************
*                                         *
*                AVLTree                  *
*                                         *
******************************************/

const BalanceFactor = {
  UNBALANCED_RIGHT: 1, // 不平衡_右
  SLIGHTLY_UNBALANCED_RIGHT: 2, // 略微不平衡_右
  BALANCED: 3, // 均衡
  SLIGHTLY_UNBALANCED_LEFT: 4, // 略微不平衡_左
  UNBALANCED_LEFT: 5 // 不平衡_左
};

class AVLTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = compareFn;
    this.root = null;
  }
  // 获取一个节点的高度
  getNodeHeight(node) {
    if (!node) return -1;

    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
  }

  // 获取一个节点的平衡因子
  getBalanceFactor(node) {
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right)
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }

  // 左-左（LL - left-left）：向右的单旋转
  /**
   *
   *       b                           a
   *      / \                         / \
   *     a   e -> rotationLL(b) ->   c   b
   *    / \                             / \
   *   c   d                           d   e
   *
   */
  rotationLL(node) {
    const temp = node.left
    node.left = temp.right
    temp.right = node
    return temp
  }

  // 右-右（RR - right-right）：向左的单旋转
  /**
   *
   *     a                              b
   *    / \                            / \
   *   c   b   -> rotationRR(a) ->    a   e
   *      / \                        / \
   *     d   e                      c   d
   *
   */
  rotationRR(node) {
    const temp = node.right
    node.right = temp.left
    temp.left = node
    return temp
  }

  // 左-右（LR - left-right）：向右的双旋转（先 RR 旋转，再 LL 旋转）
  rotationLR(node) {
    node.left = this.rotationRR(node.left)
    return this.rotationLL(node)
  }

  // 右-左（RL - right-left）：向左的双旋转（先 LL 旋转，再 RR 旋转）
  rotationRL(node) {
    node.right = this.rotationLL(node.right)
    return this.rotationRR(node)
  }

  // 插入
  insert(key) {
    this.root = this.insertNode(this.root, key)
  }

  // 重写插入
  insertNode(node, key) {
    if (!node) {
      return new Node(key)
    } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) { // 左侧插入
      node.left = this.insertNode(node.left, key)
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) { // 右侧插入
      node.right = this.insertNode(node.right, key)
    } else {
      return node // 重复的key
    }

    // 以下进行平衡操作

    // 获取以每个插入树的节点为根的节点的平衡因子
    const balanceFactor = this.getBalanceFactor(node)
    // 在左侧子树插入节点后不平衡了
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      // 插入的键小于左侧子节点的键
      if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        node = this.rotationLL(node)
      } else {
        return this.rotationLR(node)
      }
    }

    // 在右侧子树插入节点后不平衡了
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      // 插入的键大于右侧子节点的键
      if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
        node = this.rotationRR(node)
      } else {
        return this.rotationRL(node)
      }
    }

    return node
  }

  // 重写删除
  removeNode(node, key) {
    node = super.removeNode(node, key)
    if (!node) return node; // 不需要平衡 

    // 以下进行平衡处理

    // 检查是否需要平衡处理
    const balanceFactor = this.getBalanceFactor(node)
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      if (
        this.getBalanceFactor(node.left) === BalanceFactor.BALANCED ||
        this.getBalanceFactor(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return this.rotationLL(node)
      }
      if (this.getBalanceFactor(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.rotationLR(node.left)
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if (
        this.getBalanceFactor(node.right) === BalanceFactor.BALANCED ||
        this.getBalanceFactor(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return this.rotationRR(node)
      }
      if (this.getBalanceFactor(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.rotationRL(node.right)
      }
    }

    return node
  }
}

// test
// const xxx = new BinarySearchTree()
const xxx = new AVLTree()
xxx.insert(11)
xxx.insert(7)
xxx.insert(15)
xxx.insert(5)
xxx.insert(9)
xxx.insert(8)

xxx.remove(9)

console.log(JSON.stringify(xxx));