import { Validation } from '../../presentation/protocols';
import { MissingParamError } from '../../presentation/error';

export class RequiredFieldValidiation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(data: any): Error {
    if (!data[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
  }
}
