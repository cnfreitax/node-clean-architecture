import { ValidationComposite } from './validation-composite';
import { Validation } from './validation';

describe('ValidatioComposite', () => {
  test('Should return a error if any validation fails', () => {
    class ValidationStub implements Validation {
      validate(data: any): Error {
        return new Error();
      }
    }

    const validationStub = new ValidationStub();
    const sut = new ValidationComposite([validationStub]);
    const error = sut.validate({ field: 'any_data' });
    expect(error).toEqual(new Error());
  });
});
