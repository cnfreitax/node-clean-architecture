import { ValidationComposite } from './validation-composite';
import { Validation } from './validation';
import { MissingParamError } from '../../error';

interface SutTypes {
  sut: ValidationComposite;
  validationStubs: Validation[];
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
  const validationStubs = [makeValidationStub(), makeValidationStub()];
  const sut = new ValidationComposite(validationStubs);
  return {
    sut,
    validationStubs,
  };
};

describe('ValidatioComposite', () => {
  test('Should return a error if any validation fails', () => {
    const { sut, validationStubs } = makeSut();
    jest
      .spyOn(validationStubs[0], 'validate')
      .mockReturnValueOnce(new MissingParamError('field'));
    const error = sut.validate({ field: 'any_data' });
    expect(error).toEqual(new MissingParamError('field'));
  });
});
