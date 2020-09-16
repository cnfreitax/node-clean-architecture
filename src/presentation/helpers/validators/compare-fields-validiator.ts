import { Validation } from '../../protocols/validation';
import { InvalidParamError } from '../../error';

export class CompareFieldsValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly fieldToCompareName: string,
  ) {}

  validate(data: any): Error {
    if (data[this.fieldName] !== data[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName);
    }
  }
}
