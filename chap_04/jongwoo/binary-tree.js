import Queue from "./queue.js";

class Node {
  _data;
  _left;
  _right;

  constructor(data) {
    this._data = data;
    this._left = null;
    this._right = null;
  }
}

class BinaryTree {
  _root;
  #result;

  constructor() {
    this._root = null;
    this.#result = [];
  }

  preOrder() {
    if (!this._root) {
      return;
    }

    this.#result = [];
    this.#result.push("전위 순회(pre-order) 시작:");
    this.#preOrder(this._root);
    console.log(this.#result.join(" "));
  }

  #preOrder(node) {
    this.#result.push(node._data);

    if (node._left) {
      this.#preOrder(node._left);
    }

    if (node._right) {
      this.#preOrder(node._right);
    }
  }

  inOrder() {
    if (!this._root) {
      return;
    }

    this.#result = [];
    this.#result.push("중위 순회(in-order) 시작:");
    this.#inOrder(this._root);
    console.log(this.#result.join(" "));
  }

  #inOrder(node) {
    if (node._left) {
      this.#inOrder(node._left);
    }

    this.#result.push(node._data);

    if (node._right) {
      this.#inOrder(node._right);
    }
  }

  postOrder() {
    if (!this._root) {
      return;
    }

    this.#result = [];
    this.#result.push("후위 순회(post-order) 시작:");
    this.#postOrder(this._root);
    console.log(this.#result.join(" "));
  }

  #postOrder(node) {
    if (node._left) {
      this.#postOrder(node._left);
    }

    if (node._right) {
      this.#postOrder(node._right);
    }

    this.#result.push(node._data);
  }

  levelOrder() {
    if (!this._root) {
      return;
    }

    this.#result = [];
    this.#result.push("레벨 순회(level-order) 시작:");

    const queue = new Queue();
    queue.push(this._root);
    while (!queue.empty()) {
      const node = queue.pop();
      this.#result.push(node._data);

      if (node._left) {
        queue.push(node._left);
      }

      if (node._right) {
        queue.push(node._right);
      }
    }

    console.log(this.#result.join(" "));
  }
}

//        A
//      /   \
//     B     C
//    /\     /\
//   D  E   F  G
//    \    /
//     H  I
const binaryTree = new BinaryTree();
binaryTree._root = new Node("A");
binaryTree._root._left = new Node("B");
binaryTree._root._right = new Node("C");
binaryTree._root._left._left = new Node("D");
binaryTree._root._left._right = new Node("E");
binaryTree._root._right._left = new Node("F");
binaryTree._root._right._right = new Node("G");
binaryTree._root._left._left._right = new Node("H");
binaryTree._root._right._left._left = new Node("I");
binaryTree.preOrder(); // A B D H E C F I G
binaryTree.inOrder(); // D H B E A I F C G
binaryTree.postOrder(); // H D E B I F G C A
binaryTree.levelOrder(); // A B C D E F G H I
