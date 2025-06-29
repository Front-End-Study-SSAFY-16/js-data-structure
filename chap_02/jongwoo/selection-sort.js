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
const selectionSort = (arr, compare = (a, b) => a < b) => {
  const length = arr.length;
  for (let i = 0; i < length - 1; ++i) {
    let target = i;

    for (let j = i + 1; j < length; ++j) {
      if (compare(arr[j], arr[target])) {
        target = j;
      }
    }

    swap(arr, i, target);
  }
};

const data = [3, 5, 9, 6, 1, 8, 4, 7, 2];

console.log("[선택 정렬 전]");
console.log(data.join(", ") + "\n");

// selectionSort(data);
selectionSort(data, (a, b) => a >= b);

console.log("[선택 정렬 후]");
console.log(data.join(", "));
