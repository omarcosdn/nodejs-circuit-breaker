export abstract class Entity<T> {
  private readonly id: T;

  protected constructor(id: T) {
    this.id = id;
  }

  public getIdentity(): T {
    return this.id;
  }

  public abstract getIdentityAsString(): string;
}
