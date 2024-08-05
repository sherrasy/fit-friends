import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '@components/history-router/history-router';
import { makeFakeWorkout } from '@utils/mocks';
import WorkoutSmallCard from '@components/workout-card/workout-small-card';

const mockStore = configureMockStore();
const fakeWorkout = makeFakeWorkout();
const store = mockStore();
const history = createMemoryHistory();
describe('Component: WorkoutSmallCard', () => {

  it('should render correctly', () => {
    const workoutCardId = 'workout-card-small';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <WorkoutSmallCard workout={fakeWorkout} />
        </HistoryRouter>
      </Provider>
    );

    const cardElement = screen.getByTestId(workoutCardId);
    const nameElement = screen.getByText(fakeWorkout.name);

    expect(cardElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
  });
});
