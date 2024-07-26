import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '@components/history-router/history-router';
import Header from '@components/header/header';
import { DefaultParam, ReducerName } from '@utils/constant';
import { UserRole } from '@frontend-types/common/user-role.enum';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const store = mockStore({
  [ReducerName.User]: {
    role: UserRole.Sportsman,
  },
  [ReducerName.Account]: {
    notifications: null,
    isNotificationsLoading: DefaultParam.Status,
    isNotificationDeleting: DefaultParam.Status,
    hasNotificationsError: DefaultParam.Status,
  }});
describe('Component: Header', () => {

  it('component should render correctly', () => {
    const ButtonTestId = {
      Main: 'move-main',
      Account:'move-account'
    };
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header/>
        </HistoryRouter>
      </Provider>
    );
    const mainButton = screen.getByTestId(ButtonTestId.Main);
    const accountButton = screen.getByTestId(ButtonTestId.Account);

    expect(mainButton).toBeInTheDocument();
    expect(accountButton).toBeInTheDocument();
  });
});
