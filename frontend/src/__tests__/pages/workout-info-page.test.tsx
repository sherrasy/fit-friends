import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '@components/history-router/history-router';
import { AppRoute, ReducerName } from '@utils/constant';
import { makeFakeUser, makeFakeWorkout } from '@utils/mocks';
import WorkoutInfoPage from '@pages/workout-info-page/workout-info-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeUser = makeFakeUser();
const fakeWorkout = makeFakeWorkout();
const store = mockStore({
  [ReducerName.User]: {
    role: fakeUser.role,
    currentUserData: fakeUser,
    userData: fakeUser,
  },
  [ReducerName.Account]: {
    notifications: null,
  },
  [ReducerName.Workout]: {
    workout: fakeWorkout,
  },
});
const history = createMemoryHistory();
describe('Component: WorkoutInfoPage', () => {
  beforeAll(() => {
    history.push(`${AppRoute.WorkoutInfo}/${fakeWorkout.id}`);
  });
  it('should render correctly', () => {
    const workoutInfoCard = 'training-info-card';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <WorkoutInfoPage />
        </HistoryRouter>
      </Provider>
    );

    const infoElement = screen.getByTestId(workoutInfoCard);

    expect(infoElement).toBeInTheDocument();
    expect(history.location.pathname).toBe(`${AppRoute.WorkoutInfo}/${fakeWorkout.id}`);
  });
});
