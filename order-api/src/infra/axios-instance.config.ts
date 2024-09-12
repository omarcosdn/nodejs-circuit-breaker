import axios, {AxiosError, AxiosInstance} from 'axios';
import {Environment} from '@src/server-environment.config';
import axiosRetry, {isNetworkOrIdempotentRequestError} from 'axios-retry';
import {Logger} from '@shared/logging/logger.adapter';

export const getPaymentApiInstance = (): AxiosInstance => {
  const instance: AxiosInstance = axios.create({
    baseURL: Environment.PAYMENT_API_ROUTE,
    timeout: Environment.PAYMENT_API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosRetry(instance, {
    retries: Environment.PAYMENT_API_RETRIES,
    retryDelay: (retryCount) => {
      const delay = calculateExponentialBackoff(retryCount);
      Logger.getInstance().info(`Retry attempt #${retryCount}, waiting for ${delay} ms`);
      return delay;
    },
    retryCondition: (error: AxiosError) => {
      return isNetworkOrIdempotentRequestError(error);
    },
  });

  return instance;
};

/**
 * Function that applies Exponential Backoff with Jitter.
 *
 * @param {number} retryCount - The number of the current retry attempt.
 *                              Used to calculate wait time based on exponential backoff.
 * @returns {number} - The waiting time in milliseconds (ms), which is the result of the sum of the exponential
 *                     backoff and a random jitter factor.
 *
 * @example
 * const delay = calculateExponentialBackoff(3);
 *
 * Output: 800ms (approximately), adding random jitter
 */
function calculateExponentialBackoff(retryCount: number): number {
  const baseDelay = Math.pow(2, retryCount) * 1000;
  const jitter = Math.random() * 100;
  return Math.floor(baseDelay + jitter);
}
