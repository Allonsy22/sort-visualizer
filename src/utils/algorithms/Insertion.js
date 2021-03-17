class InsertionSort {
  constructor(array = []) {
    this.array = array;
    this.steps = 0;
  }

  *sort() {
    const length = this.array.length;
    const array = [...this.array];
    for (let i = 1; i < length; i++) {
      const currentValue = array[i];
      let j = i - 1;

      while (j > -1 && currentValue < array[j]) {
        this.steps++;
        array[j + 1] = array[j];
        j--;
        yield {
          currentIndex: i,
          nextIndex: j,
          isSwapped: true,
          steps: this.steps,
          swappedArray: [...array]
        };
      }
      array[j + 1] = currentValue;
      yield {
        currentIndex: i,
        nextIndex: j,
        isSwapped: false,
        steps: this.steps
      };
    }
  }

  init(array) {
    this.array = array;
  }
}

export default InsertionSort;
