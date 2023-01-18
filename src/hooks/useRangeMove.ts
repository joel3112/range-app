import { RefObject, useEffect, useState } from 'react';
import { IRangeBullets, RangeBulletType } from '@/models/Range';
import { useRange } from '@/hooks/useRange';
import { calculatePercentage, initializeBullet, inRange, limitValue, sortedBullets } from '@/utils';

export const useRangeMove = (barRef: RefObject<HTMLDivElement>) => {
  const { min, max, defaultValues } = useRange();
  const [bullets, setBullets] = useState<IRangeBullets>(() =>
    initializeBullet(defaultValues, min, max)
  );

  useEffect(() => {
    if (defaultValues.left && defaultValues.right) {
      setBullets(initializeBullet(defaultValues, min, max));
    }
  }, [defaultValues, min, max]);

  const handleMove = (id: RangeBulletType, positionX: number) => {
    if (barRef && barRef.current) {
      const { left, width } = barRef.current.getBoundingClientRect() as DOMRect;
      const valuePercentage = (positionX - left) / width;
      const newValue = Math.round(valuePercentage * (max - min)) + min;

      setBullets((prev) => ({
        ...prev,
        [id]: { ...prev[id], value: limitValue(newValue, min, max) }
      }));

      if (inRange(newValue, [min, max])) {
        setBullets((prev) => ({
          ...prev,
          [id]: { ...prev[id], position: valuePercentage }
        }));
      }
    }
  };

  const handleChangeValue = (id: RangeBulletType, value: number) => {
    const limitedValue = limitValue(value, min, max);

    setBullets((prev) => ({
      ...prev,
      [id]: { value: limitedValue, position: calculatePercentage(limitedValue, min, max) }
    }));
  };

  return {
    values: sortedBullets(bullets),
    handleMove,
    handleChangeValue
  };
};
