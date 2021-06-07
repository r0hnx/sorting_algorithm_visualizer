export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSort(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSort(a, s, e, aux, animations) {
  if (s === e) return;
  const mid = Math.floor((s + e) / 2);

  // further divide the array into 2 parts
  // start to middle & middle + 1 to end
  mergeSort(aux, s, mid, a, animations);
  mergeSort(aux, mid + 1, e, a, animations);

  // merge the parts
  merge(a, s, mid, e, aux, animations);
}

function merge(a, s, middle, e, aux, animations) {
  let k = s;
  let i = s;
  let j = middle + 1;

  // check for smaller element between the i and j position
  // while start <= mid and mid + 1 <= end
  while (i <= middle && j <= e) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (aux[i] < aux[j]) {
      animations.push([k, aux[i]]);
      a[k++] = aux[i++];
    } else {
      animations.push([k, aux[j]]);
      a[k++] = aux[j++];
    }
  }

  while (i <= middle) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, aux[i]]);
    a[k++] = aux[i++];
  }

  while (j <= e) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, aux[j]]);
    a[k++] = aux[j++];
  }
}
