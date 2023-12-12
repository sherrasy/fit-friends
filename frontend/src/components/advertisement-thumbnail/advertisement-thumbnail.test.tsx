import { render, screen } from '@testing-library/react';
import AdvertisementThumbnail from './advertisement-thumbnail';

describe('Component: AdvertisementThumbnail', () => {
  it('should render correct', () => {

    render(<AdvertisementThumbnail />);

    const textElement = screen.getByText('Скоро тут будет интересно');

    expect(textElement).toBeInTheDocument();
  });
});
