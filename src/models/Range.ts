import { ReactNode } from 'react';

export interface IRange {
  min?: number;
  max?: number;
  rangeValues?: number[];
  defaultValue?: [number, number];
  unit?: string;
  onChange?: (value: [number, number]) => void;
}

export interface IRangeContext extends Required<Omit<IRange, 'rangeValues' | 'onChange'>> {
  rangeValues?: number[];
  value: [number, number];
  setValue: (id: RangeBulletType, value: number) => void;
}

export interface IRangeProvider extends IRange {
  children: ReactNode;
}

export enum RangeBulletType {
  LEFT = 0,
  RIGHT = 1
}

export interface IRangeBullet {
  id: RangeBulletType;
  onMove?: (id: RangeBulletType, positionX: number) => void;
}
