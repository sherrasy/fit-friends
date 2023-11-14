import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import { getToken } from './token';
import { StatusCodes } from 'http-status-codes';
import {toast} from 'react-toastify';
import { ApiConnectParam, ApiErrorsMessage } from '../utils/constant';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: ApiConnectParam.Url,
    timeout: ApiConnectParam.Timeout,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }


      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error:AxiosError<{error:string}>)=>{
      if (error.response?.status === StatusCodes.UNAUTHORIZED) {
        toast.warn(ApiErrorsMessage.Unauthorized, {toastId: error.code});
      }
      if (error.response?.status === StatusCodes.NOT_FOUND) {
        toast.error(error.response.data.error, {toastId:error.code});
      }
      throw error;
    }
  );

  return api;
};
