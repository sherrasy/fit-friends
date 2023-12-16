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
    specialUserWorkouts: fakeWorkouts,
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
});
