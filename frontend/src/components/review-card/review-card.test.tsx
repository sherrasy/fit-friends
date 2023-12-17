import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeReview } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import ReviewCard from './review-card';

const mockStore = configureMockStore();
const fakeReview = makeFakeReview();
const history = createMemoryHistory();
const store = mockStore();

describe('Component: ReviewCard', () => {

  it('component should render correctly', () => {
    const reviewCardId = 'review-card';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewCard review={fakeReview}/>
        </HistoryRouter>
      </Provider>
    );
    const reviewCardElement = screen.getByTestId(reviewCardId);
    const reviewTextElement = screen.getByText(fakeReview.message);

    expect(reviewCardElement).toBeInTheDocument();
    expect(reviewTextElement).toBeInTheDocument();
  });
});
