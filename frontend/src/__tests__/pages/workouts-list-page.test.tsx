import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '@components/history-router/history-router';
import { AppRoute, DefaultParam, ReducerName } from '@utils/constant';
import { makeFakeUser, makeFakeWorkouts } from '@utils/mocks';
import WorkoutsListPage from '@pages/workouts-list-page/workouts-list-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeUser = makeFakeUser();
const fakeWorkouts = makeFakeWorkouts();
const store = mockStore({
  [ReducerName.User]: {
    role: fakeUser.role,
    currentUserData: fakeUser,
  },
  [ReducerName.Account]: {
    notifications: null,
  },
  [ReducerName.Workout]: {
    workouts: fakeWorkouts,
    maxPrice: DefaultParam.Amount,
    isWorkoutsLoading: DefaultParam.Status,
  },
});
const history = createMemoryHistory();
describe('Component: WorkoutsListPage', () => {
  beforeAll(() => {
    history.push(AppRoute.WorkoutsList);
  });
  it('should render correctly', () => {
    const titleWorkouts = 'Каталог тренировок';
    const filterId = 'workouts-list-filter';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <WorkoutsListPage />
        </HistoryRouter>
      </Provider>
    );

    const titleElement = screen.getByText(titleWorkouts);
    const filtersElement = screen.getByTestId(filterId);

    expect(titleElement).toBeInTheDocument();
    expect(filtersElement).toBeInTheDocument();
    expect(history.location.pathname).toBe(AppRoute.WorkoutsList);
  });
});
