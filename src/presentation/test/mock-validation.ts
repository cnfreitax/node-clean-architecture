import { Validation } from '../protocols';

export const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(data: any): Error {
      return null;
    }
  }
  return new ValidationStub();
};
