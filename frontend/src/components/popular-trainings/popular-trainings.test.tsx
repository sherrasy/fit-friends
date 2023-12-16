import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { ReducerName } from '../../utils/constant';
import { makeFakeWorkouts } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import PopularTrainings from './popular-trainings';

const mockStore = configureMockStore();
const fakeWorkouts = makeFakeWorkouts();
const history = createMemoryHistory();
const store = mockStore({
  [ReducerName.Workout]: {
    popularWorkouts: fakeWorkouts,
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
});
