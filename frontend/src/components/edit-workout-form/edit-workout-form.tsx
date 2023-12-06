import { User } from '../../types/user/user.interface';
import { Workout } from '../../types/workout/workout.interface';
import {
  DefaultParam,
  UserSexToHashtagName,
  WorkoutTypeToName,
} from '../../utils/constant';
import { useState, ChangeEvent } from 'react';

type EditWorkoutFormProps = {
  workout: Workout;
  coach: User;
};

function EditWorkoutForm({
  workout,
  coach,
}: EditWorkoutFormProps): JSX.Element {
  const {
    id,
    name,
    description,
    rating,
    workoutType,
    calories,
    workoutTime,
    sex,
    price: workoutPrice,
    specialPrice,
    isSpecialOffer,
  } = workout;
  const { name: coachName, avatarPath } = coach;
  const currentPrice = specialPrice ? specialPrice : workoutPrice;
  const [isEditing, setIsEditing] = useState(DefaultParam.Status);
  const [workoutData, setWorkoutData] = useState({
    name,
    description,
    price: currentPrice,
    isSpecialOffer,
  });

  const handleIsEditing = () => setIsEditing((prev) => !prev);

  const handleInputChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name: inputName, value, type } = evt.target;
    const fieldValue = type === 'number' ? +value : value;
    setWorkoutData({ ...workoutData, [inputName]: fieldValue });
  };
  return (
    <div className="training-card training-card--edit">
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
          {!isEditing && (
            <button
              className="btn-flat btn-flat--light training-info__edit training-info__edit"
              type="button"
              onClick={handleIsEditing}
            >
              <svg width="12" height="12" aria-hidden="true">
                <use xlinkHref="#icon-edit"></use>
              </svg>
              <span>Редактировать</span>
            </button>
          )}
          {isEditing && (
            <button
              className="btn-flat btn-flat--light btn-flat--underlined training-info__edit training-info__edit--save"
              type="button"
            >
              <svg width="12" height="12" aria-hidden="true">
                <use xlinkHref="#icon-edit"></use>
              </svg>
              <span>Сохранить</span>
            </button>
          )}
        </div>
        <div className="training-info__main-content">
          <form action="#" method="get">
            <div className="training-info__form-wrapper">
              <div className="training-info__info-wrapper">
                <div className="training-info__input training-info__input--training">
                  <label>
                    <span className="training-info__label">
                      Название тренировки
                    </span>
                    <input
                      type="text"
                      name="training"
                      defaultValue={workoutData.name}
                      disabled={!isEditing}
                      onBlur={handleInputChange}
                    />
                  </label>
                  <div className="training-info__error">Обязательное поле</div>
                </div>
                <div className="training-info__textarea">
                  <label>
                    <span className="training-info__label">
                      Описание тренировки
                    </span>
                    <textarea
                      name="description"
                      onBlur={handleInputChange}
                      disabled={!isEditing}
                    >
                      {workoutData.description}
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
                      value={rating}
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
                      defaultValue={workoutData.price}
                      disabled={!isEditing}
                    />
                  </label>
                  <div className="training-info__error">Введите число</div>
                </div>
                <button
                  className="btn-flat btn-flat--light btn-flat--underlined training-info__discount"
                  type="button"
                >
                  <svg width="14" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-discount"></use>
                  </svg>
                  <span>
                    {workoutData.isSpecialOffer
                      ? 'Отменить скидку'
                      : 'Сделать скидку 10%'}
                  </span>
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
              <img
                src="/img/content/training-video/video-thumbnail.png"
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
        <div className="training-video__drop-files">
          <form action="#" method="post">
            <div className="training-video__form-wrapper">
              <div className="drag-and-drop">
                <label>
                  <span className="drag-and-drop__label">
                    Загрузите сюда файлы формата MOV, AVI или MP4
                    <svg width="20" height="20" aria-hidden="true">
                      <use xlinkHref="#icon-import-video"></use>
                    </svg>
                  </span>
                  <input type="file" name="import" accept=".mov, .avi, .mp4" />
                </label>
              </div>
            </div>
          </form>
        </div>
        <div className="training-video__buttons-wrapper">
          <button
            className="btn training-video__button training-video__button--start"
            type="button"
            disabled
          >
            Приступить
          </button>
          <div className="training-video__edit-buttons">
            <button className="btn" type="button">
              Сохранить
            </button>
            <button className="btn btn--outlined" type="button">
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditWorkoutForm;
