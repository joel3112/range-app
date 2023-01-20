import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { IRange, IRangeContext, IRangeProvider, RangeBulletType } from '@/models/Range';
import { arrayUpdate, limitValue } from '@/utils';

export const MIN_DEFAULT = 0;
export const MAX_DEFAULT = 100;

const RangeContext = createContext<IRangeContext>({} as IRangeContext);

export const useRange = () => useContext(RangeContext);

const prepareDefaultValues = ({
  defaultValue,
  min,
  max,
  rangeValues
}: Pick<IRange, 'min' | 'max' | 'defaultValue' | 'rangeValues'>) => {
  const defaultMin = rangeValues ? Math.min(...rangeValues) : min || MIN_DEFAULT;
  const defaultMax = rangeValues ? Math.max(...rangeValues) : max || MAX_DEFAULT;
  const initialValues = defaultValue
    ? [
        limitValue(defaultValue[0], defaultMin, defaultMax),
        limitValue(defaultValue[1], defaultMin, defaultMax)
      ]
    : [defaultMin, defaultMax];

  return {
    min: defaultMin,
    max: defaultMax,
    defaultValue: initialValues as [number, number]
  };
};

export const RangeProvider = (props: IRangeProvider) => {
  const { children, unit = '', rangeValues, ...restProps } = props;
  const { min, max, defaultValue } = useMemo(
    () => prepareDefaultValues({ ...restProps, rangeValues }),
    [restProps, rangeValues]
  );
  const [value, setValue] = useState<[number, number]>(defaultValue);

  useEffect(() => {
    if (props.onChange) {
      props.onChange(value);
    }
  }, [value]);

  const handleChangeValue = (id: RangeBulletType, newValue: number) => {
    if (rangeValues) {
      setValue((prev) => {
        return arrayUpdate(prev, id, newValue) as [number, number];
      });
      return;
    }

    let limitedValue = limitValue(newValue, min, max);
    if (id === RangeBulletType.LEFT && limitedValue >= value[RangeBulletType.RIGHT]) {
      limitedValue = value[RangeBulletType.RIGHT];
    }
    if (id === RangeBulletType.RIGHT && limitedValue <= value[RangeBulletType.LEFT]) {
      limitedValue = value[RangeBulletType.LEFT];
    }

    setValue((prev) => {
      return arrayUpdate(prev, id, limitedValue) as [number, number];
    });
  };

  return (
    <RangeContext.Provider
      value={{
        unit,
        min,
        max,
        defaultValue,
        rangeValues,
        value,
        setValue: handleChangeValue
      }}>
      {children}
    </RangeContext.Provider>
  );
};
