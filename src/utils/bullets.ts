import { RangeBulletType } from '@/models/Range';
import { calculatePercentage, limitValue } from '@/utils';

export const checkCurrentBullet = (
  id: RangeBulletType,
  values: [number, number],
  value: number
) => {
  if (id === RangeBulletType.LEFT && value > values[RangeBulletType.RIGHT]) {
    return RangeBulletType.RIGHT;
  }
  if (id === RangeBulletType.RIGHT && value < values[RangeBulletType.LEFT]) {
    return RangeBulletType.LEFT;
  }
  return id;
};

export const initializePositions = (defaultValues: [number, number], min: number, max: number) => {
  if (defaultValues) {
    const [left, right] = defaultValues;

    return [
      calculatePercentage(limitValue(left, min, max), min, max),
      calculatePercentage(limitValue(right, min, max), min, max)
    ] as [number, number];
  }

  return [0, 1] as [number, number];
};
