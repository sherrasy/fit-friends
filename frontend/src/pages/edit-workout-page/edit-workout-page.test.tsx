import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '../../components/history-router/history-router';
import { AppRoute, DefaultParam, FormFieldName, ReducerName } from '../../utils/constant';
import { makeFakeCoach, makeFakeWorkout } from '../../utils/mocks';
import EditWorkoutPage from './edit-workout-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeUser = makeFakeCoach();
const fakeWorkout = makeFakeWorkout();
const store = mockStore({
  [ReducerName.User]: {
    role: fakeUser.role,
    currentUserData: fakeUser,

  },
  [ReducerName.Account]: {
    notifications: null,
  },
  [ReducerName.Workout]: {
    workout: fakeWorkout,
    isWorkoutPosting: DefaultParam.Status,
    reviews: null,
  },
});
const history = createMemoryHistory();

describe('Component: EditWorkoutPage', () => {
  beforeAll(() => {
    history.push(`${AppRoute.EditWorkout}/${fakeWorkout.id}`);
  });
  it('should render correctly', () => {
    const DataTestId = {
      Form:'update-training',
      Description:'update-description-training',
    };

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <EditWorkoutPage />
        </HistoryRouter>
      </Provider>
    );

    const formElement = screen.getByTestId(DataTestId.Form);
    const descriptionElement = screen.getByTestId(DataTestId.Description);

    expect(formElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveAttribute('name', FormFieldName.Description);
    expect(history.location.pathname).toBe(`${AppRoute.EditWorkout}/${fakeWorkout.id}`);
  });
});
