import { useContext, useMemo } from 'react';
import { RangeBulletType } from '@/models/Range';
import { RangeContext } from '@/contexts/Range.context';
import { limitValue } from '@/utils';

export const useRange = () => {
  const { defaultValue, min, max, unit } = useContext(RangeContext);

  const initialRange = useMemo(() => {
    return {
      [RangeBulletType.LEFT]: defaultValue ? limitValue(defaultValue[0], min, max) : min,
      [RangeBulletType.RIGHT]: defaultValue ? limitValue(defaultValue[1], min, max) : max
    };
  }, [defaultValue, min, max]);

  return {
    unit,
    min,
    max,
    defaultValues: initialRange
  };
};
