import { useContext, useMemo } from 'react';
import { RangeBulletType } from '@/models/Range';
import { MAX_DEFAULT, MIN_DEFAULT, RangeContext } from '@/contexts/Range.context';
import { limitValue } from '@/utils';

export const useRange = () => {
  const { defaultValue, min, max, rangeValues, unit } = useContext(RangeContext);

  const { defaultMin, defaultMax } = useMemo(() => {
    if (rangeValues) {
      return {
        defaultMin: Math.min(...rangeValues),
        defaultMax: Math.max(...rangeValues)
      };
    }

    return {
      defaultMin: min || MIN_DEFAULT,
      defaultMax: max || MAX_DEFAULT
    };
  }, [rangeValues, min, max]);

  const initialRange = useMemo(() => {
    return {
      [RangeBulletType.LEFT]: defaultValue
        ? limitValue(defaultValue[0], defaultMin, defaultMax)
        : defaultMin,
      [RangeBulletType.RIGHT]: defaultValue
        ? limitValue(defaultValue[1], defaultMin, defaultMax)
        : defaultMax
    };
  }, [defaultValue, defaultMin, defaultMax]);

  return {
    unit,
    min: defaultMin,
    max: defaultMax,
    defaultValues: initialRange,
    rangeValues
  };
};
