import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { badResquest } from '../../helpers/http-helpers';
import { MissingParamError } from '../../error';

export class LoginController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return new Promise(resolve =>
        resolve(badResquest(new MissingParamError('email'))),
      );
    }
    if (!httpRequest.body.password) {
      return new Promise(resolve =>
        resolve(badResquest(new MissingParamError('password'))),
      );
    }
  }
}
