import { MissingParamError } from '../../presentation/error';
import { RequiredFieldValidiation } from './required-field-validation';

const makeSut = (): RequiredFieldValidiation => {
  return new RequiredFieldValidiation('field');
};

describe('RequiredField Validation', () => {
  test('Should return a MissingParam error if validation fails', () => {
    const sut = makeSut();
    const error = sut.validate({ name: 'name' });
    expect(error).toEqual(new MissingParamError('field'));
  });

  test('Should not return error if validation success', () => {
    const sut = makeSut();
    const error = sut.validate({ field: 'name' });
    expect(error).toBeFalsy();
  });
});
