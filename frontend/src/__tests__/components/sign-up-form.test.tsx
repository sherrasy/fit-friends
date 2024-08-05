import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '@components/history-router/history-router';
import { AuthorizationStatus, FormFieldName, ReducerName } from '@utils/constant';
import SignUpForm from '@components/sign-up-form/sign-up-form';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  [ReducerName.User]: {
    authStatus: AuthorizationStatus.NoAuth,
  },
});
describe('Component: SignUpForm', () => {

  it('should render correctly', () => {
    const DataTestId = {
      Form:'sign-up-form',
      Email:`new-${FormFieldName.Email}`,
      Name:`new-${FormFieldName.Name}`,
    };
    const MockText = {
      Email:'test@local.ru',
      Name:'Test'
    };

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignUpForm onSubmit={vi.fn()} />
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
  });

});
