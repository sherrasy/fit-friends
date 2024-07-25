import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { makeFakeWorkout } from '../../utils/mocks';
import WorkoutListCard from './workout-list-card';
import { UserRole } from '../../types/common/user-role.enum';
import { ReducerName } from '../../utils/constant';

const mockStore = configureMockStore();
const fakeWorkout = makeFakeWorkout();
const store = mockStore(
  {
    [ReducerName.User]: {
      role:UserRole.Sportsman
    }
  });
const history = createMemoryHistory();
describe('Component: WorkoutListCard', () => {

  it('should render correctly', () => {
    const workoutCardId = 'workout-list-card';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <WorkoutListCard workout={fakeWorkout} />
        </HistoryRouter>
      </Provider>
    );

    const cardElement = screen.getByTestId(workoutCardId);
    const nameElement = screen.getByText(fakeWorkout.name);
    const descriptionElement = screen.getByText(fakeWorkout.description);

    expect(cardElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});
