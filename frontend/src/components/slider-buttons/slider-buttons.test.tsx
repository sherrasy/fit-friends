import { render, screen } from '@testing-library/react';
import SliderButtons from './slider-buttons';


describe('Component: SliderButtons', () => {
  it('should render correct', () => {

    render(
      <SliderButtons/>
    );

    const showPreviousButton = screen.getByTestId('slider-show-previous');
    const showNextButton = screen.getByTestId('slider-show-next');

    expect(showPreviousButton).toBeInTheDocument();
    expect(showNextButton).toBeInTheDocument();
  });
});
