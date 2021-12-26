import type { Either } from 'fp-ts/Either';

export type HttpOptions = {
    request: RequestInit;
}

export type HttpError = {
    status: number;
    message: string;
};

export type PromiseResult<T> = Promise<Either<HttpError, T>>

export as namespace HTTP;
