import axios, {AxiosInstance} from 'axios';
import {Environment} from '@src/server-environment.config';

const CreatePaymentApiAxiosInstance: AxiosInstance = axios.create({
  baseURL: Environment.PAYMENT_API_ROUTE,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPaymentApiInstance = () => CreatePaymentApiAxiosInstance;
