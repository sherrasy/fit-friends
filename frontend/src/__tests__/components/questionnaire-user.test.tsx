import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '@components/history-router/history-router';
import { FormFieldName } from '@utils/constant';
import { makeFakeNewUserGeneral } from '@utils/mocks';
import { CaloriesAmount } from '@utils/validation.constant';
import QuestionnaireUser from '@components/questionnaire/questionnaire-user';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeUserData = makeFakeNewUserGeneral();
const store = mockStore();
describe('Component: QuestionnaireUser', () => {

  it('should render correctly', () => {
    const DataTestId = {
      Form:'user-questionaire',
      Input:FormFieldName.CaloriesTotal,
    };
    const buttonText = 'Продолжить';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <QuestionnaireUser newUserData={fakeUserData} avatarFile={undefined}/>
        </HistoryRouter>
      </Provider>
    );
    const formElement = screen.getByTestId(DataTestId.Form);
    const buttonElement = screen.getByText(buttonText);
    const caloriesElement = screen.getByTestId(DataTestId.Input);
    fireEvent.change(caloriesElement, {target:{value:CaloriesAmount.Min}});


    expect(formElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
    expect(caloriesElement).toBeInTheDocument();
    expect(screen.getByDisplayValue(CaloriesAmount.Min)).toBeInTheDocument();
  });
});
