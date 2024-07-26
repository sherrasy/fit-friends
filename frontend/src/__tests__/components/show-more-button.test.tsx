import { render, screen } from '@testing-library/react';
import ShowMoreButton from '@components/show-more-button/show-more-button';
import { DefaultParam } from '@utils/constant';


const isVisibleStatus = true;

describe('Component: ShowMoreButton', () => {
  it('should render showMore button if isShowMoreVisible', () => {
    const buttonId = 'show-more';
    render(
      <ShowMoreButton isReturnVisible={DefaultParam.Status} isShowMoreVisible={isVisibleStatus}/>
    );

    const showMoreButton = screen.getByTestId(buttonId);

    expect(showMoreButton).toBeInTheDocument();
  });
  it('should render returnToStart button if isReturnVisible', () => {
    const buttonId = 'return-to-start';

    render(
      <ShowMoreButton isReturnVisible={isVisibleStatus} isShowMoreVisible={DefaultParam.Status}/>
    );

    const returnToStartButton = screen.getByTestId(buttonId);

    expect(returnToStartButton).toBeInTheDocument();
  });
});
