/*
 * [5,3,8,2,6]
 * [8,3,5,7,9]
 */

function selectionSort(arr) {
  let fp = 0;
  let sp = fp + 1;
  let currentMinIndx = fp;

  while (fp < arr.length - 1) {
    if (arr[currentMinIndx] > arr[sp]) {
      currentMinIndx = sp;
    }

    if (sp === arr.length - 1) {
      const temp = arr[fp];
      arr[fp] = arr[currentMinIndx];
      arr[currentMinIndx] = temp;
      fp += 1;
      sp = fp + 1;
      currentMinIndx = fp;
    } else {
      sp += 1;
    }
  }

  return arr;
}

console.log(selectionSort([8, 3, 5, 7, 9]));
