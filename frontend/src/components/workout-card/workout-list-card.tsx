import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getUserRole } from '@store/user-data/selectors';
import {
  fetchReviews,
  fetchWorkout,
} from '@store/workout-data/api-actions';
import { UserRole } from '@frontend-types/common/user-role.enum';
import { Workout } from '@frontend-types/workout/workout.interface';
import { AppRoute, WorkoutTypeToName } from '@utils/constant';
import { generateRandomNumber } from '@utils/helpers';

type WorkoutListCardProps = {
  workout: Workout;
};

function WorkoutListCard({ workout }: WorkoutListCardProps): JSX.Element {
  const {
    id,
    price,
    name,
    workoutType,
    calories,
    rating,
    description,
    specialPrice,
    photo,
  } = workout;
  const currentPrice = specialPrice ? specialPrice : price;
  const userRole = useAppSelector(getUserRole);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleRouteChange = () => {
    dispatch(fetchWorkout(id));
    dispatch(fetchReviews(id));
    const route =
      userRole === UserRole.Coach
        ? `${AppRoute.EditWorkout}/${id}`
        : `${AppRoute.WorkoutInfo}/${id}`;
    navigate(route);
  };

  const randomPhotoId = generateRandomNumber();

  return (
    <div className="thumbnail-training" data-testid='workout-list-card'>
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          <picture>
            <img
              src={
                photo
                  ? photo
                  : `/img/content/thumbnails/training-${randomPhotoId}.jpg`
              }
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
          <button
            className="btn btn--small btn--outlined thumbnail-training__button-catalog"
            onClick={handleRouteChange}
          >
            Отзывы
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkoutListCard;
