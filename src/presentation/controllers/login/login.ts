import {
  badResquest,
  serverError,
  anauthorized,
  ok,
} from '../../helpers/http/http-helpers';
import {
  Authentication,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from './login-protocols';

export class LoginController implements Controller {
  private readonly authentication: Authentication;
  private readonly validation: Validation;
  constructor(authentication: Authentication, validation: Validation) {
    this.authentication = authentication;
    this.validation = validation;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badResquest(error);
      }
      const { email, password } = httpRequest.body;

      const accessToken = await this.authentication.auth(email, password);
      if (!accessToken) {
        return anauthorized();
      }
      return ok({ accessToken });
    } catch (err) {
      return serverError(err);
    }
  }
}
