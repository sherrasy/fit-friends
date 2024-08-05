import { render, screen } from '@testing-library/react';
import BackButton from '@components/back-button/back-button';
import HistoryRouter from '@components/history-router/history-router';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

describe('Component: BackButton', () => {
  it('should render correct', () => {
    const buttonText = 'Назад';
    render(
      <HistoryRouter history={history}>
        <BackButton />
      </HistoryRouter>
    );

    const textElement = screen.getByText(buttonText);

    expect(textElement).toBeInTheDocument();
  });
});
