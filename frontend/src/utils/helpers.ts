import { Query } from '@frontend-types/query.type';
import { CardsLimit, DefaultParam, RandomNumberLimit, SortingFieldName, sortDirections } from './constant';

export const checkValidity = (value: string, pattern: RegExp) =>
  value !== '' && pattern.test(value);

export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const getSpecialPrice = (price: number) => price - price * 0.1;

export const formatNotificationDate = (date: Date) => new Date(date).toLocaleString('ru-RU', {
  day: '2-digit',
  month: 'long',
  hour:'2-digit',
  minute:'2-digit'
});

export const generateRandomNumber = () => {
  const number =
    Math.floor(
      Math.random() * (RandomNumberLimit.Max - RandomNumberLimit.Min + 1)
    ) + RandomNumberLimit.Min;
  return number < 10 ? `0${number}` : number.toString();
};

export const getWorkoutQueryString = (query: Query) => {
  const limitQuery = query.limit
    ? `limit=${query.limit}&`
    : `limit=${CardsLimit.Default}&`;
  const pageQuery = query.page
    ? `page=${query.page}&`
    : `page=${DefaultParam.Step}&`;
  const workoutTypeQuery = (query.workoutType && query.workoutType.length)
    ? `workoutType=${query.workoutType.join(',')}&`
    : '';
  const workoutTimeQuery = (query.workoutTime && query.workoutTime.length)
    ? `workoutTime=${query.workoutTime.join(',')}&`
    : '';
  const priceMinQuery = query.priceMin ? `priceMin=${query.priceMin}&` : '';
  const priceMaxQuery = query.priceMax ? `priceMax=${query.priceMax}&` : '';
  const caloriesMinQuery = query.caloriesMin
    ? `caloriesMin=${query.caloriesMin}&`
    : '';
  const caloriesMaxQuery = query.caloriesMax
    ? `caloriesMax=${query.caloriesMax}&`
    : '';
  const ratingMinQuery = query.ratingMin
    ? `ratingMin=${query.ratingMin}&`
    : '';
  const ratingMaxQuery = query.ratingMax
    ? `ratingMax=${query.ratingMax}&`
    : '';
  const sortByQuery = query.sortBy
    ? `sortBy=${query.sortBy}&`
    : `sortBy=${SortingFieldName.Date}&`;
  const sortDirectionQuery = query.sortDirection
    ? `sortDirection=${query.sortDirection}`
    : `sortDirection=${sortDirections[1]}`;
  return `?${limitQuery}${pageQuery}${workoutTypeQuery}${workoutTimeQuery}${priceMinQuery}${priceMaxQuery}${caloriesMinQuery}${caloriesMaxQuery}${ratingMinQuery}${ratingMaxQuery}${sortByQuery}${sortDirectionQuery}`;
};

export const getOrdersQueryString = (query?: Query) => {
  const limitQuery = query?.limit
    ? `limit=${query.limit}&`
    : `limit=${CardsLimit.CoachOrders}&`;
  const pageQuery = query?.page
    ? `page=${query?.page}&`
    : `page=${DefaultParam.Step}&`;
  const sortByQuery = query?.sortBy
    ? `sortBy=${query?.sortBy}&`
    : `sortBy=${SortingFieldName.AmountOrdered}&`;
  const sortDirectionQuery = query?.sortDirection
    ? `sortDirection=${query.sortDirection}`
    : `sortDirection=${sortDirections[1]}`;
  return `?${limitQuery}${pageQuery}${sortByQuery}${sortDirectionQuery}`;
};

export const getFriendsQueryString = (query?: Query) => {
  const limitQuery = query?.limit
    ? `limit=${query.limit}&`
    : `limit=${CardsLimit.Default}&`;
  const pageQuery = query?.page
    ? `page=${query?.page}&`
    : `page=${DefaultParam.Step}&`;
  const sortByQuery = query?.sortBy
    ? `sortBy=${query?.sortBy}&`
    : `sortBy=${SortingFieldName.Date}&`;
  const sortDirectionQuery = query?.sortDirection
    ? `sortDirection=${query?.sortDirection}`
    : `sortDirection=${sortDirections[1]}`;
  return `?${limitQuery}${pageQuery}${sortByQuery}${sortDirectionQuery}`;
};

export const getUserQueryString = (query: Query) => {
  const limitQuery = query.limit
    ? `limit=${query.limit}&`
    : `limit=${CardsLimit.Default}&`;
  const pageQuery = query.page
    ? `page=${query.page}&`
    : `page=${DefaultParam.Step}&`;
  const workoutTypeQuery = (query.workoutType && query.workoutType.length)
    ? `workoutType=${query.workoutType.join(',')}&`
    : '';
  const locationQuery = (query.location && query.location.length)
    ? `location=${query.location.join(',')}&`
    : '';
  const fitnessLevelQuery = query.fitnessLevel
    ? `fitnessLevel=${query.fitnessLevel}&`
    : '';
  const roleQuery = query.role
    ? `role=${query.role}`
    : '';
  return `?${limitQuery}${pageQuery}${workoutTypeQuery}${fitnessLevelQuery}${locationQuery}${roleQuery}`;
};
