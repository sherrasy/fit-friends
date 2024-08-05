import { render, screen } from '@testing-library/react';
import Loader from '@components/loader/loader';

describe('Component: Loader', () => {
  it('should render correct', () => {
    const loaderText = 'Loading...';
    render(<Loader />);

    const textElement = screen.getByText(loaderText);

    expect(textElement).toBeInTheDocument();
  });
});
