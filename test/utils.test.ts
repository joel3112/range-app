import {
  arrayUpdate,
  calculatePercentage,
  getClosestValue,
  inRange,
  limitTwoDecimalPlaces,
  limitValue,
  markedValuesPosition
} from '@/utils';

describe('Tests utils', () => {
  describe('arrayUpdate', () => {
    it('should return an updated array', () => {
      const array = [1, 2, 3];
      const index = 1;
      const value = 4;
      const expected = [1, 4, 3];
      const result = arrayUpdate(array, index, value);
      expect(result).toEqual(expected);
    });
  });

  describe('limitValue', () => {
    it('should return min if value is less than min', () => {
      expect(limitValue(0, 10, 100)).toEqual(10);
    });
    it('should return max if value is greater than max', () => {
      expect(limitValue(1000, 10, 100)).toEqual(100);
    });
    it('should return value if value is between min and max', () => {
      expect(limitValue(50, 10, 100)).toEqual(50);
    });
  });

  describe('limitTwoDecimalPlaces', () => {
    it('should return value with two decimal places', () => {
      expect(limitTwoDecimalPlaces(50.123456)).toEqual(50.12);
    });
  });

  describe('calculatePercentage', () => {
    it('should return percentage', () => {
      expect(calculatePercentage(50, 0, 100)).toEqual(0.5);
    });

    it('should return 0 if value is not defined', () => {
      expect(calculatePercentage(null as unknown as number, 10, 100)).toEqual(0);
    });
  });

  describe('inRange', () => {
    it('should return true if value is in range', () => {
      expect(inRange(50, [10, 100])).toEqual(true);
    });

    it('should return false if value is not in range', () => {
      expect(inRange(50, [10, 40])).toEqual(false);
    });
  });

  describe('getClosestValue', () => {
    it('should return closest value to the left', () => {
      expect(getClosestValue([10, 20, 30, 40, 50], 35, 1)).toEqual(30);
    });
    it('should return closest value to the right', () => {
      expect(getClosestValue([10, 20, 30, 40, 50], 35, -1)).toEqual(40);
    });
  });

  describe('markedValuesPosition', () => {
    it('should return marked values position', () => {
      expect(markedValuesPosition([10, 20, 30, 40, 50], 10, 50)).toEqual([0.25, 0.5, 0.75]);
    });
  });
});
