import { useRef } from 'react';
import { RangeBulletType } from '@/models/Range';
import { useRangeMove } from '@/hooks/useRangeMove';
import { RangeBullet } from '@/components/range/RangeBullet';
import { RangeValue } from '@/components/range/RangeValue';
import {
  StyledBarMark,
  StyledRangeBar,
  StyledRangeBarProgress,
  StyledSlider
} from '@/styled-components/Range.styled';

export const RangeSlider = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const { values, markedValuesPosition, handleMove, handleChangeValue } = useRangeMove(barRef);
  const { [RangeBulletType.LEFT]: bulletLeft, [RangeBulletType.RIGHT]: bulletRight } = values;

  return (
    <StyledSlider className="range-slider">
      <RangeValue id={RangeBulletType.LEFT} value={bulletLeft.value} onBlur={handleChangeValue} />

      <StyledRangeBar className="range-bar" ref={barRef}>
        {Object.entries(values).map(([id, { position }]) => (
          <RangeBullet
            key={id}
            id={id as RangeBulletType}
            style={{ left: `${position * 100}%` }}
            onMove={handleMove}
          />
        ))}
        <StyledRangeBarProgress
          style={{
            width: `${(bulletRight.position - bulletLeft.position) * 100}%`,
            left: `${bulletLeft.position * 100}%`
          }}
          className="range-bar__progress"
        />

        {markedValuesPosition.map((position, index) => (
          <StyledBarMark
            key={index}
            style={{
              left: `${position * 100}%`
            }}
            className="range-bar__mark"
          />
        ))}
      </StyledRangeBar>

      <RangeValue id={RangeBulletType.RIGHT} value={bulletRight.value} onBlur={handleChangeValue} />
    </StyledSlider>
  );
};
