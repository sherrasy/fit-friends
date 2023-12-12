import { render, screen } from '@testing-library/react';
import InputErrorField from './input-error-field';

describe('Component: InputErrorField', () => {
  it('should render correct', () => {

    render(<InputErrorField />);

    const textElement = screen.getByText('Обязательное поле');

    expect(textElement).toBeInTheDocument();
  });
});
