import { render, screen } from '@testing-library/react';
import Loader from './loader';

describe('Component: Loader', () => {
  it('should render correct', () => {

    render(<Loader />);

    const textElement = screen.getByText('Loading...');

    expect(textElement).toBeInTheDocument();
  });
});
