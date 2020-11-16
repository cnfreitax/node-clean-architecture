import { EmailInUseError } from '../../../error';
import {
  badResquest,
  serverError,
  ok,
  forbidden,
} from '../../../helpers/http/http-helpers';
import { Authentication } from '../login/login-controller-protocols';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  AddAccount,
  Validation,
} from './signup-controller-protocols';

export class SignupController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badResquest(error);
      }

      const { name, email, password } = httpRequest.body;

      const account = await this.addAccount.add({
        name,
        email,
        password,
      });

      if (!account) {
        return forbidden(new EmailInUseError());
      }

      const authenticationModel = await this.authentication.auth({
        email,
        password,
      });

      return ok(authenticationModel);
    } catch (error) {
      return serverError(error);
    }
  }
}
