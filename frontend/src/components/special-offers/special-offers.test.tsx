import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { ReducerName } from '../../utils/constant';
import { makeFakeWorkouts } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import SpecialOffers from './special-offers';

const mockStore = configureMockStore();
const fakeWorkouts = makeFakeWorkouts();
const history = createMemoryHistory();
const store = mockStore({
  [ReducerName.Workout]: {
    specialOfferWorkouts: fakeWorkouts,
  },
});
describe('Component: SpecialOffers', () => {

  it('component should render correctly', () => {
    const specialOffersBlockId = 'special-offers';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SpecialOffers />
        </HistoryRouter>
      </Provider>
    );
    const specialOffersElement = screen.getByTestId(specialOffersBlockId);

    expect(specialOffersElement).toBeInTheDocument();
  });
});
