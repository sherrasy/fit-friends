import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '@components/history-router/history-router';
import ErrorPage from '@pages/error-page/error-page';

const history = createMemoryHistory();
describe('Component: ErrorPage', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <ErrorPage/>
      </HistoryRouter>
    );

    const textElement = screen.getByText('Страница не найдена.');
    const subtextElement = screen.getByText('Возможно, страница была удалена или её вовсе не существовало.');

    expect(textElement).toBeInTheDocument();
    expect(subtextElement).toBeInTheDocument();
  });
});
