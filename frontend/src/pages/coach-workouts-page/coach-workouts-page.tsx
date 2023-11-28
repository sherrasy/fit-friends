import MultiRangeSlider, { ChangeResult } from 'multi-range-slider-react';
import { useEffect, useState } from 'react';
import BackButton from '../../components/back-button/back-button';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import WorkoutListCard from '../../components/workout-card/workout-list-card';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getMaxPrice,
  getPages,
  getWorkouts,
  getWorkoutsLoadingStatus,
} from '../../store/workout-data/selectors';
import { Query } from '../../types/query.type';
import { WorkoutTime } from '../../types/common/workout-time.enum';
import { CardsLimit, DefaultParam, WorkoutFilterName } from '../../utils/constant';
import { CaloriesAmount, RaitingCount } from '../../utils/validation.constant';
import { fetchCoachWorkouts, fetchExtraWorkouts } from '../../store/workout-data/api-actions';
import { UserRole } from '../../types/common/user-role.enum';
import ShowMoreButton from '../../components/show-more-button/show-more-button';

function CoachWorkoutsPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const maxPrice = useAppSelector(getMaxPrice);
  const pagesAmount = useAppSelector(getPages);
  const workouts = useAppSelector(getWorkouts);
  const workoutsLoading = useAppSelector(getWorkoutsLoadingStatus);
  const [currentPage, setCurrentPage] = useState(DefaultParam.Step);
  const [query, setQuery] = useState<Query>({
    limit: CardsLimit.Default,
  });
  const isLastPage = currentPage === pagesAmount;
  const isMoreVisible = !isLastPage && pagesAmount > DefaultParam.Amount && workouts?.length === CardsLimit.Default;
  const isReturnVisible = isLastPage || (workouts ? workouts.length < CardsLimit.Default : false);
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
    evt: React.ChangeEvent<HTMLInputElement>
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
    dispatch(fetchCoachWorkouts({ ...query, page: currentPage }));
    dispatch(fetchExtraWorkouts(UserRole.Coach));
  }, [dispatch, query, currentPage]);


  if (workoutsLoading) {
    return <Loader />;
  }

  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Мои тренировки</h1>
              <div className="my-training-form">
                <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
                <div className="my-training-form__wrapper">
                  <BackButton />
                  <h3 className="my-training-form__title">фильтры</h3>
                  <form className="my-training-form__form">
                    <div className="my-training-form__block my-training-form__block--price">
                      <h4 className="my-training-form__block-title">Цена, ₽</h4>
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
                    <div className="my-training-form__block my-training-form__block--calories">
                      <h4 className="my-training-form__block-title">Калории</h4>
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
                    <div className="my-training-form__block my-training-form__block--raiting">
                      <h4 className="my-training-form__block-title">Рейтинг</h4>
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
                    <div className="my-training-form__block my-training-form__block--duration">
                      <h4 className="my-training-form__block-title">
                        Длительность
                      </h4>
                      <ul className="my-training-form__check-list">
                        {Object.entries(WorkoutTime).map(([key, value])=>(
                          <li className="my-training-form__check-list-item" key={key}>
                            <div className="custom-toggle custom-toggle--checkbox">
                              <label>
                                <input
                                  type="checkbox"
                                  defaultValue={key}
                                  name="duration"
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
                          </li>)
                        )}
                      </ul>
                    </div>
                  </form>
                </div>
              </div>{' '}
              <div className="inner-page__content">
                <div className="my-trainings">
                  <ul className="my-trainings__list">
                    {workouts?.map((item) => (
                      <li className="my-trainings__item" key={item.id}>
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
          </div>
        </section>
      </main>
    </div>
  );
}
export default CoachWorkoutsPage;
