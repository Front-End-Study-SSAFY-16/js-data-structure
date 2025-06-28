/**
 * @param arr - 정렬할 배열
 * @param st - 시작 인덱스(inclusive)
 * @param en - 끝 인덱스(exclusive)
 * @param compare - 비교 함수(default: ascedning)
 */
const mergeSort = (
  arr,
  st,
  en,
  compare = (a, b) => a <= b,
  tmp = Array(arr.length) // 처음 mergeSort가 호출 될 때 undefined이므로 생성되고 이후 재귀에서는 처음 생성된 tmp를 사용!
) => {
  if (st < en - 1) {
    const md = Math.floor((st + en) / 2); // js는 나눗셈 연산(/)시 소수점이 나오는 것에 주의!
    mergeSort(arr, st, md, compare, tmp);
    mergeSort(arr, md, en, compare, tmp);
    merge(arr, st, md, en, compare, tmp);
  }
};

const merge = (arr, st, md, en, compare, tmp) => {
  let i = st;
  let j = md;
  let k = st;

  while (i < md && j < en) {
    if (compare(arr[i], arr[j])) {
      tmp[k++] = arr[i++];
    } else {
      tmp[k++] = arr[j++];
    }
  }

  while (i < md) {
    tmp[k++] = arr[i++];
  }

  while (j < en) {
    tmp[k++] = arr[j++];
  }

  for (let l = st; l < en; ++l) {
    arr[l] = tmp[l];
  }
};

const data = [3, 5, 9, 6, 1, 8, 4, 7, 2];

console.log("[합병 정렬 전]");
console.log(data.join(", ") + "\n");

// mergeSort(data, 0, data.length);
mergeSort(data, 0, data.length, (a, b) => a >= b);

console.log("[합병 정렬 후]");
console.log(data.join(", "));
