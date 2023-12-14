import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { CreateWorkoutDto } from '../../dto/workout/create-workout.dto';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createWorkout } from '../../store/workout-data/api-actions';
import {
  getWorkoutPostingStatus,
} from '../../store/workout-data/selectors';
import { FitnessLevel } from '../../types/common/fitness-level.enum';
import { UserSex } from '../../types/common/user-sex.enum';
import { WorkoutTime } from '../../types/common/workout-time.enum';
import { WorkoutType } from '../../types/common/workout-type.enum';
import {
  DefaultParam,
  FitnessLevelToName,
  FormFieldName,
  PostWorkoutButtonText,
  UserFormError,
  UserSexToFormName,
  WorkoutTypeToName,
} from '../../utils/constant';
import { generateRandomNumber } from '../../utils/helpers';
import {
  CaloriesAmount,
  DescriptionLength,
  NameLength,
  WORKOUT_TYPE_AMOUNT,
} from '../../utils/validation.constant';
import InputErrorField from '../input-error-field/input-error-field';

function AddWorkoutForm(): JSX.Element {
  const workoutDataDefault = {
    workoutTime: WorkoutTime.Basic,
    fitnessLevel: FitnessLevel.Beginner,
    sex: UserSex.Any,
    name: '',
    description: '',
    calories: DefaultParam.Amount,
    price: DefaultParam.Amount,
  };
  const [isOpened, setIsOpened] = useState<string>('');
  const [workoutTypes, setWorkoutTypes] = useState<WorkoutType[]>([]);
  const [workoutData, setWorkoutData] = useState(workoutDataDefault);
  const [isEmptyShown, SetIsEmptyShown] = useState(false);
  const [videoFile, setVideoFile] = useState<File | undefined>();
  const imageId = generateRandomNumber();
  const dispatch = useAppDispatch();
  const isPosting = useAppSelector(getWorkoutPostingStatus);

  const handleDataSubmit = (data: CreateWorkoutDto, file: File) =>
    dispatch(createWorkout({...data, videoFile:file}));

  const handleToggleButtonClick = (field: string) => {
    setIsOpened(field);
  };

  const handleWorkoutTypesChange = (value: WorkoutType) => {
    if (!workoutTypes) {
      setWorkoutTypes([value]);
      return;
    }
    const isExists = workoutTypes.includes(value);
    if (workoutTypes.length === WORKOUT_TYPE_AMOUNT && !isExists) {
      toast.warn(UserFormError.InvalidTypesLength);
      return;
    }
    const types = isExists
      ? workoutTypes.filter((item) => item !== value)
      : workoutTypes.concat(value);
    setWorkoutTypes(types);
    setIsOpened('');
  };

  const handleSelectChange = <T,>(value: T, name: string) => {
    setWorkoutData({ ...workoutData, [name]: value });
    setIsOpened('');
  };

  const handleInputChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = evt.target;
    const fieldValue = type === 'number' ? +value : value;
    setWorkoutData({ ...workoutData, [name]: fieldValue });
  };

  const handleVideoUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setVideoFile(evt.target.files[0]);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const isMissingData = Object.values(workoutData).some(
      (item) => item === ''
    );
    SetIsEmptyShown(isMissingData);
    if (!isEmptyShown && videoFile) {
      handleDataSubmit(
        {
          ...workoutData,
          workoutType: workoutTypes,
          photo: `/img/content/thumbnails/training-${imageId}.jpg`,
          isSpecialOffer: DefaultParam.Status
        },
        videoFile
      );
    }
  };
  return (
    <div className="popup-form__form">
      <form method="post" action="/" onSubmit={handleFormSubmit} data-testid="create-training">
        <div className="create-training">
          <div className="create-training__wrapper">
            <div className="create-training__block">
              <h2 className="create-training__legend">Название тренировки</h2>
              <div className="custom-input create-training__input">
                <label>
                  <span className="custom-input__wrapper">
                    <input
                      type="text"
                      name={FormFieldName.Name}
                      minLength={NameLength.Min}
                      maxLength={NameLength.Max}
                      onBlur={handleInputChange}
                      required
                      data-testid="name-training"
                    />
                  </span>
                </label>
                {isEmptyShown && workoutData[FormFieldName.Name] === '' && (
                  <InputErrorField />
                )}
              </div>
            </div>
            <div className="create-training__block">
              <h2 className="create-training__legend">
                Характеристики тренировки
              </h2>
              <div className="create-training__info">
                <div
                  className={`custom-select ${
                    isOpened === FormFieldName.WorkoutType
                      ? 'is-open'
                      : 'custom-select--not-selected'
                  }`}
                >
                  {' '}
                  <span className="custom-select__label">
                    Выберите тип тренировки
                  </span>
                  <button
                    className="custom-select__button"
                    type="button"
                    aria-label="Выберите одну из опций"
                    onClick={() =>
                      handleToggleButtonClick(FormFieldName.WorkoutType)}
                  >
                    <span className="custom-select__placeholder">
                      {workoutTypes
                        .map((item) => WorkoutTypeToName[item])
                        .join(', ')}
                    </span>
                    <span className="custom-select__icon">
                      <svg width="15" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-down"></use>
                      </svg>
                    </span>
                  </button>
                  <ul className="custom-select__list" role="listbox">
                    {Object.values(WorkoutType).map((item) => (
                      <li
                        key={item}
                        role="option"
                        tabIndex={0}
                        className="custom-select__item"
                        aria-selected={workoutTypes.includes(item)}
                        value={item}
                        onClick={() => handleWorkoutTypesChange(item)}
                      >
                        {WorkoutTypeToName[item]}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="custom-input custom-input--with-text-right">
                  <label>
                    <span className="custom-input__label">
                      Сколько калорий потратим
                    </span>
                    <span className="custom-input__wrapper">
                      <input
                        type="number"
                        name="calories"
                        onBlur={handleInputChange}
                        min={CaloriesAmount.Min}
                        max={CaloriesAmount.Max}
                        required
                      />
                      <span className="custom-input__text">ккал</span>
                    </span>
                  </label>
                  {isEmptyShown && !workoutData.calories && <InputErrorField />}
                </div>
                <div
                  className={`custom-select ${
                    isOpened === FormFieldName.WorkoutTime
                      ? 'is-open'
                      : 'custom-select--not-selected'
                  }`}
                >
                  <span className="custom-select__label">
                    Сколько времени потратим
                  </span>
                  <button
                    className="custom-select__button"
                    type="button"
                    aria-label="Выберите одну из опций"
                    onClick={() =>
                      handleToggleButtonClick(FormFieldName.WorkoutTime)}
                  >
                    <span className="custom-select__placeholder">
                      {workoutData.workoutTime}
                    </span>
                    <span className="custom-select__icon">
                      <svg width="15" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-down"></use>
                      </svg>
                    </span>
                  </button>
                  <ul className="custom-select__list" role="listbox">
                    {Object.values(WorkoutTime).map((item) => (
                      <li
                        key={item}
                        role="option"
                        tabIndex={0}
                        className="custom-select__item"
                        aria-selected={item === workoutData.workoutTime}
                        value={item}
                        onClick={() =>
                          handleSelectChange<WorkoutTime>(
                            item,
                            FormFieldName.WorkoutTime
                          )}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="custom-input custom-input--with-text-right">
                  <label>
                    <span className="custom-input__label">
                      Стоимость тренировки
                    </span>
                    <span className="custom-input__wrapper">
                      <input
                        type="number"
                        name={FormFieldName.Price}
                        min={DefaultParam.Amount}
                        onBlur={handleInputChange}
                      />
                      <span className="custom-input__text">₽</span>
                    </span>
                  </label>
                </div>
                <div
                  className={`custom-select ${
                    isOpened === FormFieldName.FitnessLevel
                      ? 'is-open'
                      : 'custom-select--not-selected'
                  }`}
                >
                  {' '}
                  <span className="custom-select__label">
                    Выберите уровень тренировки
                  </span>
                  <button
                    className="custom-select__button"
                    type="button"
                    aria-label="Выберите одну из опций"
                    onClick={() =>
                      handleToggleButtonClick(FormFieldName.FitnessLevel)}
                  >
                    <span className="custom-select__placeholder">
                      {FitnessLevelToName[workoutData.fitnessLevel]}
                    </span>
                    <span className="custom-select__icon">
                      <svg width="15" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-down"></use>
                      </svg>
                    </span>
                  </button>
                  <ul className="custom-select__list" role="listbox">
                    {Object.values(FitnessLevel).map((item) => (
                      <li
                        key={item}
                        role="option"
                        tabIndex={0}
                        className="custom-select__item"
                        aria-selected={item === workoutData.fitnessLevel}
                        value={item}
                        onClick={() =>
                          handleSelectChange<FitnessLevel>(
                            item,
                            FormFieldName.FitnessLevel
                          )}
                      >
                        {FitnessLevelToName[item]}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="create-training__radio-wrapper">
                  <span className="create-training__label">
                    Кому подойдет тренировка
                  </span>
                  <br />
                  <div className="custom-toggle-radio create-training__radio">
                    {Object.entries(UserSexToFormName).map(([key, value]) => (
                      <div className="custom-toggle-radio__block" key={key}>
                        <label>
                          <input
                            type="radio"
                            name={FormFieldName.Sex}
                            value={key}
                            checked={key === workoutData.sex}
                            onChange={handleInputChange}
                          />
                          <span className="custom-toggle-radio__icon"></span>
                          <span className="custom-toggle-radio__label">
                            {value}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="create-training__block">
              <h2 className="create-training__legend">Описание тренировки</h2>
              <div className="custom-textarea create-training__textarea">
                <label>
                  <textarea
                    placeholder=" "
                    name={FormFieldName.Description}
                    onBlur={handleInputChange}
                    minLength={DescriptionLength.Min}
                    maxLength={DescriptionLength.Max}
                    defaultValue={workoutData.description}
                  >
                  </textarea>
                </label>
              </div>
            </div>
            <div className="create-training__block">
              <h2 className="create-training__legend">
                Загрузите видео-тренировку
              </h2>
              <div className="drag-and-drop create-training__drag-and-drop">
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
                    required
                    onChange={handleVideoUpload}
                  />
                </label>
              </div>
            </div>
          </div>
          <button
            className="btn create-training__button"
            type="submit"
            disabled={isPosting}
          >
            {isPosting
              ? PostWorkoutButtonText.Posting
              : PostWorkoutButtonText.Default}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddWorkoutForm;
