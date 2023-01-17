import { RangeValue } from './RangeValue';
import { RangeSlider } from './RangeSlider';
import { StyledRange } from './Range.styled';

type RangeProps = {
  min: number;
  max: number;
  value?: number;
};

export const Range = ({ min, max, value }: RangeProps) => {
  return (
    <StyledRange className="range">
      <RangeValue value={min} unit="€" editable onChange={(e) => console.log(e)} />
      <RangeSlider min={min} max={max} value={value} />
      <RangeValue value={max} unit="€" editable onChange={(e) => console.log(e)} />
    </StyledRange>
  );
};
