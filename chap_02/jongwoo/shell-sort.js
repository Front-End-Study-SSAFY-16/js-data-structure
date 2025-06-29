/**
 * @param arr - 정렬할 배열
 * @param compare - 비교 함수(default: ascedning)
 */
const shellSort = (arr, compare = (a, b) => a < b) => {
  const length = arr.length;
  for (let gap = Math.floor(length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    if (gap % 2 === 0) {
      gap++;
    }

    for (let i = 0; i < gap; ++i) {
      insertionSort(arr, i, length, gap, compare);
    }
  }
};

/**
 * @param arr - 정렬할 배열
 * @param st - 시작 인덱스(inclusive)
 * @param en - 끝 인덱스(exclusive)
 * @param gap - 간격
 * @param compare - 비교 함수(default: ascedning)
 */
const insertionSort = (arr, st, en, gap, compare) => {
  for (let i = st + gap, j = 0; i < en; i += gap) {
    let target = arr[i];

    for (j = i - gap; j >= st; j -= gap) {
      if (compare(target, arr[j])) {
        arr[j + gap] = arr[j];
      } else {
        break;
      }
    }

    arr[j + gap] = target;
  }
};

const data = [3, 5, 9, 6, 1, 8, 4, 7, 2];

console.log("[셸 정렬 전]");
console.log(data.join(", ") + "\n");

// shellSort(data);
shellSort(data, (a, b) => a > b);

console.log("[셸 정렬 후]");
console.log(data.join(", "));
