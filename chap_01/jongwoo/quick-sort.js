/**
 * @param arr - 대상 배열
 * @param st - 인덱스 1
 * @param en - 인덱스 2
 */
const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

/**
 * @param arr - 정렬할 배열
 * @param st - 시작 인덱스(inclusive)
 * @param en - 끝 인덱스(exclusive)
 * @param compare - 비교 함수(default: ascedning)
 */
const quickSort = (arr, st, en, compare = (a, b) => a <= b) => {
  if (st < en) {
    const pivot = st;
    let left = st + 1;
    let right = en - 1;

    while (left <= right) {
      while (left <= right && compare(arr[left], arr[pivot])) {
        left++;
      }

      while (left <= right && compare(arr[pivot], arr[right])) {
        right--;
      }

      if (left < right) {
        swap(arr, left, right);
      }
    }

    swap(arr, pivot, right);
    quickSort(arr, st, right, compare);
    quickSort(arr, right + 1, en, compare);
  }
};

const data = [3, 5, 9, 6, 1, 8, 4, 7, 2];

console.log("[퀵 정렬 전]");
console.log(data.join(", ") + "\n");

// quickSort(data, 0, data.length);
quickSort(data, 0, data.length, (a, b) => a >= b);

console.log("[퀵 정렬 후]");
console.log(data.join(", "));
