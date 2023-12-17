import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { ReducerName } from '../../utils/constant';
import { makeFakeWorkouts } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import WorkoutsForUser from './workouts-for-user';

const mockStore = configureMockStore();
const fakeWorkouts = makeFakeWorkouts();
const history = createMemoryHistory();
const store = mockStore({
  [ReducerName.Workout]: {
    specialUserWorkouts: null,
  },
});
describe('Component: WorkoutsForUser', () => {

  it('component should render correctly', () => {
    const specialBlockId = 'special-for-you';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <WorkoutsForUser />
        </HistoryRouter>
      </Provider>
    );
    const specialElement = screen.getByTestId(specialBlockId);

    expect(specialElement).toBeInTheDocument();
  });

  it('component should render slider if there are special offers for user', () => {
    const storeWithData = mockStore({
      [ReducerName.Workout]: {
        specialUserWorkouts: fakeWorkouts,
      },
    });
    const sliderId = 'slider';
    render(
      <Provider store={storeWithData}>
        <HistoryRouter history={history}>
          <WorkoutsForUser />
        </HistoryRouter>
      </Provider>
    );
    const sliderElement = screen.getByTestId(sliderId);

    expect(sliderElement).toBeInTheDocument();
  });
  it('component should render advertisement if there are no special offers for user', () => {
    const advertisementId = 'advertisement-thumbnail';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <WorkoutsForUser />
        </HistoryRouter>
      </Provider>
    );
    const advertisementElement = screen.getByTestId(advertisementId);

    expect(advertisementElement).toBeInTheDocument();
  });
});
