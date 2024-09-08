import axios, {AxiosInstance} from 'axios';
import {Env} from '@src/server.config';

const CreatePaymentApiAxiosInstance: AxiosInstance = axios.create({
  baseURL: Env.PAYMENT_API_ROUTE,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPaymentApiInstance = () => CreatePaymentApiAxiosInstance;
