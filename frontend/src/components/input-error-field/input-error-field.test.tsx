import { render, screen } from '@testing-library/react';
import InputErrorField from './input-error-field';

describe('Component: InputErrorField', () => {
  it('should render correct', () => {
    const errorText = 'Обязательное поле';
    render(<InputErrorField />);

    const textElement = screen.getByText(errorText);

    expect(textElement).toBeInTheDocument();
  });
});
