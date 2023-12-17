import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { makeFakeCoach, makeFakeWorkout } from '../../utils/mocks';
import { DefaultParam, FormFieldName, ReducerName } from '../../utils/constant';
import EditWorkoutForm from './edit-workout-form';

const mockStore = configureMockStore();
const history = createMemoryHistory();

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
  },});
describe('Component: EditWorkoutForm', () => {

  it('component should render correctly', () => {
    const DataTestId = {
      Form:'update-training',
      Name:'update-name-training',
    };
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <EditWorkoutForm workout={fakeWorkout} coach={fakeUser}/>
        </HistoryRouter>
      </Provider>
    );
    const formElement = screen.getByTestId(DataTestId.Form);
    const nameElement = screen.getByTestId(DataTestId.Name);

    expect(formElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveAttribute('name', FormFieldName.Name);
  });
});
