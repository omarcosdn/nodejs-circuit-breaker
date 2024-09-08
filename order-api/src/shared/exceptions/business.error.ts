export class BusinessError extends Error {
  public readonly cause?: Error;

  constructor(message: string = 'BusinessError', cause?: Error) {
    super(message);
    this.name = this.constructor.name;
    this.cause = cause;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
