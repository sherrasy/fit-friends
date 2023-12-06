import { ChangeEvent, useRef, useState } from 'react';
import { UpdateWorkoutDto } from '../../dto/workout/update-workout.dto';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateWorkout } from '../../store/workout-data/api-actions';
import { getWorkoutPostingStatus } from '../../store/workout-data/selectors';
import { User } from '../../types/user/user.interface';
import { Workout } from '../../types/workout/workout.interface';
import {
  DefaultParam,
  FormFieldName,
  UserSexToHashtagName,
  WorkoutTypeToName,
} from '../../utils/constant';
import { DescriptionLength, NameLength } from '../../utils/validation.constant';

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
    price,
    isSpecialOffer,
    videoPath,
  } = workout;
  const { name: coachName, avatarPath } = coach;
  const [isEditing, setIsEditing] = useState(DefaultParam.Status);
  const [workoutData, setWorkoutData] = useState({
    id,
    name,
    description,
    price,
    isSpecialOffer,
  });
  const [videoFile, setVideoFile] = useState<File | undefined>();
  const [isPlaying, setIsPlaying] = useState(DefaultParam.Status);
  const [videoSource, setVideoSource] = useState(videoPath);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const isPosting = useAppSelector(getWorkoutPostingStatus);
  const handleDataSubmit = (dto: UpdateWorkoutDto) =>
    dispatch(updateWorkout(dto));

  const handleIsEditing = () => setIsEditing((prev) => !prev);

  const handleInputChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name: inputName, value, type } = evt.target;
    const fieldValue = type === 'number' ? +value : value;
    setWorkoutData({ ...workoutData, [inputName]: fieldValue });
  };

  const handleVideoUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setVideoFile(evt.target.files[0]);
  };

  const handleSpecialChange = () => {
    setWorkoutData({
      ...workoutData,
      isSpecialOffer: !workoutData.isSpecialOffer,
    });
  };

  const handleSubmitForm = () => {
    const data = {
      ...workoutData,
      videoFile,
    };
    handleDataSubmit(data);
  };
  const handleVideoSubmit = () => {
    const data = {
      id,
      videoFile,
    };
    handleDataSubmit(data);
  };

  const handleVideoDelete = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setVideoFile(undefined);
      setVideoSource(undefined);
    }
  };

  const handlePlayingClick = () =>{
    setIsPlaying((prev) => !prev);
    if (videoRef.current === null) {
      return;
    }
    if(isPlaying){
      videoRef.current.play();
      return;
    }
    videoRef.current.pause();
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
              onClick={handleSubmitForm}
              disabled={isPosting}
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
                      name={FormFieldName.Name}
                      minLength={NameLength.Min}
                      maxLength={NameLength.Max}
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
                      onBlur={handleInputChange}
                      name={FormFieldName.Description}
                      minLength={DescriptionLength.Min}
                      maxLength={DescriptionLength.Max}
                      disabled={!isEditing}
                      defaultValue={workoutData.description}
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
                      type="number"
                      name={FormFieldName.Price}
                      defaultValue={workoutData.price}
                      onBlur={handleInputChange}
                      disabled={!isEditing}
                    />
                  </label>
                  <div className="training-info__error">Введите число</div>
                </div>
                <button
                  className="btn-flat btn-flat--light btn-flat--underlined training-info__discount"
                  type="button"
                  onClick={handleSpecialChange}
                  disabled={!isEditing}
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
            {!videoFile && videoSource && (
              <video
                src={videoSource}
                poster="/img/content/training-video/video-thumbnail.png"
                width="922"
                height="566"
                ref={videoRef}
                controls={isPlaying}
              />
            )}
            {videoFile && (
              <video
                src={URL.createObjectURL(videoFile)}
                poster="/img/content/training-video/video-thumbnail.png"
                width="922"
                height="566"
                ref={videoRef}
                controls={isPlaying}
              />
            )}
          </div>
          {!isPlaying && (videoFile || videoSource) && (
            <button
              className="training-video__play-button btn-reset"
              onClick={handlePlayingClick}
            >
              <svg width="18" height="30" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          )}
        </div>
        <div className={`training-video__drop-files ${!videoSource && !videoFile ? 'visible-input' : ''}`}>
          <form action="#" method="post">
            <div className="training-video__form-wrapper">
              <div className="drag-and-drop">
                <label>
                  <span className="drag-and-drop__label">
                    {videoFile
                      ? videoFile.name
                      : 'Загрузите сюда файлы формата MOV, AVI или MP4'}
                    <svg width="20" height="20" aria-hidden="true">
                      <use xlinkHref="#icon-import-video"></use>
                    </svg>
                  </span>
                  <input
                    type="file"
                    name="import"
                    accept=".mov, .avi, .mp4"
                    ref={inputRef}
                    required
                    onChange={handleVideoUpload}
                    disabled={!isEditing}
                  />
                </label>
              </div>
            </div>
          </form>
        </div>
        {isEditing && (
          <div className="training-video__buttons-wrapper">
            <div className="training-video__edit-buttons">
              <button
                className="btn"
                type="button"
                onClick={handleVideoSubmit}
                disabled={isPosting}
              >
                Сохранить
              </button>
              <button
                className="btn btn--outlined"
                type="button"
                onClick={handleVideoDelete}
                disabled={isPosting}
              >
                Удалить
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditWorkoutForm;
