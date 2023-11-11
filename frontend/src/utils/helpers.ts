
export const checkValidity = (value: string, pattern: RegExp) => value !== '' && pattern.test(value);

export const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

