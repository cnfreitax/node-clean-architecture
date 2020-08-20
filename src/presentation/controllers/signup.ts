import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError } from '../error/missing-param-error';
import { badResquest } from '../helpers/http-helpers';
import { Controller } from '../protocols/controller';

export class SignupController implements Controller {
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
  }
}
