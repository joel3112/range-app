import { useRef } from 'react';
import { RangeBulletType } from '@/models/Range';
import { useRangeMove } from '@/hooks/useRangeMove';
import { RangeBullet } from '@/components/range/RangeBullet';
import { RangeValue } from '@/components/range/RangeValue';
import {
  StyledRangeBar,
  StyledRangeBarProgress,
  StyledSlider
} from '@/styled-components/Range.styled';

export const RangeSlider = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const { values, handleMove, handleChangeValue } = useRangeMove(barRef);
  const { [RangeBulletType.LEFT]: bulletLeft, [RangeBulletType.RIGHT]: bulletRight } = values;

  return (
    <StyledSlider className="range-slider">
      <RangeValue id={RangeBulletType.LEFT} value={values.left.value} onBlur={handleChangeValue} />

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
      </StyledRangeBar>

      <RangeValue
        id={RangeBulletType.RIGHT}
        value={values.right.value}
        onBlur={handleChangeValue}
      />
    </StyledSlider>
  );
};
