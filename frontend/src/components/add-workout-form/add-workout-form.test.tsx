import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import AddWorkoutForm from './add-workout-form';
import userEvent from '@testing-library/user-event';
import { makeFakeCoach } from '../../utils/mocks';
import { DefaultParam, ReducerName } from '../../utils/constant';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeUser = makeFakeCoach();
const store = mockStore({
  [ReducerName.User]: {
    role: fakeUser.role,
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
