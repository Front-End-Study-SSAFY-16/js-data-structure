class Node {
  _data;
  _next;

  constructor(data) {
    this._data = data;
    this._next = null;
  }
}

class Queue {
  #head;
  #tail;
  #size;

  constructor() {
    this.#head = null;
    this.#tail = null;
    this.#size = 0;
  }

  size() {
    return this.#size;
  }

  empty() {
    return this.#size === 0;
  }

  push(data) {
    const newNode = new Node(data);

    if (this.empty()) {
      this.#head = this.#tail = newNode;
    } else {
      this.#tail._next = newNode;
      this.#tail = newNode;
    }

    ++this.#size;
  }

  pop() {
    if (this.empty()) {
      throw new Error("큐가 비어 있습니다.");
    }

    const ret = this.#head._data;
    this.#head = this.#head._next;
    --this.#size;

    return ret;
  }

  front() {
    if (this.empty()) {
      throw new Error("큐가 비어 있습니다.");
    }

    return this.#head._data;
  }

  // 큐 내부 원소를 순회하기 위한 디버그용 함수
  _toArray() {
    const arr = [];
    for (let node = this.#head; node != null; node = node._next) {
      arr.push(node._data);
    }

    return arr;
  }
}

export default Queue;
