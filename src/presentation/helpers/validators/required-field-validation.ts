import { Validation } from './validation';
import { MissingParamError } from '../../error';

export class RequiredFieldValidiation implements Validation {
  private readonly fieldName: string;
  constructor(fieldName: string) {
    this.fieldName = fieldName;
  }

  validate(data: any): Error {
    if (!data[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
  }
}
