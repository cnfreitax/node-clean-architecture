import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { badResquest } from '../../helpers/http-helpers';
import { MissingParamError } from '../../error';
import { EmailValidator } from '../signup/signup-protocols';

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator;
  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

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

    this.emailValidator.isValid(httpRequest.body.email);
  }
}
