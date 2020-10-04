import { MissingParamError } from '../../presentation/error';
import { Validation } from '../../presentation/protocols/validation';
import { ValidationComposite } from './validation-composite';

type SutTypes = {
  sut: ValidationComposite;
  validationStubs: Validation[];
};

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

  test('Should return first error if more then one validation fails', () => {
    const { sut, validationStubs } = makeSut();
    jest
      .spyOn(validationStubs[0], 'validate')
      .mockReturnValueOnce(new MissingParamError('field'));
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new Error());
    const error = sut.validate({ field: 'any_data' });
    expect(error).toEqual(new MissingParamError('field'));
  });

  test('Should not return error if validation success', () => {
    const { sut } = makeSut();
    const error = sut.validate({ field: 'any_data' });
    expect(error).toBeFalsy();
  });
});
