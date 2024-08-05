import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '@components/back-button/back-button';
import Header from '@components/header/header';
import Loader from '@components/loader/loader';
import SliderButtons from '@components/slider-buttons/slider-buttons';
import Slider from '@components/slider/slider';
import UserCard from '@components/user-card/user-card';
import WorkoutListCard from '@components/workout-card/workout-list-card';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchUser } from '@store/user-data/api-actions';
import {
  getUserData,
  getUserError,
  getUserLoadingStatus,
} from '@store/user-data/selectors';
import { getWorkoutsByCoach } from '@store/workout-data/selectors';
import { UserRole } from '@frontend-types/common/user-role.enum';
import { DefaultParam, SliderLimit } from '@utils/constant';
import ErrorPage from '../error-page/error-page';

type ButtonGroupProp = {
  next?: () => void;
  previous?: () => void;
};

const ButtonGroup = ({ next, previous }: ButtonGroupProp) => (
  <div className="user-card-coach__training-head">
    <h2 className="user-card-coach__training-title">Тренировки</h2>
    <SliderButtons next={next} previous={previous} />
  </div>
);

function UserInfoPage(): JSX.Element {
  const { id: userId } = useParams();
  const [isSubscribed, setIsSubscribed] = useState(DefaultParam.Status);
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserData);
  const userError = useAppSelector(getUserError);
  const isUserLoading = useAppSelector(getUserLoadingStatus);
  const workouts = useAppSelector(getWorkoutsByCoach(userId));
  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(+userId));
    }
  }, [dispatch, userId]);

  if (!user || userError) {
    return <ErrorPage />;
  }

  if (isUserLoading) {
    return <Loader />;
  }
  const isCoach = user.role === UserRole.Coach;
  const isReady = user.coachInfo?.isPersonal;
  const handleSubscribe = () => {
    setIsSubscribed((prev) => !prev);
  };
  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <BackButton />
              <div className="inner-page__content">
                <section className="user-card-coach">
                  <h1 className="visually-hidden">
                    Карточка пользователя роль тренер
                  </h1>
                  <div className="user-card-coach__wrapper">
                    <UserCard user={user} />
                    {isCoach && (
                      <div className="user-card-coach__training">
                        {workouts && workouts.length && (
                          <Slider
                            items={SliderLimit.Default}
                            currentButtons={<ButtonGroup />}
                            isOutsideButtons
                            additionalClassName="user-card-coach__training-list"
                          >
                            {workouts.map((item) => (
                              <WorkoutListCard workout={item} key={item.id} />
                            ))}
                          </Slider>
                        )}
                        <form className="user-card-coach__training-form">
                          {isReady && (
                            <button
                              className="btn user-card-coach__btn-training"
                              type="button"
                            >
                              Хочу персональную тренировку
                            </button>
                          )}
                          <div className="user-card-coach__training-check">
                            <div className="custom-toggle custom-toggle--checkbox">
                              <label>
                                <input
                                  type="checkbox"
                                  value="user-agreement-1"
                                  name="user-agreement"
                                  onChange={handleSubscribe}
                                  checked={isSubscribed}
                                />
                                <span className="custom-toggle__icon">
                                  <svg width="9" height="6" aria-hidden="true">
                                    <use xlinkHref="#arrow-check"></use>
                                  </svg>
                                </span>
                                <span className="custom-toggle__label">
                                  Получать уведомление на почту о новой
                                  тренировке
                                </span>
                              </label>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default UserInfoPage;
