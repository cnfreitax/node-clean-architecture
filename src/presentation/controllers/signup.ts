import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError } from '../error/missing-param-error';
import { badResquest } from '../helpers/http-helpers';
import { Controller } from '../protocols/controller';
import { EmailValidator } from '../protocols/email-validotr';
import { InvalidParamError } from '../error/invalid-param-error';

export class SignupController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
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
    const isValid = this.emailValidator.isValid(httpRequest.body.email);

    if (!isValid) {
      return badResquest(new InvalidParamError('email'));
    }
  }
}
