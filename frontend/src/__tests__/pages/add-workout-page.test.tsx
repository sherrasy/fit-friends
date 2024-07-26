import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '@components/history-router/history-router';
import { AppRoute, DefaultParam, ReducerName } from '@utils/constant';
import AddWorkoutPage from '@pages/add-workout-page/add-workout-page';
import { UserRole } from '@frontend-types/common/user-role.enum';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  [ReducerName.User]: {
    role: UserRole.Coach,
  },
  [ReducerName.Account]: {
    notifications: null,
  },
  [ReducerName.Workout]: {
    isWorkoutPosting: DefaultParam.Status,
  },
});
const history = createMemoryHistory();
describe('Component: AddWorkoutPage', () => {
  beforeAll(() => {
    history.push(AppRoute.AddWorkout);
  });
  it('should render correctly', async () => {
    const DataTestId = {
      Form:'create-training',
      Name:'name-training',
    };
    const mockText = 'New training';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddWorkoutPage />
        </HistoryRouter>
      </Provider>
    );

    const formElement = screen.getByTestId(DataTestId.Form);
    const nameElement = screen.getByTestId(DataTestId.Name);
    await userEvent.type(nameElement, mockText);

    expect(formElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockText)).toBeInTheDocument();
    expect(history.location.pathname).toBe(`${AppRoute.AddWorkout}`);
  });
});
