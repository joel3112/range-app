import { renderHook, waitFor } from '@testing-library/react';
import { useFetchData } from '../../src/hooks/useFetchData';

const mockData = 'data';
jest.mock('@/services', () => ({
  ...jest.requireActual('@/services'),
  fetchData: () => Promise.resolve(mockData)
}));

describe('Tests useFetchData', () => {
  test('returns data correctly', async () => {
    const { result } = renderHook(() => useFetchData<string>('/api/test'));

    await waitFor(() => {
      expect(result.current.data).toBe(mockData);
    });
  });

  test('returns loading correctly', async () => {
    const { result } = renderHook(() => useFetchData<string>('/api/test'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });
});
