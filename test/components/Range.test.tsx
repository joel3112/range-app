import { act, fireEvent, render, screen } from '@testing-library/react';
import { Range } from '@/components/range/Range';

describe('Tests for Range component', () => {
  it('should render Range component', () => {
    const { container } = render(<Range />);

    expect(container).toBeDefined();
  });

  describe('Normal Range', () => {
    it('should render default label values', () => {
      render(<Range unit="€" />);

      expect(screen.getByLabelText('0')).toBeInTheDocument();
      expect(screen.getByLabelText('100')).toBeInTheDocument();
      expect(screen.getAllByText('€')).toHaveLength(2);
    });

    it('should render custom label values', () => {
      render(<Range unit="€" min={10} max={1000} />);

      expect(screen.getByLabelText('10')).toBeInTheDocument();
      expect(screen.getByLabelText('1000')).toBeInTheDocument();
    });

    it('should render custom label values with default values', () => {
      render(<Range unit="€" min={10} max={1000} defaultValue={[100, 500]} />);

      expect(screen.getByLabelText('100')).toBeInTheDocument();
      expect(screen.getByLabelText('500')).toBeInTheDocument();
    });

    it('should render updated label values after move bullet', () => {
      render(<Range unit="€" min={10} max={1000} />);

      act(() => {
        const leftBullet = screen.getByLabelText('bullet-0');
        fireEvent.mouseDown(leftBullet);
        fireEvent.mouseMove(document, { clientX: 100 });
        fireEvent.mouseUp(document);
      });

      expect(screen.getAllByLabelText('1000')).toHaveLength(2);
    });

    it('should render updated label values after edit input', () => {
      render(<Range unit="€" min={10} max={1000} />);

      act(() => {
        const leftInput = screen.getByLabelText('10');
        fireEvent.change(leftInput, { target: { value: '500' } });
      });

      expect(screen.getByLabelText('500')).toBeInTheDocument();
    });

    it("should render updated label values after edit input don't cross", () => {
      render(<Range unit="€" min={10} max={1000} defaultValue={[100, 500]} />);

      act(() => {
        const leftInput = screen.getByLabelText('100');
        fireEvent.change(leftInput, { target: { value: '800' } });
        fireEvent.blur(leftInput);
      });

      expect(screen.getAllByLabelText('500')).toHaveLength(2);
    });

    it('should dispatch onChange event', () => {
      const onChange = jest.fn();
      render(<Range min={10} max={1000} onChange={onChange} />);

      act(() => {
        const leftInput = screen.getByLabelText('10');
        fireEvent.change(leftInput, { target: { value: '500' } });
        fireEvent.blur(leftInput);
      });

      expect(onChange).toBeCalledWith([500, 1000]);
    });
  });

  describe('Fixed values Range', () => {
    it('should render label values', () => {
      render(<Range unit="€" rangeValues={[10, 20, 30, 40, 50]} />);

      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument();
      expect(screen.getAllByText('€')).toHaveLength(2);
    });

    it('should render updated label values after move bullet', () => {
      render(<Range unit="€" rangeValues={[10, 20, 30, 40, 50]} />);

      act(() => {
        const leftBullet = screen.getByLabelText('bullet-0');
        fireEvent.mouseDown(leftBullet);
        fireEvent.mouseMove(document, { clientX: 100 });
        fireEvent.mouseUp(document);
      });

      expect(screen.getAllByText('50')).toHaveLength(2);
    });
  });
});
