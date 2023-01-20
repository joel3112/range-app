import { IRange } from '@/models/Range';
import { RangeProvider } from '@/contexts/Range.context';
import { RangeSlider } from '@/components/range/RangeSlider';

export const Range = (props: IRange) => {
  return (
    <RangeProvider {...props}>
      <div className="range">
        <RangeSlider />
      </div>
    </RangeProvider>
  );
};
