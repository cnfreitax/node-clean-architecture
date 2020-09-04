import { badResquest, serverError, ok } from '../../helpers/http-helpers';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  AddAccount,
  Validation,
} from './signup-protocols';

export class SignupController implements Controller {
  private readonly addAccount: AddAccount;
  private readonly validaton: Validation;

  constructor(addAccount: AddAccount, validaton: Validation) {
    this.addAccount = addAccount;
    this.validaton = validaton;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validaton.validate(httpRequest.body);
      if (error) {
        return badResquest(error);
      }

      const { name, email, password } = httpRequest.body;

      const account = await this.addAccount.add({
        name,
        email,
        password,
      });

      return ok(account);
    } catch (error) {
      return serverError(error);
    }
  }
}
