class Node {
  _data;
  _parent;
  _left;
  _right;

  constructor(data) {
    this._data = data;
    this._parent = null;
    this._left = null;
    this._right = null;
  }

  // 자신이 루트 노드인지 반환하는 함수
  isRoot() {
    return this._parent === null;
  }

  // 자신이 리프 노드인지 반환하는 함수
  isLeaf() {
    return !this._left && !this._right;
  }

  // 자신이 왼쪽 자식인지 반환하는 함수
  isLeftChild() {
    return this.isRoot() ? false : this._parent._left === this;
  }

  // 자신이 오른쪽 자식인지 반환하는 함수
  isRightChild() {
    return this.isRoot() ? false : this._parent._right === this;
  }

  // 자식 노드의 개수를 반환하는 함수
  getChildCount() {
    return (this._left ? 1 : 0) + (this._right ? 1 : 0);
  }
}

class BinarySearchTree {
  #root;
  #size;

  constructor() {
    this.#root = null;
    this.#size = 0;
  }

  size() {
    return this.#size;
  }

  empty() {
    return this.#size === 0;
  }

  find(data) {
    return this.#find(data, this.#root);
  }

  #find(data, startNode) {
    let node = startNode;

    while (node) {
      if (node._data === data) {
        return node;
      }

      if (node._data > data) {
        node = node._left;
      } else {
        node = node._right;
      }
    }

    return null;
  }

  insert(data) {
    if (!this.#root) {
      this.#root = new Node(data);
      this.#size++;
      return true;
    }

    let node = this.#root;

    while (node) {
      if (node._data === data) {
        return false;
      }

      if (node._data > data) {
        if (!node._left) {
          node._left = new Node(data);
          node._left._parent = node;
          this.#size++;
          return true;
        }
        node = node._left;
      } else {
        if (!node._right) {
          node._right = new Node(data);
          node._right._parent = node;
          this.#size++;
          return true;
        }
        node = node._right;
      }
    }

    return false;
  }

  delete(data) {
    return this.#delete(data, this.#root);
  }

  #delete(data, startNode) {
    let node = this.#find(data, startNode);
    if (!node) {
      return false;
    }

    // 1. 삭제할 노드가 자식이 없는 경우
    if (node.isLeaf()) {
      if (node.isLeftChild()) {
        node._parent._left = null;
      } else if (node.isRightChild()) {
        node._parent._right = null;
      } else {
        this.#root = null;
      }
    } else {
      const childCount = node.getChildCount();
      // 2. 삭제할 노드의 자식이 1개인 경우
      if (childCount === 1) {
        const childNode = node._left ?? node._right;

        if (node.isLeftChild()) {
          node._parent._left = childNode;
        } else if (node.isRightChild()) {
          node._parent._right = childNode;
        } else {
          this.#root = childNode;
        }
        childNode._parent = node._parent;
      }
      // 3. 삭제할 노드의 자식이 2개인 경우
      else {
        // 삭제할 노드보다 큰 노드(오른쪽 자식) 중에서 가장 작은 값을 가진 노드로 대체한다.
        const successor = this.#getSuccessor(node._right);
        node._data = successor._data;
        this.#delete(successor._data, successor);
      }
    }

    this.#size--;
    return true;
  }

  #getSuccessor(node) {
    while (node._left) {
      node = node._left;
    }
    return node;
  }

  inOrder() {
    if (!this.#root) {
      return;
    }

    const result = [];
    result.push("중위 순회(in-order) 시작:");
    this.#inOrder(this.#root, result);
    console.log(result.join(" "));
  }

  #inOrder(node, result) {
    if (node._left) {
      this.#inOrder(node._left, result);
    }

    result.push(node._data);

    if (node._right) {
      this.#inOrder(node._right, result);
    }
  }
}

const binarySearchTree = new BinarySearchTree();
[10, 5, 15, 3, 7, 12, 17].forEach((v) => binarySearchTree.insert(v));
binarySearchTree.inOrder();
binarySearchTree.delete(12);
binarySearchTree.inOrder();
binarySearchTree.delete(7);
[35, -92, 105, 2, 0, -3].forEach((v) => binarySearchTree.insert(v));
binarySearchTree.inOrder();
binarySearchTree.delete(-92);
binarySearchTree.delete(105);
binarySearchTree.inOrder();
binarySearchTree.insert(-5);
binarySearchTree.insert(40);
binarySearchTree.inOrder();
