import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { DefaultParam, ReducerName } from '../../utils/constant';
import { makeFakeUser } from '../../utils/mocks';
import UserInfo from './user-info';


const mockStore = configureMockStore();
const fakeUser = makeFakeUser();
const store = mockStore({
  [ReducerName.User]: {
    currentUserData: fakeUser,
    isUserUpdating: DefaultParam.Status,

  }
});
const history = createMemoryHistory();
describe('Component: UserInfo', () => {

  it('should render correctly', () => {
    const userInfoId = 'user-info';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UserInfo />
        </HistoryRouter>
      </Provider>
    );

    const infoElement = screen.getByTestId(userInfoId);
    const nameElement = screen.getByDisplayValue(fakeUser.name);

    expect(nameElement).toBeInTheDocument();
    expect(infoElement).toBeInTheDocument();
  });
});
