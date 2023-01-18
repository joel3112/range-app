import { CSSProperties } from 'react';
import { IRangeBullet } from '@/models/Range';
import { useRangeBullet } from '@/hooks/useRangeBullet';
import { StyledRangeBullet } from '@/styled-components/Range.styled';

export type RangeBulletProps = IRangeBullet & {
  style?: CSSProperties;
};

export const RangeBullet = ({ style, id, onMove }: RangeBulletProps) => {
  const { isDragging, handleStart } = useRangeBullet(id, onMove);

  return (
    <StyledRangeBullet
      className="range-bar__bullet"
      isDragging={isDragging}
      css={{
        ...style
      }}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
    />
  );
};
