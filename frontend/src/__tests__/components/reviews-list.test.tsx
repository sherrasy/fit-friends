import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeReview } from '@utils/mocks';
import HistoryRouter from '@components/history-router/history-router';
import ReviewsList from '@components/reviews-list/reviews-list';
import { DefaultParam, ReducerName } from '@utils/constant';

const mockStore = configureMockStore();
const fakeReview = makeFakeReview();
const history = createMemoryHistory();
const store = mockStore({
  [ReducerName.User]: {
    userListData: null,
  }
},);

describe('Component: ReviewsList', () => {

  it('component should render correctly', () => {
    const reviewCardId = 'review-card';
    const listTitle = 'Отзывы';
    const buttonName = 'Оставить отзыв';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewsList reviews={[fakeReview]} isAddReviewActive={DefaultParam.Status}/>
        </HistoryRouter>
      </Provider>
    );
    const reviewsListElement = screen.getByText(listTitle);
    const reviewCardElement = screen.getByTestId(reviewCardId);
    const reviewButtonElement = screen.getByText(buttonName);

    expect(reviewsListElement).toBeInTheDocument();
    expect(reviewCardElement).toBeInTheDocument();
    expect(reviewButtonElement).toBeInTheDocument();
  });
});
