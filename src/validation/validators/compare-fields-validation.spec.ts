import { InvalidParamError } from '../../presentation/error';
import { CompareFieldsValidation } from './compare-fields-validiator';

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCompare');
};

describe('CompareFieldValidation', () => {
  test('Should return InvalidParamError if validation fails', () => {
    const sut = makeSut();
    const error = sut.validate({ field: 'test', fieldToCompare: 'testError' });
    expect(error).toEqual(new InvalidParamError('fieldToCompare'));
  });

  test('Should not return error if validation success', () => {
    const sut = makeSut();
    const error = sut.validate({ field: 'test', fieldToCompare: 'test' });
    expect(error).toBeFalsy();
  });
});
