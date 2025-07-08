/**
 * @param arr - 정렬된 배열
 * @param st - 시작 인덱스(inclusive)
 * @param en - 끝 인덱스(exclusive)
 * @param target - 찾으려는 값
 * @param compare - 비교 함수(default: ascedning)
 */

const binarySearch = (arr, st, en, target) => {
  while (st < en) {
    let md = (st + en) >> 1;
    if (arr[md] === target) {
      return true;
    }

    if (arr[md] > target) {
      en = md;
    } else {
      st = md + 1;
    }
  }

  return false;
};

const lowerBound = (arr, st, en, target) => {
  while (st < en) {
    let md = (st + en) >> 1;
    if (arr[md] >= target) {
      en = md;
    } else {
      st = md + 1;
    }
  }
  return st;
};

const upperBound = (arr, st, en, target) => {
  while (st < en) {
    let md = (st + en) >> 1;
    if (arr[md] <= target) {
      st = md + 1;
    } else {
      en = md;
    }
  }
  return st;
};

const arr = [1, 3, 3, 5, 7, 9];

console.log(binarySearch(arr, 0, arr.length, 5)); // true
console.log(lowerBound(arr, 0, arr.length, 3)); // 1
console.log(upperBound(arr, 0, arr.length, 3)); // 3
console.log(lowerBound(arr, 0, arr.length, 4)); // 3
console.log(upperBound(arr, 0, arr.length, 10)); // 6 (존재하지 않을 때, en 반환)
