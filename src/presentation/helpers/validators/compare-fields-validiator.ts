import { Validation } from './validation';
import { InvalidParamError } from '../../error';

export class CompareFieldsValidiator implements Validation {
  private readonly fieldName: string;
  private readonly fieldToCompareName: string;

  constructor(fieldName: string, fieldToCompareName: string) {
    this.fieldName = fieldName;
    this.fieldToCompareName = fieldToCompareName;
  }

  validate(data: any): Error {
    if (data[this.fieldName] !== data[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName);
    }
  }
}
