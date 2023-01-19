export interface IRange {
  min?: number;
  max?: number;
  rangeValues?: number[]
  defaultValue?: [number, number];
  unit: string;
}

export enum RangeBulletType {
  LEFT = 'left',
  RIGHT = 'right'
}

export interface IRangeBullet {
  id: RangeBulletType;
  onMove?: (id: RangeBulletType, positionX: number) => void;
}

export interface IRangeBullets {
  left: { value: number; position: number };
  right: { value: number; position: number };
}

export interface IRangeValues {
  left?: number;
  right?: number;
}
