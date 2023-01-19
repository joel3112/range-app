import { useState } from 'react';
import { IRangeBullet, RangeBulletType } from '@/models/Range';

export const useRangeBullet = (id: RangeBulletType, onMove: IRangeBullet['onMove']) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleStart = () => {
    setIsDragging(true);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);
  };

  const handleEnd = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('mouseup', handleEnd);
    document.removeEventListener('touchend', handleEnd);
  };

  const handleMove = (e: MouseEvent | TouchEvent) => {
    const x = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    onMove && onMove(id, x);
  };

  return {
    isDragging,
    handleStart,
    handleEnd
  };
};
