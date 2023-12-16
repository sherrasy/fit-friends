import { render, screen } from '@testing-library/react';
import AdvertisementThumbnail from './advertisement-thumbnail';

describe('Component: AdvertisementThumbnail', () => {
  it('should render correct', () => {
    const advertisementText = 'Скоро тут будет интересно';

    render(<AdvertisementThumbnail />);

    const textElement = screen.getByText(advertisementText);

    expect(textElement).toBeInTheDocument();
  });
});
