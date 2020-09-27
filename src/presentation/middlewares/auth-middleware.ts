import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token';
import { AccessDeniedError } from '../error';
import { forbidden, ok, serverError } from '../helpers/http/http-helpers';
import { HttpRequest, HttpResponse, Middleware } from '../protocols';

export class AuthMiddleware implements Middleware {
  constructor(private readonly loadAccountByToken: LoadAccountByToken) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token'];
      if (accessToken) {
        const account = await this.loadAccountByToken.load(httpRequest.headers);
        if (account) {
          return ok({ accountId: account.id });
        }
      }
      return forbidden(new AccessDeniedError());
    } catch (errr) {
      return serverError(errr);
    }
  }
}
