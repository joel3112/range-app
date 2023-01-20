import { act, fireEvent, renderHook } from '@testing-library/react';
import { RangeBulletType } from '@/models/Range';
import { useRangeBullet } from '@/hooks/useRangeBullet';

const onMoveMock = jest.fn();

describe('Tests useRangeBullet', () => {
  test('returns isDragging correctly', async () => {
    const { result } = renderHook(() => useRangeBullet(RangeBulletType.LEFT, onMoveMock));

    expect(result.current.isDragging).toBe(false);

    act(() => {
      result.current.handleStart();
    });

    expect(result.current.isDragging).toBe(true);

    act(() => {
      result.current.handleEnd();
    });

    expect(result.current.isDragging).toBe(false);
  });

  test('calls onMove correctly', async () => {
    const { result } = renderHook(() => useRangeBullet(RangeBulletType.LEFT, onMoveMock));

    act(() => {
      result.current.handleStart();
    });

    fireEvent.mouseMove(document, { clientX: 100 });

    expect(onMoveMock).toBeCalledWith(RangeBulletType.LEFT, 100);
  });
});
