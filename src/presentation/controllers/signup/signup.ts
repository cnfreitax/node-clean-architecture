import { badResquest, serverError, ok } from '../../helpers/http-helpers';
import {
  EmailValidator,
  Controller,
  HttpRequest,
  HttpResponse,
  AddAccount,
  Validation,
} from './signup-protocols';
import { InvalidParamError } from '../../error';

export class SignupController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly addAccount: AddAccount;
  private readonly validaton: Validation;

  constructor(
    emailValidator: EmailValidator,
    addAccount: AddAccount,
    validaton: Validation,
  ) {
    this.emailValidator = emailValidator;
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

      const isValid = this.emailValidator.isValid(email);

      if (!isValid) {
        return badResquest(new InvalidParamError('email'));
      }
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
