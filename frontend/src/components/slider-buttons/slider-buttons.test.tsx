import { render, screen } from '@testing-library/react';
import SliderButtons from './slider-buttons';


describe('Component: SliderButtons', () => {
  it('should render correct', () => {
    const ButtonTestId = {
      Previous:'slider-show-previous',
      Next:'slider-show-next'
    };

    render(
      <SliderButtons/>
    );

    const showPreviousButton = screen.getByTestId(ButtonTestId.Previous);
    const showNextButton = screen.getByTestId(ButtonTestId.Next);

    expect(showPreviousButton).toBeInTheDocument();
    expect(showNextButton).toBeInTheDocument();
  });
});
