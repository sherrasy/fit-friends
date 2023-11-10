import { AxiosError } from 'axios';
import { AxiosErrorResponse } from '../types/axios-error-response.type';

export const getValidationErrorMessages = (error:AxiosError<AxiosErrorResponse>) => error.response?.data.details.map((item)=> `${item.property}: ${item.messages[0]}`).join('\r\n');

