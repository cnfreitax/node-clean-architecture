import { Validation } from '../../protocols/validation';
import { EmailValidator } from '../../protocols/email-validotr';
import { InvalidParamError } from '../../error';

export class EmailValidation implements Validation {
  private readonly emailValidator: EmailValidator;
  private readonly fieldName: string;

  constructor(fieldName: string, emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
    this.fieldName = fieldName;
  }

  validate(data: any): Error {
    const isValid = this.emailValidator.isValid(data[this.fieldName]);
    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
