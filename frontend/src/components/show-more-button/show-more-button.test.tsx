import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import ShowMoreButton from './show-more-button';
import { DefaultParam } from '../../utils/constant';


const history = createMemoryHistory();
const isVisibleStatus = true;

describe('Component: ShowMoreButton', () => {
  it('should render showMore button if isShowMoreVisible', () => {

    render(
      <HistoryRouter history={history}>
        <ShowMoreButton isReturnVisible={DefaultParam.Status} isShowMoreVisible={isVisibleStatus}/>
      </HistoryRouter>
    );

    const showMoreButton = screen.getByTestId('show-more');

    expect(showMoreButton).toBeInTheDocument();
  });
  it('should render returnToStart button if isReturnVisible', () => {

    render(
      <HistoryRouter history={history}>
        <ShowMoreButton isReturnVisible={isVisibleStatus} isShowMoreVisible={DefaultParam.Status}/>
      </HistoryRouter>
    );

    const returnToStartButton = screen.getByTestId('return-to-start');

    expect(returnToStartButton).toBeInTheDocument();
  });
});
