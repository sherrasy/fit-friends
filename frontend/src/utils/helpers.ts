
export const checkValidity = (value: string, pattern: RegExp) => value !== '' && pattern.test(value);
