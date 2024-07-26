import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '@components/history-router/history-router';
import { AppRoute, AuthorizationStatus, FormFieldName, ReducerName } from '@utils/constant';
import LoginPage from '@pages/login-page/login-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  [ReducerName.User]: {
    authStatus: AuthorizationStatus.NoAuth,
  },
});
const history = createMemoryHistory();
describe('Component: LoginPage', () => {
  beforeAll(() => {
    history.push(AppRoute.Login);
  });
  it('should render correctly', () => {
    const DataTestId = {
      Form:'login-form',
      Email:FormFieldName.Email,
      Password:FormFieldName.Password,
    };
    const MockText = {
      Email:'test-mail@local.ru',
      Password:'123test456'
    };
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginPage />
        </HistoryRouter>
      </Provider>
    );

    const formElement = screen.getByTestId(DataTestId.Form);
    const emailElement = screen.getByTestId(DataTestId.Email);
    const passwordElement = screen.getByTestId(DataTestId.Password);
    fireEvent.change(emailElement, {target:{value:MockText.Email}});
    fireEvent.change(passwordElement,{target:{value:MockText.Password}});


    expect(formElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
    expect(screen.getByDisplayValue(MockText.Email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(MockText.Password)).toBeInTheDocument();
    expect(history.location.pathname).toBe(`${AppRoute.Login}`);
  });
});
