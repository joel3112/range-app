import { RefObject, useEffect, useState } from 'react';
import { RangeBulletType } from '@/models/Range';
import { useRange } from '@/contexts/Range.context';
import { checkCurrentBullet, initializePositions } from '@/utils/bullets';
import { getClosestValue, limitValue } from '@/utils';

export const useRangeMove = (barRef: RefObject<HTMLDivElement>) => {
  const { min, max, rangeValues, value, setValue } = useRange();
  const [positions, setPositions] = useState<[number, number]>(() =>
    initializePositions(value, min, max)
  );

  useEffect(() => {
    if (value) {
      setPositions(initializePositions(value, min, max));
    }
  }, [value, min, max]);

  const handleMove = (id: RangeBulletType, positionX: number) => {
    if (barRef && barRef.current) {
      const { left, width } = barRef.current.getBoundingClientRect() as DOMRect;
      const positionPercentage = (positionX - left) / width;
      const valuePercentage = Math.round(positionPercentage * (max - min)) + min;

      let newValue;
      if (rangeValues) {
        const closestValue = getClosestValue(
          rangeValues,
          valuePercentage,
          id === RangeBulletType.LEFT ? 1 : -1
        );
        newValue = closestValue || valuePercentage;
      } else {
        newValue = limitValue(valuePercentage, min, max);
      }
      const index = value ? checkCurrentBullet(id, value, newValue) : id;
      setValue && setValue(index, newValue);
    }
  };

  return {
    positions,
    handleMove
  };
};
