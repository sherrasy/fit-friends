import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '@components/history-router/history-router';
import { UserRole } from '@frontend-types/common/user-role.enum';
import { ReducerName } from '@utils/constant';
import { makeFakeCoach, makeFakeOrder, makeFakeWorkout } from '@utils/mocks';
import WorkoutInfoCard from '@components/workout-card/workout-info-card';

const mockStore = configureMockStore();
const fakeWorkout = makeFakeWorkout();
const fakeCoach = makeFakeCoach();
const fakeOrder = makeFakeOrder();
const store = mockStore(
  {
    [ReducerName.User]: {
      role:UserRole.Sportsman
    }
  });
const history = createMemoryHistory();
describe('Component: WorkoutInfoCard', () => {

  it('should render correctly', () => {
    const workoutCardId = 'training-info-card';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <WorkoutInfoCard workout={fakeWorkout} coach={fakeCoach} order={fakeOrder}/>
        </HistoryRouter>
      </Provider>
    );

    const cardElement = screen.getByTestId(workoutCardId);
    const nameElement = screen.getByText(fakeWorkout.name);
    const coachNameElement = screen.getByText(fakeCoach.name);

    expect(cardElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(coachNameElement).toBeInTheDocument();
  });
});
