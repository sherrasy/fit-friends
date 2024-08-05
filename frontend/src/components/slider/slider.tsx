import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { DefaultParam, SliderBreakpointLimit } from '@utils/constant';

type SliderProps = {
  children: JSX.Element[];
  items: number;
  isOutsideButtons?: boolean;
  isShowDots?: boolean;
  currentButtons?: JSX.Element;
  additionalClassName?: string;
};

function Slider({
  children,
  items,
  isOutsideButtons = DefaultParam.Status,
  isShowDots = DefaultParam.Status,
  currentButtons,
  additionalClassName
}: SliderProps): JSX.Element {
  const responsiveParams = {
    desktop: {
      breakpoint: {
        max: SliderBreakpointLimit.Max,
        min: SliderBreakpointLimit.Min,
      },
      items,
    },
  };
  const className = additionalClassName ? `container ${additionalClassName}` : 'container';
  return (
    <div className='slider-main-reverse' data-testid='slider'>
      <Carousel
        responsive={responsiveParams}
        arrows={false}
        containerClass={className}
        focusOnSelect
        pauseOnHover
        renderButtonGroupOutside={isOutsideButtons}
        customButtonGroup={currentButtons }
        showDots={isShowDots}
        slidesToSlide={1}
      >
        {children}
      </Carousel>
    </div>
  );
}

export default Slider;
