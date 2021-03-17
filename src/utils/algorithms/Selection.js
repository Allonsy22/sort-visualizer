class SelectionSort {
  constructor(array = []) {
    this.array = array;
    this.steps = 0;
  }

  *sort() {
    const length = this.array.length;
    const array = [...this.array];
    for (let i = 0; i < length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < length; j++) {
        this.steps++;
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
        yield {
          currentIndex: minIndex,
          nextIndex: j,
          isSwapped: false,
          steps: this.steps
        };
      }
      if (minIndex !== i) {
        const temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
        yield {
          currentIndex: minIndex,
          nextIndex: i,
          isSwapped: true,
          swappedArray: [...array],
          steps: this.steps
        };
      }
    }
  }

  init(array) {
    this.array = array;
  }
}

export default SelectionSort;
