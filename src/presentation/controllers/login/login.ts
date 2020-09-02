import {
  badResquest,
  serverError,
  anauthorized,
} from '../../helpers/http-helpers';
import { MissingParamError, InvalidParamError } from '../../error';
import {
  EmailValidator,
  Authentication,
  Controller,
  HttpRequest,
  HttpResponse,
} from './login-protocols';

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly authentication: Authentication;
  constructor(emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator;
    this.authentication = authentication;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFiels = ['email', 'password'];
      for (const field of requiredFiels) {
        if (!httpRequest.body[field]) {
          return badResquest(new MissingParamError(field));
        }
      }
      const { email, password } = httpRequest.body;

      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return badResquest(new InvalidParamError('email'));
      }
      const accessToken = await this.authentication.auth(email, password);
      if (!accessToken) {
        return anauthorized();
      }
    } catch (err) {
      return serverError(err);
    }
  }
}
