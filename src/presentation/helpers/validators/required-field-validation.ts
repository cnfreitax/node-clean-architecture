import { Validation } from '../../protocols/validation';
import { MissingParamError } from '../../error';

export class RequiredFieldValidiation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(data: any): Error {
    if (!data[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
  }
}
