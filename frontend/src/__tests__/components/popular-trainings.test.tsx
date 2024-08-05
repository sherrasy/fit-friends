import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { ReducerName } from '@utils/constant';
import { makeFakeWorkouts } from '@utils/mocks';
import HistoryRouter from '@components/history-router/history-router';
import PopularTrainings from '@components/popular-trainings/popular-trainings';

const mockStore = configureMockStore();
const fakeWorkouts = makeFakeWorkouts();
const history = createMemoryHistory();
const store = mockStore({
  [ReducerName.Workout]: {
    popularWorkouts: null,
  },
});
describe('Component: PopularTrainings', () => {

  it('component should render correctly', () => {
    const popularBlockId = 'popular-trainings';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PopularTrainings />
        </HistoryRouter>
      </Provider>
    );
    const popularElement = screen.getByTestId(popularBlockId);

    expect(popularElement).toBeInTheDocument();
  });
  it('component should render slider if there are popular trainings', () => {
    const storeWithData = mockStore({
      [ReducerName.Workout]: {
        popularWorkouts: fakeWorkouts,
      },
    });
    const sliderId = 'slider';
    render(
      <Provider store={storeWithData}>
        <HistoryRouter history={history}>
          <PopularTrainings />
        </HistoryRouter>
      </Provider>
    );
    const sliderElement = screen.getByTestId(sliderId);

    expect(sliderElement).toBeInTheDocument();
  });
  it('component should render advertisement if there are no popular trainings', () => {
    const advertisementId = 'advertisement-thumbnail';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PopularTrainings />
        </HistoryRouter>
      </Provider>
    );
    const advertisementElement = screen.getByTestId(advertisementId);

    expect(advertisementElement).toBeInTheDocument();
  });
});
