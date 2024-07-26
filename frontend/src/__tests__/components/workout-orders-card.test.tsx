import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '@components/history-router/history-router';
import { makeFakeOrderCoach } from '@utils/mocks';
import WorkoutOrdersCard from '@components/workout-card/workout-orders-card';

const mockStore = configureMockStore();
const fakeOrder = makeFakeOrderCoach();
const store = mockStore();
const history = createMemoryHistory();
describe('Component: WorkoutOrdersCard', () => {

  it('should render correctly', () => {
    const workoutCardId = 'workout-order-coach';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <WorkoutOrdersCard order={fakeOrder} />
        </HistoryRouter>
      </Provider>
    );

    const cardElement = screen.getByTestId(workoutCardId);
    const nameElement = screen.getByText(fakeOrder.name);
    const amountElement = screen.getByText(fakeOrder.amountOrdered);
    const totalPriceElement = screen.getByText(fakeOrder.priceOrdered);

    expect(cardElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(amountElement).toBeInTheDocument();
    expect(totalPriceElement).toBeInTheDocument();
  });
});
