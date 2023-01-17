import { useEffect, useRef, useState } from 'react';
import {
  StyledRangeValueInput,
  StyledRangeValueUnit,
  StyledRangeValue,
  StyledRangeValueLabel
} from './Range.styled';

export type RangeValueProps = {
  value: number;
  unit: string;
  editable?: boolean;
  onChange?: (value: number) => void;
};

export const RangeValue = ({ value, unit, editable, onChange }: RangeValueProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<number>(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleBlur = () => {
    onChange && onChange(inputValue);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(e.target.value));
  };

  return (
    <StyledRangeValue className="range-value">
      <StyledRangeValueLabel className="range-value__label">
        {inputValue}
        <StyledRangeValueInput
          className="range-value__input"
          ref={inputRef}
          type="number"
          value={inputValue}
          readOnly={!editable}
          onChange={handleInput}
          onBlur={handleBlur}
        />
      </StyledRangeValueLabel>
      <StyledRangeValueUnit className="range-value__unit">{unit}</StyledRangeValueUnit>
    </StyledRangeValue>
  );
};
