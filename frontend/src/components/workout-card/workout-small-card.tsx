import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks';
import { fetchReviews, fetchWorkout } from '@store/workout-data/api-actions';
import { Workout } from '@frontend-types/workout/workout.interface';
import { AppRoute } from '@utils/constant';
import { generateRandomNumber } from '@utils/helpers';

type WorkoutSmallCardProps = {
  workout: Workout;
};

function WorkoutSmallCard({ workout }: WorkoutSmallCardProps): JSX.Element {
  const { id, name, photo} = workout;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleRouteChange = ()=>{
    dispatch(fetchWorkout(id));
    dispatch(fetchReviews(id));
    navigate(`${AppRoute.WorkoutInfo}/${id}`);
  };
  const randomPhotoId = generateRandomNumber();

  return (
    <div className="thumbnail-preview" data-testid='workout-card-small'>
      <div className="thumbnail-preview__image">
        <picture>
          <img src={photo ? photo : `/img/content/thumbnails/training-${randomPhotoId}@2x.jpg`} alt=''/>
        </picture>
      </div>
      <div className="thumbnail-preview__inner">
        <h3 className="thumbnail-preview__title">{name}</h3>
        <div className="thumbnail-preview__button-wrapper">
          <button className="btn btn--small thumbnail-preview__button" onClick={handleRouteChange}>Подробнее</button>
        </div>
      </div>
    </div>
  );
}

export default WorkoutSmallCard;
