import {AsyncLocalStorage} from 'node:async_hooks';
import {NextFunction, Request, Response} from 'express';
import {randomUUID} from 'crypto';

type StoreType = Map<string, string>;

class AsyncLocalStorageManager {
  private readonly asyncLocalStorage: AsyncLocalStorage<StoreType>;

  constructor() {
    this.asyncLocalStorage = new AsyncLocalStorage<StoreType>();
  }

  run<T>(store: StoreType, callback: () => T): T {
    return this.asyncLocalStorage.run(store, callback);
  }

  getStore(): StoreType | undefined {
    return this.asyncLocalStorage.getStore();
  }

  set<T>(key: string, value: string): void {
    const store = this.getStore();
    if (store) {
      store.set(key, value);
    }
  }

  get(key: string): string | undefined {
    const store = this.getStore();
    return store?.get(key);
  }

  getTraceId(): string | undefined {
    const store = this.getStore();
    return store?.get(TRACE_ID);
  }
}

export const TRACE_ID: string = 'trace-id';

export function initContext(req: Request, res: Response, next: NextFunction) {
  const store = new Map<string, string>();

  const traceId = req.headers['x-trace-id'] || randomUUID();
  store.set(TRACE_ID, traceId.toString());

  Context.run(store, () => {
    next();
  });
}

export const Context = new AsyncLocalStorageManager();
