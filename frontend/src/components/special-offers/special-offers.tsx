import { useAppSelector } from '../../hooks';
import { getSpecialWorkouts } from '../../store/workout-data/selectors';
import { DefaultParam, SliderLimit } from '../../utils/constant';
import AdvertisementThumbnail from '../advertisement-thumbnail/advertisement-thumbnail';
import Slider from '../slider/slider';
import WorkoutPromoCard from '../workout-card/workout-promo-card';

function SpecialOffers(): JSX.Element {
  const specialOffers = useAppSelector(getSpecialWorkouts);
  return (
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>
          {specialOffers && specialOffers.length !== 0 && (
            <Slider items={SliderLimit.SpecialOffer} isShowDots>
              {specialOffers.map((item, i) => (
                <WorkoutPromoCard workout={item} key={item.id} photoNumber={i + DefaultParam.Step} />
              ))}
            </Slider>
          )}

          {(!specialOffers || !specialOffers.length) && (
            <AdvertisementThumbnail />
          )}
        </div>
      </div>
    </section>
  );
}

export default SpecialOffers;
