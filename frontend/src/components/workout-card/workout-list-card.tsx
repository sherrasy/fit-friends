import { useNavigate } from 'react-router-dom';
import { Workout } from '../../types/workout/workout.interface';
import { AppRoute, WorkoutTypeToName } from '../../utils/constant';
import { useAppDispatch } from '../../hooks';
import { fetchReviews, fetchWorkout } from '../../store/workout-data/api-actions';
import { generateRandomNumber } from '../../utils/helpers';

type WorkoutListCardProps = {
  workout: Workout;
};

function WorkoutListCard({ workout }: WorkoutListCardProps): JSX.Element {
  const { id, price, name, workoutType, calories, rating, description, specialPrice, photo } = workout;
  const currentPrice = specialPrice ? specialPrice : price;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleRouteChange = ()=>{
    dispatch(fetchWorkout(id));
    dispatch(fetchReviews(id));
    navigate(`${AppRoute.WorkoutInfo}/${id}`);
  };

  const randomPhotoId = generateRandomNumber();

  return (
    <div className="thumbnail-training">
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          <picture>
            <img
              src={photo ? photo : `/img/content/thumbnails/training-${randomPhotoId}.jpg`}
              width="330"
              height="190"
              alt=""
            />
          </picture>
        </div>
        <p className="thumbnail-training__price">{currentPrice}</p>
        <h3 className="thumbnail-training__title">{name}</h3>
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
          <p className="thumbnail-training__text">{description}</p>
        </div>
        <div className="thumbnail-training__button-wrapper">
          <button
            className="btn btn--small thumbnail-training__button-catalog"
            onClick={handleRouteChange}
          >
            Подробнее
          </button>
          <a
            className="btn btn--small btn--outlined thumbnail-training__button-catalog"
            href="/"
          >
            Отзывы
          </a>
        </div>
      </div>
    </div>
  );
}

export default WorkoutListCard;
