import { Workout } from '@frontend-types/workout/workout.interface';

type WorkoutPromoCardProps = {
  workout: Workout;
  photoNumber:number;
};

function WorkoutPromoCard({ workout, photoNumber }: WorkoutPromoCardProps): JSX.Element {
  const { name, description, price, specialPrice} = workout;
  return (
    <aside className="promo-slider" data-testid='workout-card-promo'>
      <div className="promo-slider__overlay"></div>
      <div className="promo-slider__image">
        <img src={`img/content/promo-${photoNumber}.png`} width="1040" height="469"
          alt="promo"
        />
      </div>
      <div className="promo-slider__header">
        <h3 className="promo-slider__title">{name}</h3>
        <div className="promo-slider__logo">
          <svg width="74" height="74" aria-hidden="true">
            <use xlinkHref="#logotype"></use>
          </svg>
        </div>
      </div>
      <span className="promo-slider__text">{description}</span>
      <div className="promo-slider__bottom-container">
        <div className="promo-slider__slider-dots">
        </div>
        <div className="promo-slider__price-container">
          <p className="promo-slider__price">{specialPrice} ₽</p>
          <p className="promo-slider__sup">за занятие</p>
          <p className="promo-slider__old-price">{price} ₽</p>
        </div>
      </div>
    </aside>
  );
}

export default WorkoutPromoCard;
