import {randomUUID} from 'crypto';

export class Uuid {
  private readonly id: string;

  constructor(id?: string) {
    this.id = id ?? randomUUID();
  }

  public static newIdentity(): Uuid {
    return new Uuid();
  }

  public equals(other: Uuid): boolean {
    return other.id === this.id;
  }

  public asString(): string {
    return this.id;
  }
}
