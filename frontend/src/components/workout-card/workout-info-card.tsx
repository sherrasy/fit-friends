import { useRef, useState } from 'react';
import { Order } from '../../types/reaction/order.interface';
import { User } from '../../types/user/user.interface';
import { Workout } from '../../types/workout/workout.interface';
import {
  DefaultParam,
  UserSexToHashtagName,
  WorkoutTypeToName,
} from '../../utils/constant';

type WorkoutInfoCardProps = {
  workout: Workout;
  coach: User;
  order: Order | undefined;
};

function WorkoutInfoCard({
  workout,
  coach,
  order,
}: WorkoutInfoCardProps): JSX.Element {
  const { name: coachName, avatarPath } = coach;
  const {
    id,
    name,
    description,
    rating,
    workoutType,
    calories,
    workoutTime,
    sex,
    price,
    specialPrice,
    videoPath,
  } = workout;
  const isBought = !!order;
  const currentPrice = specialPrice ? specialPrice : price;
  const [isPlaying, setIsPlaying] = useState(DefaultParam.Status);
  const [isVideoActive, setIsVideoActive] = useState(DefaultParam.Status);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoActiveChange = () => setIsVideoActive((prev) => !prev);

  const handlePlayingClick = () => {
    setIsPlaying((prev) => !prev);
    if (videoRef.current === null) {
      return;
    }
    if (isPlaying) {
      videoRef.current.play();
      return;
    }
    videoRef.current.pause();
  };
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
                    <span className="training-info__label">{name}</span>
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
                    <textarea
                      name="description"
                      defaultValue={description}
                      disabled
                    >
                    </textarea>
                  </label>
                </div>
              </div>
              <div className="training-info__rating-wrapper">
                <div className="training-info__input training-info__input--rating">
                  <label>
                    <span className="training-info__label">Рейтинг</span>
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
                  {workoutType.map((item) => (
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
                    <span className="training-info__label">Стоимость</span>
                    <input
                      type="text"
                      name="price"
                      value={`${currentPrice} ₽`}
                      disabled
                    />
                  </label>
                  <div className="training-info__error">Введите число</div>
                </div>
                <button
                  className="btn training-info__buy"
                  type="button"
                  disabled={isBought}
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
        {videoPath && (
          <div className="training-video__video">
            <div className="training-video__thumbnail">
              <video
                src={videoPath}
                poster="/img/content/training-video/video-thumbnail.png"
                width="922"
                height="566"
                ref={videoRef}
                controls={isPlaying}
              />
            </div>

            {!isPlaying && (
              <button
                className="training-video__play-button btn-reset"
                onClick={handlePlayingClick}
                disabled={!isVideoActive}
              >
                <svg width="18" height="30" aria-hidden="true">
                  <use xlinkHref="#icon-arrow"></use>
                </svg>
              </button>
            )}
          </div>
        )}
        {!videoPath && <span> Видео недоступно</span>}
        <div className="training-video__buttons-wrapper">
          <button
            className="btn training-video__button training-video__button--start"
            type="button"
            disabled={!isBought || !videoPath}
            onClick={handleVideoActiveChange}
          >
            {!isVideoActive ? 'Приступить' : 'Закончить'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkoutInfoCard;
