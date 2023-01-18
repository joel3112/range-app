import { ChangeEvent, useEffect, useState } from 'react';
import { RangeBulletType } from '@/models/Range';
import { useRange } from '@/hooks/useRange';
import {
  StyledRangeValueInput,
  StyledRangeValueUnit,
  StyledRangeValue,
  StyledRangeValueLabel
} from '@/styled-components/Range.styled';

export const RangeValue = ({
  id,
  value,
  onBlur
}: {
  id: RangeBulletType;
  value: number;
  onBlur: (id: RangeBulletType, value: number) => void;
}) => {
  const { unit } = useRange();
  const [inputValue, setInputValue] = useState<number>(() => value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleBlur = () => {
    onBlur(id, inputValue);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(e.target.value));
  };

  return (
    <StyledRangeValue className="range-value">
      <StyledRangeValueLabel className="range-value__label">
        {inputValue}
        <StyledRangeValueInput
          className="range-value__input"
          type="number"
          value={inputValue}
          // readOnly={!editable}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </StyledRangeValueLabel>
      <StyledRangeValueUnit className="range-value__unit">{unit}</StyledRangeValueUnit>
    </StyledRangeValue>
  );
};
