import { render, screen } from '@testing-library/react';
import ShowMoreButton from './show-more-button';
import { DefaultParam } from '../../utils/constant';


const isVisibleStatus = true;

describe('Component: ShowMoreButton', () => {
  it('should render showMore button if isShowMoreVisible', () => {

    render(
      <ShowMoreButton isReturnVisible={DefaultParam.Status} isShowMoreVisible={isVisibleStatus}/>
    );

    const showMoreButton = screen.getByTestId('show-more');

    expect(showMoreButton).toBeInTheDocument();
  });
  it('should render returnToStart button if isReturnVisible', () => {

    render(
      <ShowMoreButton isReturnVisible={isVisibleStatus} isShowMoreVisible={DefaultParam.Status}/>
    );

    const returnToStartButton = screen.getByTestId('return-to-start');

    expect(returnToStartButton).toBeInTheDocument();
  });
});
