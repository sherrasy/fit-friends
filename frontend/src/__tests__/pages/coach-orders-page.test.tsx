import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '@components/history-router/history-router';
import { AppRoute, DefaultParam, ReducerName } from '@utils/constant';
import { makeFakeCoach, makeFakeCoachOrders } from '@utils/mocks';
import CoachOrdersPage from '@pages/coach-orders-page/coach-orders-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeUser = makeFakeCoach();
const fakeOrders = makeFakeCoachOrders();
const store = mockStore({
  [ReducerName.User]: {
    role: fakeUser.role,
    currentUserData: fakeUser,
  },
  [ReducerName.Account]: {
    notifications: null,
    coachOrders: fakeOrders,
    isOrdersLoading: DefaultParam.Status,

  }
});
const history = createMemoryHistory();
describe('Component: CoachOrdersPage', () => {
  beforeAll(() => {
    history.push(AppRoute.Orders);
  });
  it('should render correctly', () => {
    const titleOrders = 'Мои заказы';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CoachOrdersPage />
        </HistoryRouter>
      </Provider>
    );

    const infoElement = screen.getByText(titleOrders);

    expect(infoElement).toBeInTheDocument();
    expect(history.location.pathname).toBe(AppRoute.Orders);
  });
});
