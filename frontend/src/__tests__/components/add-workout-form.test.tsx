import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { DefaultParam, ReducerName } from '@utils/constant';
import { UserRole } from '@frontend-types/common/user-role.enum';
import HistoryRouter from '@components/history-router/history-router';
import AddWorkoutForm from '@components/add-workout-form/add-workout-form';

const mockStore = configureMockStore();
const history = createMemoryHistory();

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
describe('Component: AddWorkoutForm', () => {

  it('component should render correctly', async() => {
    const DataTestId = {
      Form:'create-training',
      Description:'description-training',
    };
    const mockText = 'New training description';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddWorkoutForm/>
        </HistoryRouter>
      </Provider>
    );
    const formElement = screen.getByTestId(DataTestId.Form);
    const descriptionElement = screen.getByTestId(DataTestId.Description);
    await userEvent.type(descriptionElement, mockText);

    expect(formElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockText)).toBeInTheDocument();
  });
});
