export function getRandomNumbers({ min = 10, max = 100, count = 10 } = {}) {
  return new Promise(resolve => {
    const numbers = [];
    for (let i = 0; i < count; i++) {
      const rand = Math.floor(min + Math.random() * (max + 1 - min));
      numbers.push(rand);
    }
    resolve(numbers);
  });
}

export function getNumbersWithStep({
  min = 10,
  max = 100,
  count = 10,
  step = 1
} = {}) {
  return new Promise((res, rej) => {
    let availableMinValue = (max - step * count) / count;
    const numbers = [];
    if (availableMinValue < min) {
      rej(
        `Can't get numbers with step: ${step}. Try to decrease step/min value, or increase max value`
      );
    }
    numbers.push(availableMinValue);
    let value = availableMinValue;
    for (let i = 1; i < count; i++) {
      value += step;
      numbers.push((availableMinValue += value));
      console.log(availableMinValue);
    }
    res(numbers);
  });
}
