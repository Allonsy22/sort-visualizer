class QuickSort {
  constructor(array = []) {
    this.array = [...array];
    this.intermediateValues = [];
    this.steps = 0;
  }

  *sort() {
    // this method can significantly reduce the performance of merge sort,
    // but it is intended for visualization.
    this.quickSortRecursive();
    const length = this.intermediateValues.length;

    for (let i = 0; i < length; i++) {
      const { currentIndex, nextIndex, array, steps } = this.intermediateValues[
        i
      ];
      yield {
        currentIndex,
        nextIndex,
        isSwapped: true,
        steps,
        swappedArray: [...array]
      };
    }
  }

  partition(arr, start, end) {
    // Taking the last element as the pivot
    const pivotValue = arr[end];
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
      if (arr[i] < pivotValue) {
        [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
        pivotIndex++;
      }
      this.steps++;

      this.intermediateValues.push({
        currentIndex: end,
        nextIndex: i,
        array: [...this.array],
        steps: this.steps
      });
    }

    // Putting the pivot value in the middle
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];

    this.intermediateValues.push({
      currentIndex: end,
      nextIndex: end,
      array: [...this.array],
      steps: this.steps
    });
    return pivotIndex;
  }

  quickSortRecursive(arr = this.array, start = 0, end = this.array.length - 1) {
    if (start >= end) {
      return;
    }

    const index = this.partition(arr, start, end);

    this.quickSortRecursive(arr, start, index - 1);
    this.quickSortRecursive(arr, index + 1, end);
  }

  init(array) {
    this.array = array;
    this.intermediateValues = [];
  }
}

export default QuickSort;
