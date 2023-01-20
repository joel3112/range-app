import { ChangeEvent, useEffect, useState } from 'react';
import { RangeBulletType } from '@/models/Range';
import { useRange } from '@/contexts/Range.context';
import {
  StyledRangeValueInput,
  StyledRangeValueUnit,
  StyledRangeValue,
  StyledRangeValueLabel
} from '@/styled-components/Range.styled';

export const RangeValue = ({ id }: { id: RangeBulletType }) => {
  const { unit, value, setValue, rangeValues } = useRange();
  const [inputValue, setInputValue] = useState<number>(value[id]);

  useEffect(() => {
    setInputValue(value[id]);
  }, [value, id]);

  const handleBlur = () => {
    setValue(id, inputValue);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(e.target.value));
  };

  return (
    <StyledRangeValue className="range-value">
      <StyledRangeValueLabel className="range-value__label">
        {!rangeValues ? (
          <StyledRangeValueInput
            className="range-value__input"
            type="number"
            aria-label={String(inputValue)}
            value={inputValue}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        ) : (
          <span aria-label={`value-${id}`}>{inputValue}</span>
        )}
      </StyledRangeValueLabel>
      {unit && <StyledRangeValueUnit className="range-value__unit">{unit}</StyledRangeValueUnit>}
    </StyledRangeValue>
  );
};
