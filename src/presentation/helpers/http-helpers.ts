import { HttpResponse } from '../protocols';
import { ServerError } from '../error/server-error';

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
