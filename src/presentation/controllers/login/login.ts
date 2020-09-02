import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { badResquest, serverError } from '../../helpers/http-helpers';
import { MissingParamError, InvalidParamError } from '../../error';
import { EmailValidator } from '../signup/signup-protocols';
import { Authentication } from '../../../domain/usecases/authentication';

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly authentication: Authentication;
  constructor(emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator;
    this.authentication = authentication;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;
      if (!email) {
        return new Promise(resolve =>
          resolve(badResquest(new MissingParamError('email'))),
        );
      }
      if (!password) {
        return new Promise(resolve =>
          resolve(badResquest(new MissingParamError('password'))),
        );
      }

      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return new Promise(resolve =>
          resolve(badResquest(new InvalidParamError('email'))),
        );
      }
      await this.authentication.auth(email, password);
    } catch (err) {
      return serverError(err);
    }
  }
}
