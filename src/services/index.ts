export const NORMAL_RANGE_URL = 'https://demo6728712.mockable.io/normal-range';

export const FIXED_RANGE_URL = 'https://demo6728712.mockable.io/fixed-range';

export const fetchData = async (url: string) => {
  const response = await fetch(url);
  return await response.json();
};
