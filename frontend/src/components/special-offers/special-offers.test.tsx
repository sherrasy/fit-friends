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
    specialOfferWorkouts: null,
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

  it('component should render slider if there are special offers', () => {
    const storeWithData = mockStore({
      [ReducerName.Workout]: {
        specialOfferWorkouts: fakeWorkouts,
      },
    });
    const sliderId = 'slider';
    render(
      <Provider store={storeWithData}>
        <HistoryRouter history={history}>
          <SpecialOffers />
        </HistoryRouter>
      </Provider>
    );
    const sliderElement = screen.getByTestId(sliderId);

    expect(sliderElement).toBeInTheDocument();
  });
  it('component should render advertisement if there are no special offers', () => {
    const advertisementId = 'advertisement-thumbnail';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SpecialOffers />
        </HistoryRouter>
      </Provider>
    );
    const advertisementElement = screen.getByTestId(advertisementId);

    expect(advertisementElement).toBeInTheDocument();
  });
});
