class BubbleSort {
  constructor(array = []) {
    this.array = array;
    this.steps = 0;
  }

  *sort() {
    const length = this.array.length;
    const array = [...this.array];
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        this.steps++;
        if (array[j] > array[j + 1]) {
          const temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          yield {
            currentIndex: j,
            nextIndex: j + 1,
            isSwapped: true,
            swappedArray: [...array],
            steps: this.steps
          };
        }
        yield {
          currentIndex: j,
          nextIndex: j + 1,
          isSwapped: false,
          steps: this.steps
        };
      }
    }
  }

  init(array) {
    this.array = array;
  }
}

export default BubbleSort;
