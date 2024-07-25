import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { lorem } from 'faker';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { FormFieldName } from '../../utils/constant';
import { makeFakeNewUserGeneral } from '../../utils/mocks';
import { DescriptionLength } from '../../utils/validation.constant';
import QuestionnaireCoach from './questionnaire-coach';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeUserData = makeFakeNewUserGeneral();
const store = mockStore();
describe('Component: QuestionnaireCoach', () => {

  it('should render correctly', () => {
    const DataTestId = {
      Form:'coach-questionaire',
      Input:FormFieldName.Description,
    };
    const buttonText = 'Продолжить';
    const fakeDescription = lorem.sentence(DescriptionLength.Min);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <QuestionnaireCoach newUserData={fakeUserData} avatarFile={undefined}/>
        </HistoryRouter>
      </Provider>
    );
    const formElement = screen.getByTestId(DataTestId.Form);
    const buttonElement = screen.getByText(buttonText);
    const successElement = screen.getByTestId(DataTestId.Input);
    fireEvent.change(successElement, {target:{value:fakeDescription}});


    expect(formElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
    expect(successElement).toBeInTheDocument();
    expect(screen.getByDisplayValue(fakeDescription)).toBeInTheDocument();
  });
});
