import { HttpResponse } from '../protocols/http';
import { ServerError } from '../error/server-error';

export const badResquest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
}); // dica de syntax sugar!

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});
