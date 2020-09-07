import { RequiredFieldValidiation } from './required-field-validation';
import { MissingParamError } from '../../error';

describe('RequiredField Validation', () => {
  test('Should return a MissingParam error if validation fails', () => {
    const sut = new RequiredFieldValidiation('field');
    const error = sut.validate({ name: 'name' });
    expect(error).toEqual(new MissingParamError('field'));
  });

  test('Should not return error if validation success', () => {
    const sut = new RequiredFieldValidiation('field');
    const error = sut.validate({ field: 'name' });
    expect(error).toBeFalsy();
  });
});
