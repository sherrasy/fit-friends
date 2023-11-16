import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { FitnessLevel } from '../../types/fitness-level.enum';
import { WorkoutTime } from '../../types/workout-time.enum';
import { WorkoutType } from '../../types/workout-type.enum';
import {
  DefaultParam,
  FitnessLevelToName,
  UserFormError,
  UserFormFieldName,
  WorkoutTypeToName,
} from '../../utils/constant';
import { capitalizeFirstLetter } from '../../utils/helpers';
import { NewUserGeneral } from '../../types/user.interface';
import { toast } from 'react-toastify';
import { CreateUserDto } from '../../dto/user/create/create-user.dto';
import { register } from '../../store/user-data/api-actions';
import {
  CaloriesAmount,
  WORKOUT_TYPE_AMOUNT,
} from '../../utils/validation.constant';
import InputErrorField from '../input-error-field/input-error-field';

type QuestionnaireUserProps = {
  newUserData: NewUserGeneral;
};

function QuestionnaireUser({
  newUserData,
}: QuestionnaireUserProps): JSX.Element {
  const sportsmanInfoDefault = {
    isReady: DefaultParam.Status,
    workoutTime: WorkoutTime.Basic,
    caloriesTotal: DefaultParam.Amount,
    caloriesPerDay: DefaultParam.Amount,
  };
  const dispatch = useAppDispatch();
  const [sportsmanInfo, setSportsmanInfo] = useState(sportsmanInfoDefault);
  const [workoutTypes, setWorkoutTypes] = useState<WorkoutType[]>([]);
  const [fitnessLevel, setFitnessLevel] = useState(FitnessLevel.Pro);
  const [isEmptyShown, SetIsEmptyShown] = useState(DefaultParam.Status);

  const handleSubmitData = (data: CreateUserDto) => dispatch(register(data));

  const handleWorkoutTypesChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value as WorkoutType;
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
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = evt.target;
    const fieldValue = type === 'number' ? +value : value;
    setSportsmanInfo({ ...sportsmanInfo, [name]: fieldValue });
  };
  const handleFitnessLevelChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setFitnessLevel(value as FitnessLevel);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const sportsmanData = {
      ...newUserData,
      workoutType: workoutTypes,
      fitnessLevel,
      sportsmanInfo,
    };
    const isValid = workoutTypes.length > DefaultParam.Amount && sportsmanData.sportsmanInfo.caloriesPerDay !== DefaultParam.Amount && sportsmanData.sportsmanInfo.caloriesTotal !== DefaultParam.Amount;
    if (isValid){
      handleSubmitData(sportsmanData);
      SetIsEmptyShown(DefaultParam.Status);
    } else {
      SetIsEmptyShown(true);
    }
  };

  return (
    <div className="popup-form popup-form--questionnaire-user">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__form">
            <form method="post" action="/" onSubmit={handleFormSubmit}>
              <div className="questionnaire-user">
                <h1 className="visually-hidden">Опросник</h1>
                <div className="questionnaire-user__wrapper">
                  <div className="questionnaire-user__block">
                    <span className="questionnaire-user__legend">
                      Ваша специализация (тип) тренировок
                    </span>
                    <div className="specialization-checkbox questionnaire-user__specializations">
                      {Object.values(WorkoutType).map((item) => (
                        <div className="btn-checkbox" key={item}>
                          <label>
                            <input
                              className="visually-hidden"
                              type="checkbox"
                              name="specialisation"
                              value={item}
                              onChange={handleWorkoutTypesChange}
                              checked={
                                workoutTypes
                                  ? workoutTypes.includes(item)
                                  : false
                              }
                            />
                            <span className="btn-checkbox__btn">
                              {capitalizeFirstLetter(WorkoutTypeToName[item])}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                    {isEmptyShown && workoutTypes.length === 0 && (
                      <InputErrorField />
                    )}
                  </div>
                  <div className="questionnaire-user__block">
                    <span className="questionnaire-user__legend">
                      Сколько времени вы готовы уделять на тренировку в день
                    </span>
                    <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                      {Object.values(WorkoutTime).map((item) => (
                        <div className="custom-toggle-radio__block" key={item}>
                          <label>
                            <input
                              type="radio"
                              name={UserFormFieldName.WorkoutTime}
                              value={item}
                              checked={sportsmanInfo.workoutTime === item}
                              onChange={handleInputChange}
                            />
                            <span className="custom-toggle-radio__icon"></span>
                            <span className="custom-toggle-radio__label">
                              {item}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="questionnaire-user__block">
                    <span className="questionnaire-user__legend">
                      Ваш уровень
                    </span>
                    <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                      {Object.values(FitnessLevel).map((item) => (
                        <div className="custom-toggle-radio__block" key={item}>
                          <label>
                            <input
                              type="radio"
                              name={UserFormFieldName.FitnessLevel}
                              value={item}
                              checked={fitnessLevel === item}
                              onChange={handleFitnessLevelChange}
                            />
                            <span className="custom-toggle-radio__icon"></span>
                            <span className="custom-toggle-radio__label">
                              {FitnessLevelToName[item]}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="questionnaire-user__block">
                    <div className="questionnaire-user__calories-lose">
                      <span className="questionnaire-user__legend">
                        Сколько калорий хотите сбросить
                      </span>
                      <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                        <label>
                          <span className="custom-input__wrapper">
                            <input
                              type="number"
                              name={UserFormFieldName.CaloriesTotal}
                              min={CaloriesAmount.Min}
                              max={CaloriesAmount.Max}
                              onChange={handleInputChange}
                              required
                            />
                            <span className="custom-input__text">ккал</span>
                          </span>
                        </label>
                      </div>
                      {isEmptyShown && !sportsmanInfo[UserFormFieldName.CaloriesTotal] && (
                        <InputErrorField />
                      )}
                    </div>
                    <div className="questionnaire-user__calories-waste">
                      <span className="questionnaire-user__legend">
                        Сколько калорий тратить в день
                      </span>
                      <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                        <label>
                          <span className="custom-input__wrapper">
                            <input
                              type="number"
                              name={UserFormFieldName.CaloriesPerDay}
                              min={CaloriesAmount.Min}
                              max={CaloriesAmount.Max}
                              required
                              onChange={handleInputChange}
                            />
                            <span className="custom-input__text">ккал</span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  {isEmptyShown && !sportsmanInfo[UserFormFieldName.CaloriesPerDay] && (
                    <InputErrorField />
                  )}
                </div>
                <button
                  className="btn questionnaire-user__button"
                  type="submit"
                >
                  Продолжить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionnaireUser;