import { HttpResponse } from '../../protocols';
import { ServerError, AnauthorizedError } from '../../error';

export const badResquest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
}); // dica de syntax sugar!

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const anauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new AnauthorizedError(),
});

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
});
