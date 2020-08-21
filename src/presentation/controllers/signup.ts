import { badResquest, serverError } from '../helpers/http-helpers';
import {
  EmailValidator,
  Controller,
  HttpRequest,
  HttpResponse,
} from '../protocols';
import { InvalidParamError, MissingParamError } from '../error';

export class SignupController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badResquest(new MissingParamError(field));
        }
      }

      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
        return badResquest(new InvalidParamError('passwordConfirmation'));
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email);

      if (!isValid) {
        return badResquest(new InvalidParamError('email'));
      }
    } catch (error) {
      return serverError();
    }
  }
}
