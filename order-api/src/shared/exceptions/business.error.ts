export class BusinessError extends Error {
  private readonly statusCode: number;

  constructor(message: string = 'BusinessError', statusCode: number = 400) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  public getStatusCode(): number {
    return this.statusCode;
  }
}
