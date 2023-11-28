import { ChangeEvent, useEffect, useState } from 'react';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import WorkoutListCard from '../../components/workout-card/workout-list-card';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getMaxPrice, getPages, getWorkouts, getWorkoutsLoadingStatus, } from '../../store/workout-data/selectors';
import { CardsLimit, DefaultParam, SortingFieldName, WorkoutFilterName, WorkoutFilterSortName, WorkoutTypeToName, sortDirections, } from '../../utils/constant';
import {
  fetchExtraWorkouts, fetchWorkouts,
} from '../../store/workout-data/api-actions';
import { Query } from '../../types/query.type';
import { UserRole } from '../../types/common/user-role.enum';
import { CaloriesAmount, RaitingCount } from '../../utils/validation.constant';
import BackButton from '../../components/back-button/back-button';
import MultiRangeSlider, { ChangeResult } from 'multi-range-slider-react';
import { WorkoutType } from '../../types/common/workout-type.enum';

function WorkoutsListPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const workoutsList = useAppSelector(getWorkouts);
  const pagesAmount = useAppSelector(getPages);
  const maxPrice = useAppSelector(getMaxPrice);
  const workoutsListLoading = useAppSelector(getWorkoutsLoadingStatus);
  const [currentPage, setCurrentPage] = useState(DefaultParam.Step);
  const [currentSorting, setCurrentSorting] = useState('');
  const [workoutTypes, setWorkoutTypes] = useState<WorkoutType[]>();
  const [query, setQuery] = useState<Query>({
    limit: CardsLimit.Default,
  });
  const isLastPage = currentPage === pagesAmount;
  const isMoreVisible = !isLastPage && pagesAmount > DefaultParam.Amount && workoutsList?.length === CardsLimit.Default;
  const isReturnVisible = isLastPage && (!((workoutsList && workoutsList.length < CardsLimit.Default)));
  const defaultSliderStep = 100;
  const valuesByType = {
    price: [DefaultParam.Amount, maxPrice],
    calories: [CaloriesAmount.Min, CaloriesAmount.Max],
    rating: [DefaultParam.Amount, RaitingCount.Max],
  };
  const [formValue, setFormValue] = useState({
    priceMin: valuesByType.price[0],
    priceMax: valuesByType.price[1],
    caloriesMin: valuesByType.calories[0],
    caloriesMax: valuesByType.calories[1],
    ratingMin: valuesByType.rating[0],
    ratingMax: valuesByType.rating[1],
  });
  const [sliderValue, setSliderValue] = useState({
    priceMin: valuesByType.price[0],
    priceMax: valuesByType.price[1],
    caloriesMin: valuesByType.calories[0],
    caloriesMax: valuesByType.calories[1],
    ratingMin: valuesByType.rating[0],
    ratingMax: valuesByType.rating[1],
  });

  const handleShowClick = () => {
    if (currentPage !== pagesAmount) {
      setCurrentPage((prev) => prev + DefaultParam.Step);
    }
  };

  const handleReturnClick = () => {
    setCurrentPage(DefaultParam.Step);
  };

  const handleFilterChange = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = evt.target;
    const currentValue = +Math.max(DefaultParam.Amount, +value);
    setFormValue({ ...formValue, [name]: currentValue });
    if (name === WorkoutFilterName.PriceMin && currentValue <= formValue.priceMax
    ) {
      setQuery({
        ...query, priceMin: currentValue, priceMax: formValue.priceMax,
      });
    }
    if (name === WorkoutFilterName.PriceMax && currentValue >= formValue.priceMin
    ) {
      setQuery({
        ...query, priceMin: formValue.priceMin, priceMax: currentValue,
      });
    }
    if (
      (name === WorkoutFilterName.PriceMax &&
        currentValue === 0 &&
        formValue.priceMax === 0) ||
      (name === WorkoutFilterName.PriceMin &&
        currentValue === 0 &&
        formValue.priceMax === 0)
    ) {
      setQuery({ ...query, priceMin: undefined, priceMax: undefined });
    }
    if (name === WorkoutFilterName.CaloriesMin && currentValue <= formValue.caloriesMax) {
      setQuery({ ...query, caloriesMin: currentValue, caloriesMax: formValue.caloriesMax });
    }
    if (name === WorkoutFilterName.CaloriesMax && currentValue >= formValue.caloriesMin) {
      setQuery({ ...query, caloriesMin: formValue.caloriesMin, caloriesMax: currentValue });
    }
    if ((name === WorkoutFilterName.CaloriesMax && currentValue === 0 && formValue.caloriesMin === 0)
      || (name === WorkoutFilterName.CaloriesMin && currentValue === 0 && formValue.caloriesMax === 0)) {
      setQuery({ ...query, caloriesMin: undefined, caloriesMax: undefined });
    }
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

  const handleSortChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const currentSort = evt.target.value;
    setCurrentSorting(currentSort);
    switch (currentSort) {
      case WorkoutFilterSortName.Cheap:
        setQuery({ ...query, sortBy: SortingFieldName.Price, sortDirection: sortDirections[0] });
        break;
      case WorkoutFilterSortName.Expensive:
        setQuery({ ...query, sortBy: SortingFieldName.Price, sortDirection: sortDirections[1] });
        break;
      case WorkoutFilterSortName.Free:
        setQuery({...query, priceMin:DefaultParam.Amount, priceMax:DefaultParam.Amount});
        break;
    }
  };
  const handlePriceSliderChange = (evt: ChangeResult) => {
    const minValue = evt.minValue;
    const maxValue = evt.maxValue;
    if (query.priceMin !== minValue) {
      setSliderValue({ ...sliderValue, priceMin: minValue });
      setQuery({ ...query, priceMin: minValue });
    }
    if (query.priceMax !== maxValue) {
      setSliderValue({ ...sliderValue, priceMax: maxValue });
      setQuery({ ...query, priceMax: maxValue });
    }
  };

  const handleCaloriesSliderChange = (evt: ChangeResult) => {
    const minValue = evt.minValue;
    const maxValue = evt.maxValue;
    if (query.caloriesMin !== minValue) {
      setSliderValue({ ...sliderValue, caloriesMin: minValue });
      setQuery({ ...query, caloriesMin: minValue });
    }
    if (query.caloriesMax !== maxValue) {
      setSliderValue({ ...sliderValue, caloriesMax: maxValue });
      setQuery({ ...query, caloriesMax: maxValue });
    }
  };
  const handleRatingSliderChange = (evt: ChangeResult) => {
    const minValue = evt.minValue;
    const maxValue = evt.maxValue;
    if (query.ratingMin !== minValue) {
      setSliderValue({ ...sliderValue, ratingMin: minValue });
      setQuery({ ...query, ratingMin: minValue });
    }
    if (query.ratingMax !== maxValue) {
      setSliderValue({ ...sliderValue, ratingMax: maxValue });
      setQuery({ ...query, ratingMax: maxValue });
    }
  };

  useEffect(() => {
    dispatch(fetchWorkouts({ ...query, page: currentPage, workoutType:workoutTypes }));
    dispatch(fetchExtraWorkouts(UserRole.Sportsman));
  }, [dispatch, query, currentPage, workoutTypes]);

  if (workoutsListLoading) {
    return <Loader />;
  }
  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог тренировок</h1>
              <div className="gym-catalog-form">
                <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
                <div className="gym-catalog-form__wrapper">
                  <BackButton />
                  <h3 className="gym-catalog-form__title">Фильтры</h3>
                  <form className="gym-catalog-form__form">
                    <div className="gym-catalog-form__block gym-catalog-form__block--price">
                      <h4 className="gym-catalog-form__block-title">Цена, ₽</h4>
                      <div className="filter-price">
                        <div className="filter-price__input-text filter-price__input-text--min">
                          <input
                            type="number"
                            id={WorkoutFilterName.PriceMin}
                            name={WorkoutFilterName.PriceMin}
                            defaultValue={formValue.priceMin}
                            onBlur={handleFilterChange}
                          />
                          <label htmlFor={WorkoutFilterName.PriceMin}>от</label>
                        </div>
                        <div className="filter-price__input-text filter-price__input-text--max">
                          <input
                            type="number"
                            id={WorkoutFilterName.PriceMax}
                            name={WorkoutFilterName.PriceMax}
                            defaultValue={formValue.priceMax}
                            onBlur={handleFilterChange}
                          />
                          <label htmlFor={WorkoutFilterName.PriceMax}>до</label>
                        </div>
                      </div>
                      <div className="filter-range">
                        <MultiRangeSlider
                          min={valuesByType.price[0]}
                          max={valuesByType.price[1]}
                          step={defaultSliderStep}
                          style={{
                            border: 'none',
                            boxShadow: 'none',
                            padding: '15px 10px',
                          }}
                          ruler="false"
                          barLeftColor="black"
                          barInnerColor="black"
                          barRightColor="black"
                          thumbLeftColor="black"
                          thumbRightColor="black"
                          minValue={sliderValue.priceMin}
                          maxValue={sliderValue.priceMax}
                          onChange={handlePriceSliderChange}
                        />
                      </div>
                    </div>
                    <div className="gym-catalog-form__block gym-catalog-form__block--calories">
                      <h4 className="gym-catalog-form__block-title">Калории</h4>
                      <div className="filter-calories">
                        <div className="filter-calories__input-text filter-calories__input-text--min">
                          <input
                            type="number"
                            id={WorkoutFilterName.CaloriesMin}
                            name={WorkoutFilterName.CaloriesMin}
                            defaultValue={formValue.caloriesMin}
                            onBlur={handleFilterChange}
                          />
                          <label htmlFor={WorkoutFilterName.CaloriesMin}>
                            от
                          </label>
                        </div>
                        <div className="filter-calories__input-text filter-calories__input-text--max">
                          <input
                            type="number"
                            id={WorkoutFilterName.CaloriesMax}
                            name={WorkoutFilterName.CaloriesMax}
                            defaultValue={formValue.caloriesMax}
                            onBlur={handleFilterChange}
                          />
                          <label htmlFor={WorkoutFilterName.CaloriesMax}>
                            до
                          </label>
                        </div>
                      </div>
                      <div className="filter-range">
                        <MultiRangeSlider
                          min={valuesByType.calories[0]}
                          max={valuesByType.calories[1]}
                          step={defaultSliderStep}
                          style={{
                            border: 'none',
                            boxShadow: 'none',
                            padding: '15px 10px',
                          }}
                          ruler="false"
                          barLeftColor="black"
                          barInnerColor="black"
                          barRightColor="black"
                          thumbLeftColor="black"
                          thumbRightColor="black"
                          minValue={sliderValue.caloriesMin}
                          maxValue={sliderValue.caloriesMax}
                          onChange={handleCaloriesSliderChange}
                        />
                      </div>
                    </div>
                    <div className="gym-catalog-form__block gym-catalog-form__block--rating">
                      <h4 className="gym-catalog-form__block-title">Рейтинг</h4>
                      <div className="filter-raiting">
                        <MultiRangeSlider
                          min={valuesByType.rating[0]}
                          max={valuesByType.rating[1]}
                          step={DefaultParam.Step}
                          style={{
                            border: 'none',
                            boxShadow: 'none',
                            padding: '15px 10px',
                          }}
                          ruler="false"
                          barLeftColor="black"
                          barInnerColor="black"
                          barRightColor="black"
                          thumbLeftColor="black"
                          thumbRightColor="black"
                          minValue={sliderValue.ratingMin}
                          maxValue={sliderValue.ratingMax}
                          onChange={handleRatingSliderChange}
                        />
                      </div>
                    </div>
                    <div className="gym-catalog-form__block gym-catalog-form__block--type">
                      <h4 className="gym-catalog-form__block-title">Тип</h4>
                      <ul className="gym-catalog-form__check-list">
                        {Object.entries(WorkoutTypeToName).map(
                          ([key, value]) => (
                            <li
                              className="gym-catalog-form__check-list-item"
                              key={key}
                            >
                              <div className="custom-toggle custom-toggle--checkbox">
                                <label>
                                  <input
                                    type="checkbox"
                                    value={key}
                                    name="workoutType"
                                    onChange={handleWorkoutTypesChange}
                                    checked={
                                      workoutTypes
                                        ? workoutTypes.includes(key as WorkoutType)
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
                                    {value}
                                  </span>
                                </label>
                              </div>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className="gym-catalog-form__block gym-catalog-form__block--sort">
                      <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">
                        Сортировка
                      </h4>
                      <div className="btn-radio-sort gym-catalog-form__radio">
                        <label>
                          <input
                            type="radio"
                            name="sort"
                            value={WorkoutFilterSortName.Cheap}
                            onChange={handleSortChange}
                            checked= {currentSorting === WorkoutFilterSortName.Cheap}
                          />
                          <span className="btn-radio-sort__label">Дешевле</span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="sort"
                            value={WorkoutFilterSortName.Expensive}
                            onChange={handleSortChange}
                            checked= {currentSorting === WorkoutFilterSortName.Expensive}
                          />
                          <span className="btn-radio-sort__label">Дороже</span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="sort"
                            value={WorkoutFilterSortName.Free}
                            onChange={handleSortChange}
                            checked= {currentSorting === WorkoutFilterSortName.Free}
                          />
                          <span className="btn-radio-sort__label">
                            Бесплатные
                          </span>
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>{' '}
              <div className="training-catalog">
                <ul className="training-catalog__list">
                  {workoutsList?.map((item) => (
                    <li className="training-catalog__item" key={item.id}>
                      <WorkoutListCard workout={item} />
                    </li>
                  ))}
                </ul>
                <ShowMoreButton
                  onShown={handleShowClick}
                  onReturn={handleReturnClick}
                  isShowMoreVisible = {isMoreVisible}
                  isReturnVisible = {isReturnVisible}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default WorkoutsListPage;
