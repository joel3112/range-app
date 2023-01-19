import { IRangeBullets, IRangeValues, RangeBulletType } from '@/models/Range';
import { calculatePercentage, limitValue } from '@/utils/index';

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
