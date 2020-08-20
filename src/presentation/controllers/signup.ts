import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError } from '../error/missing-param-error';
import { badResquest } from '../helpers/http-helpers';

export class SignupController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badResquest(new MissingParamError('name'));
    }

    if (!httpRequest.body.email) {
      return badResquest(new MissingParamError('email'));
    }
  }
}
