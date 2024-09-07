export interface Loggable {
    info(message: string): void;

    error(message: string): void;
}