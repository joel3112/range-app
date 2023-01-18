import { styled } from '@stitches/react';

// RangeSlider

export const StyledSlider = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 30
});

export const StyledRangeBar = styled('div', {
  position: 'relative',
  background: 'var(--color-text)',
  width: 400,
  height: 6,
  borderRadius: 5
});

export const StyledRangeBarProgress = styled('div', {
  position: 'absolute',
  background: 'var(--color-primary)',
  opacity: 0.7,
  height: '100%',
  borderRadius: 5
});

// RangeBullet

export const StyledRangeBullet = styled('div', {
  $$bulletSize: '22px',
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',
  width: '$$bulletSize',
  height: '$$bulletSize',
  borderRadius: '50%',
  border: '4px solid var(--color-primary)',
  background: 'var(--color-background)',
  zIndex: 1,
  top: '50%',
  transform: 'translate(-50%, -50%)',
  transition: 'width 0.2s ease-in-out, height 0.2s ease-in-out',

  variants: {
    isDragging: {
      true: { cursor: 'grabbing', $$bulletSize: '26px' },
      false: {
        '&:hover': { cursor: 'grab', $$bulletSize: '26px' }
      }
    }
  }
});

// RangeValue

export const StyledRangeValue = styled('div', {
  display: 'flex',
  gap: 1
});

export const StyledRangeValueLabel = styled('span', {
  fontSize: '1.3rem',
  with: 'fit-content',
  position: 'relative'
});

export const StyledRangeValueInput = styled('input', {
  position: 'absolute',
  top: 0,
  left: 0,
  fontSize: '1.3rem',
  borderBottom: '3px solid transparent',
  background: 'transparent',
  color: 'var(--color-text)',
  width: '100%',

  '&:focus': { borderColor: 'var(--color-primary)' }
});

export const StyledRangeValueUnit = styled('span', {
  fontSize: '1.3rem',
  marginLeft: 5
});
