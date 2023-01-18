import { IRange } from '@/models/Range';
import { RangeContext } from '@/contexts/Range.context';
import { RangeSlider } from '@/components/range/RangeSlider';

export const Range = (props: IRange) => {
  return (
    <RangeContext.Provider value={{ ...props }}>
      <div className="range">
        <RangeSlider />
      </div>
    </RangeContext.Provider>
  );
};
