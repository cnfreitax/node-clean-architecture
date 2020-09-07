import { Validation } from '../../protocols/validation';

export class ValidationComposite implements Validation {
  private readonly validation: Validation[];
  constructor(validation: Validation[]) {
    this.validation = validation;
  }

  validate(data: any): Error {
    for (const validation of this.validation) {
      const error = validation.validate(data);
      if (error) {
        return error;
      }
    }
  }
}
