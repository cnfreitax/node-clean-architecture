import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError } from '../error/missing-param-error';
import { badResquest } from '../helpers/http-helpers';

export class SignupController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email'];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badResquest(new MissingParamError(field));
      }
    }
  }
}
