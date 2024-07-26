import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '@components/history-router/history-router';
import { AppRoute, DefaultParam, ReducerName } from '@utils/constant';
import { makeFakeOrders, makeFakeUser } from '@utils/mocks';
import UserPurchasesPage from '@pages/user-purchases-page/user-purchases-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeUser = makeFakeUser();
const fakeOrders = makeFakeOrders();
const store = mockStore({
  [ReducerName.User]: {
    role: fakeUser.role,
    currentUserData: fakeUser,
  },
  [ReducerName.Account]: {
    notifications: null,
    orders: fakeOrders,
    isOrdersLoading: DefaultParam.Status,
  }
});
const history = createMemoryHistory();
describe('Component: UserPurchasesPage', () => {
  beforeAll(() => {
    history.push(AppRoute.Purchases);
  });
  it('should render correctly', () => {
    const titlePurchases = 'Мои покупки';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UserPurchasesPage />
        </HistoryRouter>
      </Provider>
    );

    const infoElement = screen.getByText(titlePurchases);

    expect(infoElement).toBeInTheDocument();
    expect(history.location.pathname).toBe(AppRoute.Purchases);
  });
});
