import Queue from "./queue.js";

const getMaxDigit = (arr) => {
  let maxValue = 0;
  arr.forEach((item) => {
    maxValue = Math.max(maxValue, item);
  });

  if (maxValue === 0) {
    return 1;
  }

  return Math.floor(Math.log10(maxValue) + 1);
};

/**
 * @param arr - 정렬할 배열
 * @param isAscending - 오름차순 여부(default: ascedning)
 */
const radixSort = (arr, isAscending = true) => {
  const buckets = Array.from({ length: 10 }, () => new Queue());
  let tmpArr = [...arr];
  const maxDigit = getMaxDigit(tmpArr);
  let base = 1;

  for (let digit = 1; digit <= maxDigit; ++digit) {
    tmpArr.forEach((item) => {
      const mod = Math.floor(item / base) % 10;
      buckets[mod].push(item);
    });
    tmpArr.length = 0;

    if (isAscending) {
      for (let i = 0; i <= 9; ++i) {
        while (!buckets[i].empty()) {
          tmpArr.push(buckets[i].pop());
        }
      }
    } else {
      for (let i = 9; i >= 0; --i) {
        while (!buckets[i].empty()) {
          tmpArr.push(buckets[i].pop());
        }
      }
    }

    base *= 10;
  }

  arr.length = 0;
  tmpArr.forEach((v) => arr.push(v));
};

const data = [36, 15, 9, 166, 9999, 18, 408, 172, 1];

console.log("[기수 정렬 전]");
console.log(data.join(", ") + "\n");

// radixSort(data);
radixSort(data, false);

console.log("[기수 정렬 후]");
console.log(data.join(", "));
