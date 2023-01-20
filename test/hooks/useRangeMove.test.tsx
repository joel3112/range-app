import { RefObject } from 'react';
import { act, renderHook } from '@testing-library/react';
import { RangeBulletType } from '@/models/Range';
import { RangeProvider } from '@/contexts/Range.context';
import { useRangeMove } from '@/hooks/useRangeMove';

const mockBarRef = {
  current: {
    getBoundingClientRect: () => ({
      left: 0,
      width: 200
    })
  }
} as RefObject<HTMLDivElement>;

describe('Tests useRangeMove', () => {
  test('returns default positions correctly', async () => {
    const { result } = renderHook(() => useRangeMove(mockBarRef));

    expect(result.current.positions).toEqual([0, 1]);
  });

  test('returns positions correctly in left bullet move', async () => {
    const { result } = renderHook(
      () => useRangeMove(mockBarRef),

      {
        wrapper: ({ children }) => <RangeProvider>{children}</RangeProvider>
      }
    );

    act(() => {
      result.current.handleMove(RangeBulletType.LEFT, 100);
    });

    expect(result.current.positions).toEqual([0.5, 1]);
  });

  test('returns positions correctly in right bullet move', async () => {
    const { result } = renderHook(
      () => useRangeMove(mockBarRef),

      {
        wrapper: ({ children }) => <RangeProvider>{children}</RangeProvider>
      }
    );

    act(() => {
      result.current.handleMove(RangeBulletType.RIGHT, 100);
    });

    expect(result.current.positions).toEqual([0, 0.5]);
  });

  test('returns positions correctly in left bullet cross right bullet', async () => {
    const { result } = renderHook(
      () => useRangeMove(mockBarRef),

      {
        wrapper: ({ children }) => <RangeProvider>{children}</RangeProvider>
      }
    );

    act(() => {
      result.current.handleMove(RangeBulletType.LEFT, 100);
    });

    act(() => {
      result.current.handleMove(RangeBulletType.LEFT, 200);
    });

    expect(result.current.positions).toEqual([1, 1]);
  });
});
