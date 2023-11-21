import { User } from '../../types/user.interface';
import { Workout } from '../../types/workout.interface';
import { UserSexToHashtagName, WorkoutTypeToName } from '../../utils/constant';

type WorkoutInfoCardProps = {
  workout: Workout;
  coach:User;
};

function WorkoutInfoCard({ workout, coach }: WorkoutInfoCardProps): JSX.Element {
  const {name:coachName, avatarPath} = coach;
  const { id, name, description, rating, workoutType, calories, workoutTime, sex, price} = workout;

  return (
    <div className="training-card">
      <div className="training-info">
        <h2 className="visually-hidden">Информация о тренировке</h2>
        <div className="training-info__header">
          <div className="training-info__coach">
            <div className="training-info__photo">
              <picture>
                <img
                  src={avatarPath}
                  width="64"
                  height="64"
                  alt="Изображение тренера"
                />
              </picture>
            </div>
            <div className="training-info__coach-info">
              <span className="training-info__label">Тренер</span>
              <span className="training-info__name">{coachName}</span>
            </div>
          </div>
        </div>
        <div className="training-info__main-content">
          <form action="#" method="get">
            <div className="training-info__form-wrapper">
              <div className="training-info__info-wrapper">
                <div className="training-info__input training-info__input--training">
                  <label>
                    <span className="training-info__label">
                      {name}
                    </span>
                    <input
                      type="text"
                      name="training"
                      defaultValue={name}
                      disabled
                    />
                  </label>
                </div>
                <div className="training-info__textarea">
                  <label>
                    <span className="training-info__label">
                    Описание тренировки
                    </span>
                    <textarea name="description" defaultValue={description} disabled>
                    </textarea>
                  </label>
                </div>
              </div>
              <div className="training-info__rating-wrapper">
                <div className="training-info__input training-info__input--rating">
                  <label>
                    <span className="training-info__label">
                    Рейтинг
                    </span>
                    <span className="training-info__rating-icon">
                      <svg width="18" height="18" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </span>
                    <input
                      type="number"
                      name="rating"
                      defaultValue={rating}
                      disabled
                    />
                  </label>
                </div>
                <ul className="training-info__list">
                  { workoutType.map((item)=>(
                    <li className="training-info__item" key={`${item}-${id}`}>
                      <div className="hashtag hashtag--white">
                        <span>#{WorkoutTypeToName[item]}</span>
                      </div>
                    </li>
                  ))}
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white">
                      <span>#{UserSexToHashtagName[sex]}</span>
                    </div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white">
                      <span>#{calories}ккал</span>
                    </div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white">
                      <span>#{workoutTime}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="training-info__price-wrapper">
                <div className="training-info__input training-info__input--price">
                  <label>
                    <span className="training-info__label">
                    Стоимость
                    </span>
                    <input
                      type="text"
                      name="price"
                      value={`${price} ₽`}
                      disabled
                    />
                  </label>
                  <div className="training-info__error">
                  Введите число
                  </div>
                </div>
                <button
                  className="btn training-info__buy"
                  type="button"
                >
                Купить
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="training-video">
        <h2 className="training-video__title">Видео</h2>
        <div className="training-video__video">
          <div className="training-video__thumbnail">
            <picture>
              <source
                type="image/webp"
                srcSet="img/content/training-video/video-thumbnail.webp, img/content/training-video/video-thumbnail@2x.webp 2x"
              />
              <img
                src="img/content/training-video/video-thumbnail.png"
                srcSet="img/content/training-video/video-thumbnail@2x.png 2x"
                width="922"
                height="566"
                alt="Обложка видео"
              />
            </picture>
          </div>
          <button className="training-video__play-button btn-reset">
            <svg width="18" height="30" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
        <div className="training-video__buttons-wrapper">
          <button
            className="btn training-video__button training-video__button--start"
            type="button"
            disabled
          >
          Приступить
          </button>
          <button
            className="btn training-video__button training-video__button--stop"
            type="button"
          >
          Закончить
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkoutInfoCard;
