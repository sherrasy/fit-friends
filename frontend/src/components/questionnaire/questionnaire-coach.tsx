import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { FitnessLevel } from '../../types/common/fitness-level.enum';
import { WorkoutType } from '../../types/common/workout-type.enum';
import {
  DefaultParam,
  FitnessLevelToName,
  UserFormError,
  WorkoutTypeToName,
} from '../../utils/constant';
import { capitalizeFirstLetter } from '../../utils/helpers';
import { DescriptionLength, WORKOUT_TYPE_AMOUNT } from '../../utils/validation.constant';
import { NewUserGeneral } from '../../types/user/user.interface';
import { register } from '../../store/user-data/api-actions';
import { CreateUserDto } from '../../dto/user/create/create-user.dto';
import { useAppDispatch } from '../../hooks';
import InputErrorField from '../input-error-field/input-error-field';

type QuestionnaireCoachProps = {
  newUserData:NewUserGeneral;
  avatarFile: File | undefined;
}

function QuestionnaireCoach({newUserData, avatarFile}:QuestionnaireCoachProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [workoutTypes, setWorkoutTypes] = useState<WorkoutType[]>([]);
  const [fitnessLevel, setFitnessLevel] = useState(FitnessLevel.Pro);
  const [successInfo, setSuccessInfo] = useState('');
  const [isPersonal, setIsPersonal] = useState(DefaultParam.Status);
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

  const handleFitnessLevelChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setFitnessLevel(value as FitnessLevel);
  };

  const handleSuccessInfoChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = evt.target;
    setSuccessInfo(value);
  };

  const handleIsPersonalChange = () => {
    setIsPersonal((prev) => !prev);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const coachData = {
      ...newUserData,
      workoutType:workoutTypes,
      fitnessLevel,
      coachInfo:{
        successInfo,
        isPersonal
      }
    };
    if (coachData.workoutType.length > DefaultParam.Amount || coachData.coachInfo.successInfo !== '') {
      handleSubmitData(coachData);
      SetIsEmptyShown(DefaultParam.Status);
    }else{
      SetIsEmptyShown(true);
    }
  };

  return (
    <div className="popup-form popup-form--questionnaire-coach">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__form">
            <form method="post" action="/" onSubmit={handleFormSubmit}>
              <div className="questionnaire-coach">
                <h1 className="visually-hidden">Опросник</h1>
                <div className="questionnaire-coach__wrapper">
                  <div className="questionnaire-coach__block">
                    <span className="questionnaire-coach__legend">
                      Ваша специализация (тип) тренировок
                    </span>
                    <div className="specialization-checkbox questionnaire-coach__specializations">
                      {Object.values(WorkoutType).map((item) => (
                        <div className="btn-checkbox" key={item}>
                          <label>
                            <input
                              className="visually-hidden"
                              type="checkbox"
                              name="specialisation"
                              value={item}
                              onChange={handleWorkoutTypesChange}
                              checked={workoutTypes ? workoutTypes.includes(item) : false}
                            />
                            <span className="btn-checkbox__btn">
                              {capitalizeFirstLetter(WorkoutTypeToName[item])}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                    {isEmptyShown && workoutTypes.length === DefaultParam.Amount && <InputErrorField/>}
                  </div>
                  <div className="questionnaire-coach__block">
                    <span className="questionnaire-coach__legend">
                      Ваш уровень
                    </span>
                    <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-coach__radio">
                      {Object.values(FitnessLevel).map((item) => (
                        <div className="custom-toggle-radio__block" key={item}>
                          <label>
                            <input
                              type="radio"
                              name="level"
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
                  <div className="questionnaire-coach__block">
                    <span className="questionnaire-coach__legend">
                      Ваши дипломы и сертификаты
                    </span>
                    <div className="drag-and-drop questionnaire-coach__drag-and-drop">
                      <label>
                        <span className="drag-and-drop__label">
                          Загрузите сюда файл формата PDF
                          <svg width="20" height="20" aria-hidden="true">
                            <use xlinkHref="#icon-import"></use>
                          </svg>
                        </span>
                        <input
                          type="file"
                          name="import"
                          accept=".pdf"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="questionnaire-coach__block">
                    <span className="questionnaire-coach__legend">
                      Расскажите о своём опыте, который мы сможем проверить
                    </span>
                    <div className="custom-textarea questionnaire-coach__textarea">
                      <label>
                        <textarea
                          name="description"
                          placeholder=" "
                          onBlur={handleSuccessInfoChange}
                          minLength={DescriptionLength.Min}
                          maxLength={DescriptionLength.Max}
                          required
                        >
                        </textarea>
                      </label>
                      {isEmptyShown && successInfo === '' && <InputErrorField/>}
                    </div>
                    <div className="questionnaire-coach__checkbox">
                      <label>
                        <input
                          type="checkbox"
                          value="individual-training"
                          name="individual-training"
                          checked={isPersonal}
                          onChange={handleIsPersonalChange}
                        />
                        <span className="questionnaire-coach__checkbox-icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg>
                        </span>
                        <span className="questionnaire-coach__checkbox-label">
                          Хочу дополнительно индивидуально тренировать
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  className="btn questionnaire-coach__button"
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

export default QuestionnaireCoach;
