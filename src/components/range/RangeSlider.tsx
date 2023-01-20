import { useRef } from 'react';
import { RangeBulletType } from '@/models/Range';
import { useRange } from '@/contexts/Range.context';
import { useRangeMove } from '@/hooks/useRangeMove';
import { RangeBullet } from '@/components/range/RangeBullet';
import { RangeValue } from '@/components/range/RangeValue';
import { markedValuesPosition } from '@/utils';
import {
  StyledBarMark,
  StyledRangeBar,
  StyledRangeBarProgress,
  StyledSlider
} from '@/styled-components/Range.styled';

export const RangeSlider = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const { min, max, value, rangeValues = [] } = useRange();
  const { positions, handleMove } = useRangeMove(barRef);
  const [leftPosition, rightPosition] = positions;

  return (
    <StyledSlider className="range-slider">
      <RangeValue id={RangeBulletType.LEFT} />

      <StyledRangeBar className="range-bar" ref={barRef}>
        {value.map((value, index) => (
          <RangeBullet
            key={index}
            id={index}
            style={{ left: `${positions[index] * 100}%` }}
            onMove={handleMove}
          />
        ))}
        <StyledRangeBarProgress
          style={{
            width: `${(rightPosition - leftPosition) * 100}%`,
            left: `${leftPosition * 100}%`
          }}
          className="range-bar__progress"
        />

        {markedValuesPosition(rangeValues, min, max).map((position, index) => (
          <StyledBarMark
            key={index}
            style={{
              left: `${position * 100}%`
            }}
            className="range-bar__mark"
          />
        ))}
      </StyledRangeBar>

      <RangeValue id={RangeBulletType.RIGHT} />
    </StyledSlider>
  );
};
