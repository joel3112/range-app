export const arrayUpdate = (array: number[], index: number, value: number) => {
  const newArray = [...array];
  newArray[index] = value;
  return newArray;
};

export const limitValue = (value: number, min: number, max: number) => {
  if (!value) {
    return min;
  }
  return limitTwoDecimalPlaces(Math.min(Math.max(value, min), max));
};

export const limitTwoDecimalPlaces = (value: number) => {
  return Math.round(value * 100) / 100;
};

export const calculatePercentage = (value: number, min: number, max: number) => {
  if (!value) {
    return 0;
  }
  return (value - min) / (max - min);
};

export const inRange = (value: number, [min, max]: number[]) => {
  return value >= min && value <= max;
};

export const getClosestValue = (values: number[], value: number, direction: number) => {
  if (direction > 0) {
    return values.filter((v) => v < value).sort((a, b) => b - a)[0];
  }
  return values.filter((v) => v > value).sort((a, b) => a - b)[0];
};

export const markedValuesPosition = (values: number[], min: number, max: number) => {
  if (values) {
    return values
      .filter((value) => value > values[0] && value < values[values.length - 1])
      .map((value) => {
        return calculatePercentage(value, min, max);
      });
  }

  return [];
};
