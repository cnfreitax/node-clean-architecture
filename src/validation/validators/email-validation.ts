import { Validation } from '../../presentation/protocols';
import { EmailValidator } from '../protocols/email-validator';
import { InvalidParamError } from '../../presentation/error';

export class EmailValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator,
  ) {}

  validate(data: any): Error {
    const isValid = this.emailValidator.isValid(data[this.fieldName]);
    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
