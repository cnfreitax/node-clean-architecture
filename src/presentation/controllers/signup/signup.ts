import { badResquest, serverError, ok } from '../../helpers/http-helpers';
import {
  EmailValidator,
  Controller,
  HttpRequest,
  HttpResponse,
  AddAccount,
  Validation,
} from './signup-protocols';
import { InvalidParamError, MissingParamError } from '../../error';

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

      const { name, email, password, passwordConfirmation } = httpRequest.body;
      if (password !== passwordConfirmation) {
        return badResquest(new InvalidParamError('passwordConfirmation'));
      }
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
