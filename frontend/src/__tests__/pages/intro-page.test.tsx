import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '@components/history-router/history-router';
import IntroPage from '@pages/intro-page/intro-page';

const history = createMemoryHistory();
describe('Component: IntroPage', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <IntroPage/>
      </HistoryRouter>
    );

    const signInElement = screen.getByText('Регистрация');
    const loginElement = screen.getByText('Вход');

    expect(signInElement).toBeInTheDocument();
    expect(loginElement).toBeInTheDocument();
  });
});
