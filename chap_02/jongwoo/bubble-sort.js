/**
 * @param arr - 대상 배열
 * @param i - 인덱스 1
 * @param j - 인덱스 2
 */
const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

/**
 * @param arr - 정렬할 배열
 * @param compare - 비교 함수(default: ascedning)
 */
const bubbleSort = (arr, compare = (a, b) => a < b) => {
  for (let i = arr.length - 1; i > 0; --i) {
    for (let j = 0; j < i; ++j) {
      if (compare(arr[j + 1], arr[j])) {
        swap(arr, j, j + 1);
      }
    }
  }
};

const data = [3, 5, 9, 6, 1, 8, 4, 7, 2];

console.log("[버블 정렬 전]");
console.log(data.join(", ") + "\n");

// bubbleSort(data);
bubbleSort(data, (a, b) => a >= b);

console.log("[버블 정렬 후]");
console.log(data.join(", "));
