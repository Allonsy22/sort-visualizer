class MergeSort {
  constructor(array = []) {
    this.array = [...array];
    this.temp = [...array];
    this.intermediateValues = [];
    this.steps = 0;
  }

  *sort() {
    // this method can significantly reduce the performance of merge sort,
    // but it is intended for visualization.
    this.mergeSort();
    const length = this.intermediateValues.length;

    for (let i = 0; i < length; i++) {
      const { currentIndices, array, steps } = this.intermediateValues[i];
      const currLength = currentIndices.length;
      for (let j = 0; j < currLength - 1; j++) {
        yield {
          currentIndex: j,
          nextIndex: j + 1,
          isSwapped: false,
          steps
        };
      }
      yield {
        currentIndex: currentIndices[0],
        nextIndex: currentIndices[1],
        isSwapped: true,
        steps,
        swappedArray: [...array]
      };
    }
  }

  // modified algorithm for working with an array of indices instead of an array of numbers
  mergeSort(arrOfIndices) {
    if (typeof arrOfIndices === "undefined") {
      arrOfIndices = this.array.map((item, index) => {
        item;
        return index;
      });
    }
    const halfIndex = arrOfIndices.length / 2;

    if (arrOfIndices.length < 2) return arrOfIndices;

    const leftArrayOfIndices = arrOfIndices.splice(0, halfIndex);
    return this.merge(
      this.mergeSort(leftArrayOfIndices),
      this.mergeSort(arrOfIndices)
    );
  }

  merge(left, right) {
    const arr = [];

    while (left.length && right.length) {
      this.steps++;
      if (this.array[left[0]] < this.array[right[0]]) {
        arr.push(left.shift());
      } else {
        arr.push(right.shift());
      }
    }

    const result = [...arr, ...left, ...right];
    // using .apply() works quickly than other methods
    let min = Math.min.apply(null, result);

    result.forEach((arrIndex, i) => {
      const startIndex = min + i;
      this.temp[startIndex] = this.array[arrIndex];
    });

    this.intermediateValues.push({
      currentIndices: [...result],
      array: [...this.temp],
      steps: this.steps
    });
    return result;
  }

  init(array) {
    this.array = array;
    this.temp = [...array];
    this.intermediateValues = [];
  }
}

export default MergeSort;
