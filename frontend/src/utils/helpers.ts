import { RandomNumberLimit } from './constant';

export const checkValidity = (value: string, pattern: RegExp) => value !== '' && pattern.test(value);

export const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

export const getSpecialPrice = (price:number) => price - price * 0.1;

export const generateRandomNumber = () => {
  const number = Math.floor(Math.random() * (RandomNumberLimit.Max - RandomNumberLimit.Min + 1)) + RandomNumberLimit.Min;
  return number < 10 ? `0${number}` : number.toString();
};
