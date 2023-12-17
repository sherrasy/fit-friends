import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '../../components/history-router/history-router';
import { AppRoute, AuthorizationStatus, FormFieldName, ReducerName } from '../../utils/constant';
import SignUpPage from './sign-up-page';
import { makeFakeNewUserGeneral } from '../../utils/mocks';
import { CaloriesAmount } from '../../utils/validation.constant';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const fakeUserGeneral = makeFakeNewUserGeneral();
describe('Component: SignUpPage', () => {
  beforeAll(() => {
    history.push(AppRoute.Register);
  });
  it('should render first part if there is no user general data', () => {
    const DataTestId = {
      Form:'sign-up-form',
      Email:`new-${FormFieldName.Email}`,
      Name:`new-${FormFieldName.Name}`,
    };
    const MockText = {
      Email:'test-mail@local.ru',
      Name:'John'
    };
    const store = mockStore({
      [ReducerName.User]: {
        authStatus: AuthorizationStatus.NoAuth,
      },
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignUpPage />
        </HistoryRouter>
      </Provider>
    );

    const formElement = screen.getByTestId(DataTestId.Form);
    const emailElement = screen.getByTestId(DataTestId.Email);
    const nameElement = screen.getByTestId(DataTestId.Name);
    fireEvent.change(emailElement, {target:{value:MockText.Email}});
    fireEvent.change(nameElement,{target:{value:MockText.Name}});


    expect(formElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(screen.getByDisplayValue(MockText.Email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(MockText.Name)).toBeInTheDocument();
    expect(history.location.pathname).toBe(`${AppRoute.Register}`);
  });
  it('should render questionnaire part if there is user general data', () => {
    const DataTestId = {
      Form:'user-questionaire',
      Input:FormFieldName.CaloriesTotal,
    };
    const store = mockStore({
      [ReducerName.User]: {
        authStatus: AuthorizationStatus.NoAuth,
        newUserData:fakeUserGeneral
      },
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignUpPage />
        </HistoryRouter>
      </Provider>
    );

    const formElement = screen.getByTestId(DataTestId.Form);
    const caloriesElement = screen.getByTestId(DataTestId.Input);
    fireEvent.change(caloriesElement, {target:{value:CaloriesAmount.Min}});


    expect(formElement).toBeInTheDocument();
    expect(caloriesElement).toBeInTheDocument();
    expect(screen.getByDisplayValue(CaloriesAmount.Min)).toBeInTheDocument();
    expect(history.location.pathname).toBe(`${AppRoute.Register}`);
  });
});
