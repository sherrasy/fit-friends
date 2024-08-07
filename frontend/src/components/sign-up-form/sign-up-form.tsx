/* eslint-disable indent */
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { checkEmail } from '@store/user-data/api-actions';
import { getEmailExistsStatus } from '@store/user-data/selectors';
import { Location } from '@frontend-types/common/location.enum';
import { UserRole } from '@frontend-types/common/user-role.enum';
import { UserSex } from '@frontend-types/common/user-sex.enum';
import { NewUserGeneral } from '@frontend-types/user/user.interface';
import {
  FormFieldName,
  LocationToName,
  UserFormError,
  UserSexToName,
} from '@utils/constant';
import { checkValidity } from '@utils/helpers';
import {
  NameLength,
  PasswordLength,
  ValidationPattern,
} from '@utils/validation.constant';
import InputErrorField from '../input-error-field/input-error-field';


type SignUpFormProps = {
  onSubmit: (userData: NewUserGeneral, file: File) => void;
};


function SignUpForm({onSubmit}:SignUpFormProps): JSX.Element {
  const signUpDataDefault = {
    name: '',
    email: '',
    birthDate: '',
    location: '',
    password: '',
    sex: UserSex.Male,
    role: UserRole.Sportsman,
  };
  const dispatch = useAppDispatch();
  const isEmailExists = useAppSelector(getEmailExistsStatus);
  const [formData, setFormData] = useState(signUpDataDefault);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isEmptyShown, SetIsEmptyShown] = useState(false);
  const [isErrorShown, SetIsErrorShown] = useState(false);
  const [errorMessage, SetErrorMessage] = useState('');
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<File>();

  const handleAgreedInputChange = () => {
    setIsAgreed((prev) => !prev);
  };

  const handleEmailCheck = () => {
    dispatch(checkEmail(formData.email));
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLocationChange = (location: Location) => {
    setFormData({ ...formData, location });
    setIsOpened(false);
  };

  const handleToggleButtonClick = () => {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  };

  const handleAvatarUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setAvatar(evt.target.files[0]);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!isAgreed) {
      const message = 'Ознакомьтесь с политикой конфиденциальности';
      SetErrorMessage(message);
      SetIsErrorShown(true);
      return;
    }
    const isMissingData = Object.values(formData).some((item) => item === '');
    SetIsEmptyShown(isMissingData);
    const isEmailValid =
      checkValidity(formData.email, ValidationPattern.Email) && !isEmailExists;
    if (isEmailExists) {
      toast.warn(UserFormError.InvalidEmail);
      return false;
    }
    const isPasswordValid = checkValidity(
      formData.password,
      ValidationPattern.Password
    );
    const isNameValid = checkValidity(formData.name, ValidationPattern.Name);
    const isFieldsValid = isEmailValid && isPasswordValid && isNameValid;
    if (isFieldsValid && !isEmptyShown && avatar) {
      onSubmit({
        ...formData,
        location: formData.location as Location,
        avatar:String(avatar),
      }, avatar);
      SetIsErrorShown(false);
    } else {
      const errorFields = ` Ошибка в полях: ${!isEmailValid ? 'email' : ''}${
        !isNameValid ? ' имя' : ''
      }${!isPasswordValid ? ' пароль' : ''}.`;
      SetErrorMessage(UserFormError.RegistrationFailed.concat(errorFields));
      SetIsErrorShown(true);
    }
  };

  return (
    <div className="popup-form popup-form--sign-up">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__title-wrapper">
            <h1 className="popup-form__title">Регистрация</h1>
          </div>
          <div className="popup-form__form">
            <form method="post" action="/" onSubmit={handleFormSubmit} data-testid='sign-up-form'>
              <div className="sign-up">
                <div className="sign-up__load-photo">
                  <div className="input-load-avatar">
                    <label>
                      <input
                        className="visually-hidden"
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleAvatarUpload}
                        required
                      />
                      {avatar ? (
                        <img
                          src={URL.createObjectURL(avatar)}
                          alt="Avatar preview"
                          className="register-form__avatar-preview"
                        />
                      ) : (
                        <span className="input-load-avatar__btn">
                          <svg width="20" height="20" aria-hidden="true">
                            <use xlinkHref="#icon-import"></use>
                          </svg>
                        </span>
                      )}
                    </label>
                  </div>
                  <div className="sign-up__description">
                    <h2 className="sign-up__legend">Загрузите фото профиля</h2>
                    <span className="sign-up__text">
                      JPG, PNG, оптимальный размер 100&times;100&nbsp;px
                    </span>
                  </div>
                </div>
                <div className="sign-up__data">
                  <div className="custom-input">
                    <label>
                      <span className="custom-input__label">Имя</span>
                      <span className="custom-input__wrapper">
                        <input
                          type="text"
                          name={FormFieldName.Name}
                          minLength={NameLength.Min}
                          maxLength={NameLength.Max}
                          onChange={handleInputChange}
                          required
                          data-testid={`new-${FormFieldName.Name}`}
                        />
                      </span>
                    </label>
                    {isEmptyShown &&
                      formData[FormFieldName.Name] === '' && (
                        <InputErrorField />
                      )}
                  </div>
                  <div className="custom-input">
                    <label>
                      <span className="custom-input__label">E-mail</span>
                      <span className="custom-input__wrapper">
                        <input
                          type="email"
                          name={FormFieldName.Email}
                          onChange={handleInputChange}
                          onBlur={handleEmailCheck}
                          required
                          data-testid={`new-${FormFieldName.Email}`}
                        />
                      </span>
                    </label>
                    {isEmptyShown &&
                      formData[FormFieldName.Email] === '' && (
                        <InputErrorField />
                      )}
                  </div>
                  <div className="custom-input">
                    <label>
                      <span className="custom-input__label">Дата рождения</span>
                      <span className="custom-input__wrapper">
                        <input
                          type="date"
                          name={FormFieldName.BirthDate}
                          max="2099-12-31"
                          onChange={handleInputChange}
                          required
                        />
                      </span>
                    </label>
                    {isEmptyShown &&
                      formData[FormFieldName.BirthDate] === '' && (
                        <InputErrorField />
                      )}
                  </div>
                  <div
                    className={`custom-select ${
                      isOpened ? 'is-open' : 'custom-select--not-selected'
                    }`}
                  >
                    <span className="custom-select__label">Ваша локация</span>
                    <div className="custom-select__placeholder">
                      {LocationToName[formData.location as Location]}
                    </div>
                    <button
                      className="custom-select__button"
                      type="button"
                      aria-label="Выберите одну из опций"
                      onClick={handleToggleButtonClick}
                    >
                      <span className="custom-select__text">
                        {LocationToName[formData.location as Location]}
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
                          onClick={() => handleLocationChange(item)}
                        >
                          {LocationToName[item]}
                        </li>
                      ))}
                    </ul>
                    {isEmptyShown &&
                      formData[FormFieldName.Location] === '' && (
                        <InputErrorField />
                      )}
                  </div>
                  <div className="custom-input">
                    <label>
                      <span className="custom-input__label">Пароль</span>
                      <span className="custom-input__wrapper">
                        <input
                          type="password"
                          name={FormFieldName.Password}
                          minLength={PasswordLength.Min}
                          maxLength={PasswordLength.Max}
                          onChange={handleInputChange}
                          autoComplete="off"
                        />
                      </span>
                    </label>
                    {isEmptyShown &&
                      formData[FormFieldName.Password] === '' && (
                        <InputErrorField />
                      )}
                  </div>
                  <div className="sign-up__radio">
                    <span className="sign-up__label">Пол</span>
                    <div className="custom-toggle-radio custom-toggle-radio--big">
                      {Object.values(UserSex).map((value) => (
                        <div className="custom-toggle-radio__block" key={value}>
                          <label>
                            <input
                              type="radio"
                              name={FormFieldName.Sex}
                              value={value}
                              checked={formData.sex === value}
                              onChange={handleInputChange}
                            />
                            <span className="custom-toggle-radio__icon"></span>
                            <span className="custom-toggle-radio__label">
                              {UserSexToName[value]}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="sign-up__role">
                  <h2 className="sign-up__legend">Выберите роль</h2>
                  <div className="role-selector sign-up__role-selector">
                    <div className="role-btn">
                      <label>
                        <input
                          className="visually-hidden"
                          type="radio"
                          name={FormFieldName.Role}
                          value={UserRole.Coach}
                          checked={formData.role === UserRole.Coach}
                          onChange={handleInputChange}
                        />
                        <span className="role-btn__icon">
                          <svg width="12" height="13" aria-hidden="true">
                            <use xlinkHref="#icon-cup"></use>
                          </svg>
                        </span>
                        <span className="role-btn__btn">
                          Я хочу тренировать
                        </span>
                      </label>
                    </div>
                    <div className="role-btn">
                      <label>
                        <input
                          className="visually-hidden"
                          type="radio"
                          name={FormFieldName.Role}
                          value={UserRole.Sportsman}
                          checked={formData.role === UserRole.Sportsman}
                          onChange={handleInputChange}
                        />
                        <span className="role-btn__icon">
                          <svg width="12" height="13" aria-hidden="true">
                            <use xlinkHref="#icon-weight"></use>
                          </svg>
                        </span>
                        <span className="role-btn__btn">
                          Я хочу тренироваться
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="sign-up__checkbox">
                  <label>
                    <input
                      type="checkbox"
                      value="user-agreement"
                      name="user-agreement"
                      onChange={handleAgreedInputChange}
                      checked={isAgreed}
                    />
                    <span className="sign-up__checkbox-icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg>
                    </span>
                    <span className="sign-up__checkbox-label">
                      Я соглашаюсь с {''}
                      <span>политикой конфиденциальности</span> компании
                    </span>
                  </label>
                </div>
                <button className="btn sign-up__button" type="submit">
                  Продолжить
                </button>
              </div>
            </form>
            {isErrorShown && (
              <p className="form-input__error">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
