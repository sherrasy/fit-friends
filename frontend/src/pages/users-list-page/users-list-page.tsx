import Header from '../../components/header/header';
import UserCardSmall from '../../components/user-card/user-card-small';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getUserList,
  getUserListLoadingStatus,
  getUserPages,
} from '../../store/user-data/selectors';
import Loader from '../../components/loader/loader';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  CardsLimit,
  DefaultParam,
  FitnessLevelToName,
  FormFieldName,
  LocationToName,
  WorkoutTypeToName,
} from '../../utils/constant';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import BackButton from '../../components/back-button/back-button';
import { capitalizeFirstLetter } from '../../utils/helpers';
import { UserRole } from '../../types/common/user-role.enum';
import { fetchUserList } from '../../store/user-data/api-actions';
import { WorkoutType } from '../../types/common/workout-type.enum';
import { Query } from '../../types/query.type';
import { Location } from '../../types/common/location.enum';

function UsersListPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const userList = useAppSelector(getUserList);
  const pagesAmount = useAppSelector(getUserPages);
  const userListLoading = useAppSelector(getUserListLoadingStatus);
  const [currentPage, setCurrentPage] = useState(DefaultParam.Step);
  const [query, setQuery] = useState<Query>();
  const [workoutTypes, setWorkoutTypes] = useState<WorkoutType[]>();
  const [locations, setLocations] = useState<Location[]>();
  const isLastPage = currentPage === pagesAmount;
  const isMoreVisible =
    !isLastPage &&
    pagesAmount > DefaultParam.Amount &&
    userList?.length === CardsLimit.Default;
  const isReturnVisible =
    isLastPage && !!(userList && userList.length <= CardsLimit.Default);

  const handleShowClick = () => {
    if (currentPage !== pagesAmount) {
      setCurrentPage((prev) => prev + DefaultParam.Step);
    }
  };

  const handleReturnClick = () => {
    setCurrentPage(DefaultParam.Step);
  };

  const handleWorkoutTypesChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value as WorkoutType;
    if (!workoutTypes) {
      setWorkoutTypes([value]);
      return;
    }
    const isExists = workoutTypes.includes(value);
    const types = isExists
      ? workoutTypes.filter((item) => item !== value)
      : workoutTypes.concat(value);
    setWorkoutTypes(types);
  };

  const handleLocationsChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value as Location;
    if (!locations) {
      setLocations([value]);
      return;
    }
    const isExists = locations.includes(value);
    const locationsList = isExists
      ? locations.filter((item) => item !== value)
      : locations.concat(value);
    setLocations(locationsList);
  };

  const handleFilterChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setQuery({ ...query, [name]: value });
  };

  useEffect(() => {
    dispatch(
      fetchUserList({
        ...query,
        page: currentPage,
        workoutType: workoutTypes,
        location: locations,
      })
    );
  }, [dispatch, currentPage, query, workoutTypes, locations]);

  if (userListLoading) {
    return <Loader />;
  }
  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог пользователей</h1>
              <div className="user-catalog-form">
                <h2 className="visually-hidden">Каталог пользователя</h2>
                <div className="user-catalog-form__wrapper">
                  <BackButton />
                  <h3 className="user-catalog-form__title">Фильтры</h3>
                  <form className="user-catalog-form__form">
                    <div className="user-catalog-form__block user-catalog-form__block--location">
                      <h4 className="user-catalog-form__block-title">
                        Локация, станция метро
                      </h4>
                      <ul className="user-catalog-form__check-list">
                        {Object.entries(LocationToName).map(([key, value]) => (
                          <li
                            className="user-catalog-form__check-list-item"
                            key={key}
                          >
                            <div className="custom-toggle custom-toggle--checkbox">
                              <label>
                                <input
                                  type="checkbox"
                                  value={key}
                                  name="location"
                                  onChange={handleLocationsChange}
                                  checked={
                                    locations
                                      ? locations.includes(key as Location)
                                      : false
                                  }
                                />
                                <span className="custom-toggle__icon">
                                  <svg width="9" height="6" aria-hidden="true">
                                    <use xlinkHref="#arrow-check"></use>
                                  </svg>
                                </span>
                                <span className="custom-toggle__label">
                                  {value}
                                </span>
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="user-catalog-form__block user-catalog-form__block--spezialization">
                      <h4 className="user-catalog-form__block-title">
                        Специализация
                      </h4>
                      <ul className="user-catalog-form__check-list">
                        {Object.entries(WorkoutTypeToName).map(
                          ([key, value]) => (
                            <li
                              className="user-catalog-form__check-list-item"
                              key={key}
                            >
                              <div className="custom-toggle custom-toggle--checkbox">
                                <label>
                                  <input
                                    type="checkbox"
                                    value={key}
                                    name="spezialization"
                                    onChange={handleWorkoutTypesChange}
                                    checked={
                                      workoutTypes
                                        ? workoutTypes.includes(
                                            key as WorkoutType
                                        )
                                        : false
                                    }
                                  />
                                  <span className="custom-toggle__icon">
                                    <svg
                                      width="9"
                                      height="6"
                                      aria-hidden="true"
                                    >
                                      <use xlinkHref="#arrow-check"></use>
                                    </svg>
                                  </span>
                                  <span className="custom-toggle__label">
                                    {capitalizeFirstLetter(value)}
                                  </span>
                                </label>
                              </div>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className="user-catalog-form__block user-catalog-form__block--level">
                      <h4 className="user-catalog-form__block-title">
                        Ваш уровень
                      </h4>
                      <div className="custom-toggle-radio">
                        {Object.entries(FitnessLevelToName).map(
                          ([key, value]) => (
                            <div
                              className="custom-toggle-radio__block"
                              key={key}
                            >
                              <label>
                                <input
                                  type="radio"
                                  name={FormFieldName.FitnessLevel}
                                  value={key}
                                  onChange={handleFilterChange}
                                  checked={query?.fitnessLevel === key}
                                />
                                <span className="custom-toggle-radio__icon"></span>
                                <span className="custom-toggle-radio__label">
                                  {value}
                                </span>
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="user-catalog-form__block">
                      <h3 className="user-catalog-form__title user-catalog-form__title--sort">
                        Сортировка
                      </h3>
                      <div className="btn-radio-sort">
                        <label>
                          <input
                            type="radio"
                            name={FormFieldName.Role}
                            value={UserRole.Coach}
                            onChange={handleFilterChange}
                            checked={query?.role === UserRole.Coach}
                          />
                          <span className="btn-radio-sort__label">Тренеры</span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name={FormFieldName.Role}
                            value={UserRole.Sportsman}
                            onChange={handleFilterChange}
                            checked={query?.role === UserRole.Sportsman}
                          />
                          <span className="btn-radio-sort__label">
                            Пользователи
                          </span>
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="inner-page__content">
                <div className="users-catalog">
                  <ul className="users-catalog__list">
                    {userList?.map((item) => (
                      <li className="users-catalog__item" key={item.id}>
                        <UserCardSmall user={item} />
                      </li>
                    ))}
                  </ul>
                  <ShowMoreButton
                    onShown={handleShowClick}
                    onReturn={handleReturnClick}
                    isShowMoreVisible={isMoreVisible}
                    isReturnVisible={isReturnVisible}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default UsersListPage;
