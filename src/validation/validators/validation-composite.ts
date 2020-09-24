import { Validation } from '../../presentation/protocols';

export class ValidationComposite implements Validation {
  constructor(private readonly validation: Validation[]) {}

  validate(data: any): Error {
    for (const validation of this.validation) {
      const error = validation.validate(data);
      if (error) {
        return error;
      }
    }
  }
}
