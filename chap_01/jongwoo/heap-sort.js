/**
 * @param arr - 대상 배열
 * @param st - 인덱스 1
 * @param en - 인덱스 2
 */
const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

class Heap {
  // 필드나 메서드명 앞에 #를 붙이면 private 접근 지정자가 됨(ES2022~)
  #arr = [];
  #compare;

  // default: Max Heap
  constructor(compare = (a, b) => a > b) {
    this.#compare = compare;
  }

  size = () => this.#arr.length;
  empty = () => this.#arr.length === 0;
  push = (data) => {
    this.#arr.push(data);

    let cur = this.#arr.length - 1;
    let parent = Math.floor((cur - 1) / 2);
    while (parent >= 0 && this.#compare(this.#arr[cur], this.#arr[parent])) {
      swap(this.#arr, parent, cur);
      cur = parent;
      parent = Math.floor((cur - 1) / 2);
    }
  };
  pop = () => {
    if (this.empty()) {
      throw Error("배열이 비어 있습니다.");
    }

    swap(this.#arr, 0, this.#arr.length - 1);
    const res = this.#arr.pop();

    let parent = 0;
    let child = 2 * (parent + 1) - 1;
    while (child < this.#arr.length) {
      if (
        child < this.#arr.length - 1 &&
        this.#compare(this.#arr[child + 1], this.#arr[child])
      ) {
        ++child;
      }

      if (!this.#compare(this.#arr[child], this.#arr[parent])) {
        break;
      }

      swap(this.#arr, parent, child);
      parent = child;
      child = 2 * (parent + 1) - 1;
    }

    return res;
  };
  top = () => {
    if (this.empty()) {
      throw Error("배열이 비어 있습니다.");
    }

    return this.#arr[0];
  };
}

const data = [3, 5, 9, 6, 1, 8, 4, 7, 2];

console.log("[힙 정렬 전]");
console.log(data.join(", ") + "\n");

// const heap = new Heap();
const heap = new Heap((a, b) => a < b);
data.forEach((item) => heap.push(item));
data.forEach((_, index) => (data[index] = heap.pop()));

console.log("[힙 정렬 후]");
console.log(data.join(", "));
