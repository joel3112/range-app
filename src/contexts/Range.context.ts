import { createContext } from 'react';
import { IRange } from '@/models/Range';

export const MIN_DEFAULT = 0;
export const MAX_DEFAULT = 100;

export const RangeContext = createContext<IRange>({
  min: MIN_DEFAULT,
  max: MAX_DEFAULT,
  defaultValue: [MIN_DEFAULT, MAX_DEFAULT],
  unit: '€'
});
