import { IRange } from '@/models/Range';
import { RangeProvider } from '@/contexts/Range.context';
import { RangeSlider } from '@/components/range/RangeSlider';

// TODO: Add styles 22233
export const Range = (props: IRange) => {
  return (
    <RangeProvider {...props}>
      <div className="range">
        <RangeSlider />
      </div>
    </RangeProvider>
  );
};

export const Range2 = (props: IRange) => {
  return (
    <RangeProvider {...props}>
      <div className="range">
        <RangeSlider />
      </div>
    </RangeProvider>
  );
};
