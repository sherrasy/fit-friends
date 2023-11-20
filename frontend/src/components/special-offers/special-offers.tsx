import { useAppSelector } from "../../hooks";
import { getSpecialWorkouts } from "../../store/workout-data/selectors";
import AdvertisementThumbnail from "../advertisement-thumbnail/advertisement-thumbnail";

function SpecialOffers():JSX.Element{
  const specialOffers = useAppSelector(getSpecialWorkouts);
  return(
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>
          <ul className="special-offers__list">
            <li className="special-offers__item is-active">
              <aside className="promo-slider">
                <div className="promo-slider__overlay"></div>
                <div className="promo-slider__image">
                  <img src="img/content/promo-1.png" srcSet="img/content/promo-1@2x.png 2x" width="1040" height="469"
                    alt="promo"
                  />
                </div>
                <div className="promo-slider__header">
                  <h3 className="promo-slider__title">Fitball</h3>
                  <div className="promo-slider__logo">
                    <svg width="74" height="74" aria-hidden="true">
                      <use xlinkHref="#logotype"></use>
                    </svg>
                  </div>
                </div>
                <span className="promo-slider__text">Горячие предложения на тренировки на фитболе</span>
                <div className="promo-slider__bottom-container">
                  <div className="promo-slider__slider-dots">
                    <button className="promo-slider__slider-dot--active promo-slider__slider-dot"
                      aria-label="первый слайд"
                    >
                    </button>
                    <button className="promo-slider__slider-dot" aria-label="второй слайд"></button>
                    <button className="promo-slider__slider-dot" aria-label="третий слайд"></button>
                  </div>
                  <div className="promo-slider__price-container">
                    <p className="promo-slider__price">1600 ₽</p>
                    <p className="promo-slider__sup">за занятие</p>
                    <p className="promo-slider__old-price">2000 ₽</p>
                  </div>
                </div>
              </aside>
            </li>
          </ul>

{!specialOffers &&        <AdvertisementThumbnail/>}
        </div>
      </div>
    </section>
  );
}

export default SpecialOffers;
