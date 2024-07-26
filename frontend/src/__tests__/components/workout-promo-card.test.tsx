import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '@components/history-router/history-router';
import { DefaultParam } from '@utils/constant';
import { makeFakeWorkout } from '@utils/mocks';
import WorkoutPromoCard from '@components/workout-card/workout-promo-card';

const mockStore = configureMockStore();
const fakeWorkout = makeFakeWorkout();
const store = mockStore();
const history = createMemoryHistory();
describe('Component: WorkoutPromoCard', () => {

  it('should render correctly', () => {
    const workoutCardId = 'workout-card-promo';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <WorkoutPromoCard workout={fakeWorkout} photoNumber={DefaultParam.Step} />
        </HistoryRouter>
      </Provider>
    );

    const cardElement = screen.getByTestId(workoutCardId);
    const nameElement = screen.getByText(fakeWorkout.name);

    expect(cardElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
  });
});
