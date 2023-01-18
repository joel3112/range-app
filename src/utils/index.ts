import { IRangeBullets, IRangeValues, RangeBulletType } from '@/models/Range';

export const sortedBullets = (bullets: IRangeBullets) => {
  const sortedArray = Object.entries(bullets)
    .sort((a, b) => a[1].value - b[1].value)
    .map(([key, value]) => ({
      id: key as RangeBulletType,
      value: value.value,
      position: value.position
    }));

  return {
    [RangeBulletType.LEFT]: sortedArray[0],
    [RangeBulletType.RIGHT]: sortedArray[1]
  };
};

export const initializeBullet = (defaultValues: IRangeValues, min: number, max: number) => {
  if (defaultValues.left && defaultValues.right) {
    const limitedLeft = limitValue(defaultValues.left, min, max);
    const limitedRight = limitValue(defaultValues.right, min, max);

    return {
      left: {
        value: limitedLeft,
        position: calculatePercentage(limitedLeft, min, max)
      },
      right: {
        value: limitedRight,
        position: calculatePercentage(limitedRight, min, max)
      }
    };
  }

  return {
    left: { value: min, position: 0 },
    right: { value: max, position: 1 }
  };
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
