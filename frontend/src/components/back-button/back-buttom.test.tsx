import { render, screen } from '@testing-library/react';
import BackButton from './back-button';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';


const history = createMemoryHistory();

describe('Component: BackButton', () => {
  it('should render correct', () => {

    render(
      <HistoryRouter history={history}>
        <BackButton/>
      </HistoryRouter>
    );

    const textElement = screen.getByText('Назад');

    expect(textElement).toBeInTheDocument();
  });
});
