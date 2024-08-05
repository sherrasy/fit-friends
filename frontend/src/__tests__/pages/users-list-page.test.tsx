import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '@components/history-router/history-router';
import { AppRoute, DefaultParam, ReducerName } from '@utils/constant';
import { makeFakeUser, makeFakeUsers } from '@utils/mocks';
import UsersListPage from '@pages/users-list-page/users-list-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeUser = makeFakeUser();
const fakeUsers = makeFakeUsers();
const store = mockStore({
  [ReducerName.User]: {
    role: fakeUser.role,
    currentUserData: fakeUser,
    userListData: fakeUsers,
    readyUsers: fakeUsers,
    isUserListLoading: DefaultParam.Status,
  },
  [ReducerName.Account]: {
    notifications: null,
  },
});
const history = createMemoryHistory();
describe('Component: UsersListPage', () => {
  beforeAll(() => {
    history.push(AppRoute.UserList);
  });
  it('should render correctly', () => {
    const titleUsers = 'Каталог пользователей';
    const filterId = 'users-list-filter';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UsersListPage />
        </HistoryRouter>
      </Provider>
    );

    const titleElement = screen.getByText(titleUsers);
    const filtersElement = screen.getByTestId(filterId);

    expect(titleElement).toBeInTheDocument();
    expect(filtersElement).toBeInTheDocument();
    expect(history.location.pathname).toBe(AppRoute.UserList);
  });
});
