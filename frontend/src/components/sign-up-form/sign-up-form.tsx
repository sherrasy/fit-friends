/* eslint-disable indent */
import { ChangeEvent, FormEvent, useState } from 'react';
import { Location } from '../../types/location.enum';
import { LocationToName, UserFormError, UserFormFieldName, UserSexToName } from '../../utils/constant';
import { UserSex } from '../../types/user-sex.enum';
import { UserRole } from '../../types/user-role.enum';
import { NameLength, PasswordLength, ValidationPattern } from '../../utils/validation.constant';
import { useAppDispatch } from '../../hooks';
import InputErrorField from '../input-error-field/input-error-field';
import { createNewUser } from '../../store/user-data/user-data';
import { NewUserGeneral } from '../../types/user.interface';
import { checkValidity } from '../../utils/helpers';

function SignUpForm():JSX.Element{
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
  const [formData, setFormData] = useState(signUpDataDefault);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isEmptyShown, SetIsEmptyShown] = useState(false);
  const [isErrorShown, SetIsErrorShown] = useState(false);
  const [errorMessage, SetErrorMessage] = useState('');
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleSubmitData = (data: NewUserGeneral) => dispatch(createNewUser(data));

  const handleAgreedInputChange = () => {
    setIsAgreed((prev)=> !prev);
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLocationChange = (location:Location) => {
    setFormData({ ...formData, location });
    setIsOpened(false);
  };

  const handleToggleButtonClick = () => {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(!isAgreed){
      const message = 'Ознакомьтесь с политикой конфиденциальности';
      SetErrorMessage(message);
      SetIsErrorShown(true);
      return;
    }
    const isMissingData = Object.values(formData).some((item)=> item === '');
    SetIsEmptyShown(isMissingData);
    const isEmailValid = checkValidity(formData.email, ValidationPattern.Email);
    const isPasswordValid = checkValidity(
      formData.password,
      ValidationPattern.Password
    );
    const isNameValid = checkValidity(
      formData.name,
      ValidationPattern.Name
    );
    const isFieldsValid = isEmailValid && isPasswordValid && isNameValid;
    if ( isFieldsValid && !isEmptyShown) {
      handleSubmitData({...formData, location:formData.location as Location});
      SetIsErrorShown(false);
    } else {
      const errorFields = ` Ошибка в полях: ${!isEmailValid ? 'email' : ''}${!isNameValid ? ' имя' : ''}${!isPasswordValid ? ' пароль' : ''}.`;
      SetErrorMessage( UserFormError.RegistrationFailed.concat(errorFields));
      SetIsErrorShown(true);
    }
  };

  return(
    <div className="popup-form popup-form--sign-up">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__title-wrapper">
            <h1 className="popup-form__title">Регистрация</h1>
          </div>
          <div className="popup-form__form">
            <form method="post" action="/" onSubmit={handleFormSubmit}>
              <div className="sign-up">
                <div className="sign-up__load-photo">
                  <div className="input-load-avatar">
                    <label>
                      <input
                        className="visually-hidden"
                        type="file"
                        accept="image/png, image/jpeg"
                      />
                      <span className="input-load-avatar__btn">
                        <svg width="20" height="20" aria-hidden="true">
                          <use xlinkHref="#icon-import"></use>
                        </svg>
                      </span>
                    </label>
                  </div>
                  <div className="sign-up__description">
                    <h2 className="sign-up__legend">
                    Загрузите фото профиля
                    </h2>
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
                        <input type="text" name={UserFormFieldName.Name} minLength={NameLength.Min} maxLength={NameLength.Max} onChange={handleInputChange} required/>
                      </span>
                    </label>
                    {isEmptyShown && formData[UserFormFieldName.Name] === '' && <InputErrorField/>}
                  </div>
                  <div className="custom-input">
                    <label>
                      <span className="custom-input__label">E-mail</span>
                      <span className="custom-input__wrapper">
                        <input type="email" name={UserFormFieldName.Email} onChange={handleInputChange} required />
                      </span>
                    </label>
                    {isEmptyShown && formData[UserFormFieldName.Email] === '' && <InputErrorField/>}
                  </div>
                  <div className="custom-input">
                    <label>
                      <span className="custom-input__label">
                      Дата рождения
                      </span>
                      <span className="custom-input__wrapper">
                        <input
                          type="date"
                          name={UserFormFieldName.BirthDate}
                          max="2099-12-31"
                          onChange={handleInputChange}
                          required
                        />
                      </span>
                    </label>
                    {isEmptyShown && formData[UserFormFieldName.BirthDate] === '' && <InputErrorField/>}
                  </div>
                  <div className={`custom-select ${isOpened ? 'is-open' : 'custom-select--not-selected'} not-empty`}>
                    <span className="custom-select__label">
                    Ваша локация
                    </span>
                    <button
                      className="custom-select__button"
                      type="button"
                      aria-label="Выберите одну из опций"
                      onClick={handleToggleButtonClick}
                    >
                      <span className="custom-select__text">{LocationToName[formData.location as Location]}</span>
                      <span className="custom-select__icon">
                        <svg width="15" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-down"></use>
                        </svg>
                      </span>
                    </button>
                    <ul className="custom-select__list" role="listbox">
                      { Object.values(Location).map((item)=>(
                        <li
                          key={item}
                          role="option"
                          tabIndex={0}
                          className="custom-select__item"
                          aria-selected={item === formData.location}
                          value={item}
                          onClick={()=>handleLocationChange(item)}
                        >
                          {LocationToName[item]}
                        </li>
                      )) }
                    </ul>
                    {isEmptyShown && formData[UserFormFieldName.Location] === '' && <InputErrorField/>}
                  </div>
                  <div className="custom-input">
                    <label>
                      <span className="custom-input__label">Пароль</span>
                      <span className="custom-input__wrapper">
                        <input
                          type="password"
                          name={UserFormFieldName.Password}
                          minLength={PasswordLength.Min}
                          maxLength={PasswordLength.Max}
                          onChange={handleInputChange}
                          autoComplete="off"
                        />
                      </span>
                    </label>
                    {isEmptyShown && formData[UserFormFieldName.Password] === '' && <InputErrorField/>}
                  </div>
                  <div className="sign-up__radio">
                    <span className="sign-up__label">Пол</span>
                    <div className="custom-toggle-radio custom-toggle-radio--big">
                      {Object.values(UserSex).map(( value)=>
                        (<div className="custom-toggle-radio__block" key={value}>
                          <label>
                            <input type="radio" name={UserFormFieldName.Sex} value={value} checked={formData.sex === value} onChange={handleInputChange}/>
                            <span className="custom-toggle-radio__icon"></span>
                            <span className="custom-toggle-radio__label">
                              {UserSexToName[value]}
                            </span>
                          </label>
                         </div>)
                      )}
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
                          name={UserFormFieldName.Role}
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
                          name={UserFormFieldName.Role}
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
            {isErrorShown && <p className="form-input__error">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
