import { AccessDeniedError } from '../error';
import { forbidden } from '../helpers/http/http-helpers';
import { HttpRequest, HttpResponse, Middleware } from '../protocols';

export class AuthMiddleware implements Middleware {
  async handle(http: HttpRequest): Promise<HttpResponse> {
    const error = forbidden(new AccessDeniedError());
    return new Promise(resolve => resolve(error));
  }
}
