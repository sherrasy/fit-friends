import { Link } from 'react-router-dom';
import { OrderCoach } from '../../types/order.interface';
import { AppRoute, WorkoutTypeToName } from '../../utils/constant';

type WorkoutOrdersCardProps = {
  order: OrderCoach;
};

function WorkoutOrdersCard({ order }: WorkoutOrdersCardProps): JSX.Element {
  const {
    id,
    price,
    priceOrdered,
    amountOrdered,
    name,
    rating,
    workoutType,
    description,
    calories,
  } = order;
  return (
    <div className="thumbnail-training">
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/thumbnails/training-01.webp, img/content/thumbnails/training-01@2x.webp 2x"
            />
            <img
              src="img/content/thumbnails/training-01.jpg"
              srcSet="img/content/thumbnails/training-01@2x.jpg 2x"
              width="330"
              height="190"
              alt=""
            />
          </picture>
        </div>
        <p className="thumbnail-training__price">
          <span className="thumbnail-training__price-value">{price}</span>
          <span>₽</span>
        </p>
        <h2 className="thumbnail-training__title">{name}</h2>
        <div className="thumbnail-training__info">
          <ul className="thumbnail-training__hashtags-list">
            {workoutType.map((item) => (
              <li
                className="thumbnail-training__hashtags-item"
                key={`${item}-${id}`}
              >
                <div className="hashtag thumbnail-training__hashtag">
                  <span>#{WorkoutTypeToName[item]}</span>
                </div>
              </li>
            ))}
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag">
                <span>#{calories}ккал</span>
              </div>
            </li>
          </ul>
          <div className="thumbnail-training__rate">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <span className="thumbnail-training__rate-value">{rating}</span>
          </div>
        </div>
        <div className="thumbnail-training__text-wrapper">
          <p className="thumbnail-training__text">
            {description}
          </p>
        </div>
        <Link
          className="btn-flat btn-flat--underlined thumbnail-training__button-orders"
          to={`${AppRoute.WorkoutInfo}/${id}`}
        >
          <svg width="18" height="18" aria-hidden="true">
            <use xlinkHref="#icon-info"></use>
          </svg>
          <span>Подробнее</span>
        </Link>
      </div>
      <div className="thumbnail-training__total-info">
        <div className="thumbnail-training__total-info-card">
          <svg width="32" height="32" aria-hidden="true">
            <use xlinkHref="#icon-chart"></use>
          </svg>
          <p className="thumbnail-training__total-info-value">
            {amountOrdered}
          </p>
          <p className="thumbnail-training__total-info-text">
            Куплено тренировок
          </p>
        </div>
        <div className="thumbnail-training__total-info-card">
          <svg width="31" height="28" aria-hidden="true">
            <use xlinkHref="#icon-wallet"></use>
          </svg>
          <p className="thumbnail-training__total-info-value">
            {priceOrdered}
            <span>₽</span>
          </p>
          <p className="thumbnail-training__total-info-text">Общая сумма</p>
        </div>
      </div>
    </div>
  );
}

export default WorkoutOrdersCard;
