import { useEffect, useRef, useState } from 'react';
import { StyledRangeBar, StyledRangeBullet, StyledRangeBulletTooltip } from './Range.styled';

type RangeSliderProps = {
  min: number;
  max: number;
  value?: number;
};


export const RangeSlider = ({ min, max, value }: RangeSliderProps) => {
  const barRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [bulletPosition, setBulletPosition] = useState<number>(0);
  const [bulletValue, setBulletValue] = useState<number | undefined>(value || min);

  useEffect(() => {
    const valuePercentage = ((value || min) - min) / (max - min);
    setBulletPosition(valuePercentage * 100);
  }, [value]);

  const handleMove = (e: MouseEvent) => {
    // const barElement = barRef.current as HTMLDivElement;
    // const baseBarPosition = barElement.getBoundingClientRect().left;
    // const barWidth = barElement.offsetWidth;
    // const positionPercentage = barWidth ? ((e.clientX - baseBarPosition!) / barWidth) * 100 : 0;
    //
    // const totalSteps = Math.abs(max - min);
    // const stepPercentage = 100 / totalSteps;
    // const step = positionPercentage / stepPercentage;
    // // Limit step to min and max values
    // const limitedStep = Math.min(Math.max(step, 0), totalSteps);
    // // Round to two decimals
    // setBulletValue(Math.round(limitedStep * 100) / 100);
    //
    // if (step >= min && step <= max) {
    //   setBulletPosition(positionPercentage);
    // }

    if (barRef.current) {
      const { left, width } = barRef.current.getBoundingClientRect();
      const valuePercentage = (e.clientX - left) / width;
      const newValue = Math.round((max - min) * valuePercentage + min);
      const limitedNewValue = Math.min(Math.max(newValue, min), max);
      setBulletValue(limitedNewValue);

      if (newValue >= min && newValue <= max) {
        setBulletPosition(valuePercentage * 100);
      }
    }
  };

  const handleStart = () => {
    setIsDragging(true);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
  };

  const handleEnd = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleEnd);
  };

  return (
    <StyledRangeBar className="range-bar" ref={barRef}>
      <StyledRangeBullet
        className="range-bar__bullet"
        isDragging={isDragging}
        css={{
          left: `${bulletPosition}%`
        }}
        onMouseDown={handleStart}>
        <StyledRangeBulletTooltip className="range-bar__bullet-tooltip" isDragging={isDragging}>
          {bulletValue}
        </StyledRangeBulletTooltip>
      </StyledRangeBullet>
    </StyledRangeBar>
  );
};
