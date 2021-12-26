import { Either } from 'fp-ts/Either';

export type ServerError = {
    code: number;
    message?: string;
}

export type Result<T> = Either<Record<string, unknown>, T>;

export as namespace SERVER;
