/**
 * @param arr - 정렬할 배열
 * @param compare - 비교 함수(default: ascedning)
 */
const insertionSort = (arr, compare = (a, b) => a < b) => {
  const length = arr.length;
  for (let i = 1, j = 0; i < length; ++i) {
    let target = arr[i];

    for (j = i - 1; j >= 0; --j) {
      if (compare(target, arr[j])) {
        arr[j + 1] = arr[j];
      } else {
        break;
      }
    }

    arr[j + 1] = target;
  }
};

const data = [3, 5, 9, 6, 1, 8, 4, 7, 2];

console.log("[삽입 정렬 전]");
console.log(data.join(", ") + "\n");

// insertionSort(data);
insertionSort(data, (a, b) => a > b);

console.log("[삽입 정렬 후]");
console.log(data.join(", "));
