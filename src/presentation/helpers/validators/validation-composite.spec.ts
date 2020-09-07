import { ValidationComposite } from './validation-composite';
import { Validation } from './validation';
import { MissingParamError } from '../../error';

interface SutTypes {
  sut: ValidationComposite;
  validationStub: Validation;
}

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate(data: any): Error {
      return null;
    }
  }

  return new ValidationStub();
};

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub();
  const sut = new ValidationComposite([validationStub]);
  return {
    sut,
    validationStub,
  };
};

describe('ValidatioComposite', () => {
  test('Should return a error if any validation fails', () => {
    const { sut, validationStub } = makeSut();
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('field'));
    const error = sut.validate({ field: 'any_data' });
    expect(error).toEqual(new MissingParamError('field'));
  });
});
