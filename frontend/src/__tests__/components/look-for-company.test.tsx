import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { ReducerName } from '@utils/constant';
import { makeFakeUsers } from '@utils/mocks';
import HistoryRouter from '@components/history-router/history-router';
import LookForCompany from '@components/look-for-company/look-for-company';

const mockStore = configureMockStore();
const fakeUsers = makeFakeUsers();
const history = createMemoryHistory();
const store = mockStore({
  [ReducerName.User]: {
    readyUsers: null,
  },
});
describe('Component: LookForCompany', () => {

  it('component should render correctly', () => {
    const companyBlockId = 'look-for-company';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LookForCompany />
        </HistoryRouter>
      </Provider>
    );
    const lookForCompanyElement = screen.getByTestId(companyBlockId);

    expect(lookForCompanyElement).toBeInTheDocument();
  });
  it('component should render slider if there are ready users', () => {
    const storeWithData = mockStore({
      [ReducerName.User]: {
        readyUsers: fakeUsers,
      },
    });
    const sliderId = 'slider';
    render(
      <Provider store={storeWithData}>
        <HistoryRouter history={history}>
          <LookForCompany />
        </HistoryRouter>
      </Provider>
    );
    const sliderElement = screen.getByTestId(sliderId);

    expect(sliderElement).toBeInTheDocument();
  });
  it('component should render advertisement if there are no ready users', () => {
    const advertisementId = 'advertisement-thumbnail';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LookForCompany />
        </HistoryRouter>
      </Provider>
    );
    const advertisementElement = screen.getByTestId(advertisementId);

    expect(advertisementElement).toBeInTheDocument();
  });
});
