import { ChangeEvent, FormEvent, useLayoutEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { UpdateUserDto } from '@dto/user/update/update-user.dto';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { updateUser } from '@store/user-data/api-actions';
import { getCurrentUserData, getUserUpdatingStatus } from '@store/user-data/selectors';
import { FitnessLevel } from '@frontend-types/common/fitness-level.enum';
import { Location } from '@frontend-types/common/location.enum';
import { UserRole } from '@frontend-types/common/user-role.enum';
import { UserSex } from '@frontend-types/common/user-sex.enum';
import { WorkoutType } from '@frontend-types/common/workout-type.enum';
import { Coach } from '@frontend-types/user/coach.interface';
import { Sportsman } from '@frontend-types/user/sportsman.interface';
import { UserInfoInterface } from '@frontend-types/user/user.interface';
import {
  DefaultParam,
  FitnessLevelToName,
  FormFieldName,
  LocationToName,
  ReadyToTrainText,
  UserFormError,
  UserSexToName,
  WorkoutTypeToName,
} from '@utils/constant';
import { capitalizeFirstLetter } from '@utils/helpers';
import { DescriptionLength, NameLength, WORKOUT_TYPE_AMOUNT } from '@utils/validation.constant';
import Loader from '../loader/loader';

function UserInfo(): JSX.Element {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(getCurrentUserData);
  const isUpdating = useAppSelector(getUserUpdatingStatus);
  const [isEditing, setIsEditing] = useState(DefaultParam.Status);
  const [readyStatus, setReadyStatus] = useState(DefaultParam.Status);
  const [formData, setFormData] = useState<UserInfoInterface | null>(null);
  const [isOpened, setIsOpened] = useState('');
  const [avatar, setAvatar] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useLayoutEffect(() => {
    if (userInfo) {
      setFormData(userInfo);

      const { role, sportsmanInfo, coachInfo } = userInfo;
      if (role === UserRole.Coach && coachInfo?.isPersonal) {
        setReadyStatus(coachInfo.isPersonal);
      }
      if (role === UserRole.Sportsman && sportsmanInfo?.isReady) {
        setReadyStatus(sportsmanInfo.isReady);
      }
    }
  }, [userInfo]);

  if (!userInfo || !formData) {
    return <Loader />;
  }
  const handleDataSubmit = (data: UpdateUserDto) => dispatch(updateUser({...data, avatarFile:avatar}));

  const handleFormButtonClick = () => {
    setIsEditing((prev) => !prev);
  };

  const handleToggleButtonClick = (name: string) => {
    setIsOpened(name);
  };

  const handleSelectChange = (
    item: Location | UserSex | FitnessLevel,
    name: string
  ) => {
    setFormData({ ...formData, [name]: item });
    setIsOpened('');
  };

  const handleTextFieldChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStatusChange = (status: boolean) => {
    setReadyStatus((prev) => !prev);
    switch (userInfo.role) {
      case UserRole.Coach: {
        const coachInfo = { ...formData.coachInfo, isPersonal: status } as Coach;
        setFormData({ ...formData, coachInfo });
        break;
      }
      case UserRole.Sportsman: {
        const sportsmanInfo = { ...formData.sportsmanInfo, isReady: status } as Sportsman;
        setFormData({ ...formData, sportsmanInfo });
        break;
      }
    }
  };

  const handleWorkoutTypesChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value as WorkoutType;
    const workoutTypes = formData.workoutType;
    if (!workoutTypes) {
      setFormData({ ...formData, workoutType: [value] });
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
    setFormData({ ...formData, workoutType: types });
  };

  const handleAvatarUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setAvatar(evt.target.files[0]);
  };

  const handleAvatarOpen = () => {
    if(fileInputRef.current){
      fileInputRef.current.click();
    }
  };

  const handleAvatarDelete = () => {
    if(fileInputRef.current){
      fileInputRef.current.value = '';
      setAvatar(undefined);}
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const isValid =
      formData.name !== '' && formData.workoutType.length > DefaultParam.Amount;
    if (isValid) {
      handleDataSubmit(formData);
      setIsEditing(false);
    }
  };
  return (
    <section className="user-info" data-testid="user-info">
      <div className="user-info__header">
        <div className="input-load-avatar">
          <label>
            <input
              className="visually-hidden"
              type="file"
              ref={fileInputRef}
              name="user-photo-1"
              accept="image/png, image/jpeg"
              onChange={handleAvatarUpload}
              disabled={!isEditing}
            />
            <span className="input-load-avatar__avatar">
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  width={98}
                  height={98}
                  alt="user avatar"
                />
              ) : (
                <img
                  src={userInfo.avatarPath}
                  width={98}
                  height={98}
                  alt="user avatar"
                />
              )}
            </span>
          </label>

        </div>
        {isEditing && (
          <div className="user-info-edit__controls">
            <label
              className="user-info-edit__control-btn"
              aria-label="обновить"
              htmlFor="photoUser"
              onClick={handleAvatarOpen}
            >
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-change"></use>
              </svg>
            </label>
            <button
              className="user-info-edit__control-btn"
              aria-label="удалить"
              onClick={handleAvatarDelete}
            >
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-trash"></use>
              </svg>
            </button>
          </div>
        )}
      </div>
      <form
        className="user-info__form"
        action="/"
        method="post"
        onSubmit={handleFormSubmit}
      >
        {isEditing && (
          <button
            className="btn-flat btn-flat--underlined user-info__edit-button"
            type="submit"
            aria-label="Сохранить"
          >
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"></use>
            </svg>
            <span>Сохранить</span>
          </button>
        ) }
        {!isEditing && (
          <button
            className="btn-flat btn-flat--underlined user-info__edit-button"
            type="button"
            aria-label="Редактировать"
            onClick={handleFormButtonClick}
            disabled={isUpdating}
          >
            {' '}
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"></use>
            </svg>
            <span>Редактировать</span>
          </button>
        )}

        <div className="user-info__section">
          <h2 className="user-info__title">Обо мне</h2>
          <div className="custom-input custom-input--readonly user-info__input">
            <label>
              <span className="custom-input__label">Имя</span>
              <span className="custom-input__wrapper">
                <input
                  type="text"
                  name={FormFieldName.Name}
                  defaultValue={formData.name}
                  minLength={NameLength.Min}
                  maxLength={NameLength.Max}
                  onChange={handleTextFieldChange}
                  disabled={!isEditing}
                />
              </span>
            </label>
          </div>
          <div className="custom-textarea custom-textarea--readonly user-info__textarea">
            <label>
              <span className="custom-textarea__label">Описание</span>
              <textarea
                name={FormFieldName.Description}
                onBlur={handleTextFieldChange}
                minLength={DescriptionLength.Min}
                maxLength={DescriptionLength.Max}
                placeholder=" "
                disabled={!isEditing}
                defaultValue={formData.description}
              >
              </textarea>
            </label>
          </div>
        </div>
        <div className="user-info__section user-info__section--status">
          <h2 className="user-info__title user-info__title--status">Статус</h2>
          <div className="custom-toggle custom-toggle--switch user-info__toggle">
            <label>
              <input
                type="checkbox"
                name="ready-for-training"
                checked={readyStatus}
                onChange={() => handleStatusChange(!readyStatus)}
                disabled={!isEditing}
              />
              <span className="custom-toggle__icon">
                <svg width="9" height="6" aria-hidden="true">
                  <use xlinkHref="#arrow-check"></use>
                </svg>
              </span>
              <span className="custom-toggle__label">
                {userInfo.role === UserRole.Coach
                  ? ReadyToTrainText.Coach[0]
                  : ReadyToTrainText.User[0]}
              </span>
            </label>
          </div>
        </div>
        <div className="user-info__section">
          <h2 className="user-info__title user-info__title--specialization">
            Специализация
          </h2>
          <div className="specialization-checkbox user-info__specialization">
            {Object.values(WorkoutType).map((item) => (
              <div className="btn-checkbox" key={item}>
                <label>
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    name="specialization"
                    value={item}
                    onChange={handleWorkoutTypesChange}
                    checked={formData.workoutType.includes(item)}
                    disabled={!isEditing}
                  />
                  <span className="btn-checkbox__btn">
                    {capitalizeFirstLetter(WorkoutTypeToName[item])}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`${
            !isEditing ? 'custom-select--readonly' : ''
          } custom-select
        ${
    isOpened === FormFieldName.Location
      ? 'is-open'
      : 'custom-select--not-selected'
    }
        user-info${isEditing ? '-edit' : ''}__select`}
        >
          <span className="custom-select__label">Локация</span>
          <div className="custom-select__placeholder">
            ст. м. {LocationToName[formData.location]}
          </div>
          <button
            className="custom-select__button"
            type="button"
            aria-label="Выберите одну из опций"
            onClick={() => handleToggleButtonClick(FormFieldName.Location)}
            disabled={!isEditing}
          >
            <span className="custom-select__text">
              {LocationToName[formData.location]}
            </span>
            <span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg>
            </span>
          </button>
          <ul className="custom-select__list" role="listbox">
            {Object.values(Location).map((item) => (
              <li
                key={item}
                role="option"
                tabIndex={0}
                className="custom-select__item"
                aria-selected={item === formData.location}
                value={item}
                onClick={() =>
                  handleSelectChange(item, FormFieldName.Location)}
              >
                {LocationToName[item]}
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`${
            !isEditing ? 'custom-select--readonly' : ''
          } custom-select
        ${
    isOpened === FormFieldName.Sex
      ? 'is-open'
      : 'custom-select--not-selected'
    }
        user-info${isEditing ? '-edit' : ''}__select`}
        >
          <span className="custom-select__label">Пол</span>
          <div className="custom-select__placeholder">
            {UserSexToName[formData.sex]}
          </div>
          <button
            className="custom-select__button"
            type="button"
            aria-label="Выберите одну из опций"
            onClick={() => handleToggleButtonClick(FormFieldName.Sex)}
            disabled={!isEditing}
          >
            <span className="custom-select__text"></span>
            <span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg>
            </span>
          </button>
          <ul className="custom-select__list" role="listbox">
            {Object.values(UserSex).map((item) => (
              <li
                key={item}
                role="option"
                tabIndex={0}
                className="custom-select__item"
                aria-selected={item === formData.sex}
                value={item}
                onClick={() => handleSelectChange(item, FormFieldName.Sex)}
              >
                {UserSexToName[item]}
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`${
            !isEditing ? 'custom-select--readonly' : ''
          } custom-select
        ${
    isOpened === FormFieldName.FitnessLevel
      ? 'is-open'
      : 'custom-select--not-selected'
    }
        user-info${isEditing ? '-edit' : ''}__select`}
        >
          <span className="custom-select__label">Уровень</span>
          <div className="custom-select__placeholder">
            {FitnessLevelToName[formData.fitnessLevel]}
          </div>
          <button
            className="custom-select__button"
            type="button"
            aria-label="Выберите одну из опций"
            onClick={() =>
              handleToggleButtonClick(FormFieldName.FitnessLevel)}
            disabled={!isEditing}
          >
            <span className="custom-select__text"></span>
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
                aria-selected={item === formData.fitnessLevel}
                value={item}
                onClick={() =>
                  handleSelectChange(item, FormFieldName.FitnessLevel)}
              >
                {FitnessLevelToName[item]}
              </li>
            ))}
          </ul>
        </div>
      </form>
    </section>
  );
}

export default UserInfo;
