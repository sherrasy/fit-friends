import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { checkValidity } from '../../utils/helpers';
import { UserFormError, UserFormFieldName } from '../../utils/constant';
import { AuthData } from '../../types/auth-data.type';
import { login } from '../../store/user-data/api-actions';
import InputErrorField from '../../components/input-error-field/input-error-field';
import '../../styles/common-styles.css';
import { PasswordLength, ValidationPattern } from '../../utils/validation.constant';

function LoginPage(): JSX.Element {
  const loginDataDefault = {
    email: '',
    password: '',
  };
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState(loginDataDefault);
  const [isErrorShown, SetIsErrorShown] = useState(false);
  const [errorMessage, SetErrorMessage] = useState('');
  const [isEmptyShown, SetIsEmptyShown] = useState(false);

  const handleSubmitData = (authData: AuthData) => dispatch(login(authData));

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const isMissingData = Object.values(formData).some((item)=> item === '');
    SetIsEmptyShown(isMissingData);
    const isEmailValid = checkValidity(formData.email, ValidationPattern.Email);
    const isPasswordValid = checkValidity(
      formData.password,
      ValidationPattern.Password
    );
    if (isEmailValid && isPasswordValid && !isEmptyShown) {
      handleSubmitData(formData);
      SetIsErrorShown(false);
    } else {
      const errorFields = ` Ошибка в полях: ${!isEmailValid ? 'email' : ''}${!isPasswordValid ? ' пароль' : ''}.`;
      SetErrorMessage( UserFormError.LoginFailed.concat(errorFields));
      SetIsErrorShown(true);
    }
  };

  return (
    <div className="wrapper">
      <main>
        <div className="background-logo">
          <svg
            className="background-logo__logo"
            width="750"
            height="284"
            aria-hidden="true"
          >
            <use xlinkHref="#logo-big"></use>
          </svg>
          <svg
            className="background-logo__icon"
            width="343"
            height="343"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-logotype"></use>
          </svg>
        </div>
        <div className="popup-form popup-form--sign-in">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Вход</h1>
              </div>
              <div className="popup-form__form">
                <form method="post" action="/" onSubmit={handleFormSubmit}>
                  <div className="sign-in">
                    <div className="custom-input sign-in__input">
                      <label>
                        <span className="custom-input__label">E-mail</span>
                        <span className="custom-input__wrapper">
                          <input
                            type="email"
                            id={UserFormFieldName.Email}
                            name={UserFormFieldName.Email}
                            onChange={handleInputChange}
                            required
                          />
                        </span>
                      </label>
                      {isEmptyShown && formData[UserFormFieldName.Email] === '' && <InputErrorField/>}
                    </div>
                    <div className="custom-input sign-in__input">
                      <label>
                        <span className="custom-input__label">Пароль</span>
                        <span className="custom-input__wrapper">
                          <input
                            type="password"
                            id={UserFormFieldName.Password}
                            name={UserFormFieldName.Password}
                            minLength={PasswordLength.Min}
                            maxLength={PasswordLength.Max}
                            onChange={handleInputChange}
                            required
                          />
                        </span>
                      </label>
                      {isEmptyShown && formData[UserFormFieldName.Password] === '' && <InputErrorField/>}
                    </div>
                    <button className="btn sign-in__button" type="submit">
                      Продолжить
                    </button>
                  </div>
                </form>
                {isErrorShown && <p className="form-input__error">{errorMessage}</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default LoginPage;
