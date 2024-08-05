import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '@components/history-router/history-router';
import Slider from '@components/slider/slider';
import { SliderLimit } from '@utils/constant';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore();

describe('Component: Slider', () => {

  it('component should render correctly', () => {
    const sliderId = 'slider';
    const slides = ['slide'];
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Slider
            items={SliderLimit.Default}
          >
            {slides.map((item) => (
              <h1 key={item}>{item}</h1>
            ))}
          </Slider>
        </HistoryRouter>
      </Provider>
    );
    const sliderElement = screen.getByTestId(sliderId);

    expect(sliderElement).toBeInTheDocument();
  });
});
