
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
}