import { makeSignUpValidation } from './signup-validation';
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite';
import { RequiredFieldValidiation } from '../../presentation/helpers/validators/required-field-validation';
import { Validation } from '../../presentation/helpers/validators/validation';

jest.mock('../../presentation/helpers/validators/validation-composite');

describe('SignUpValidation Factiorie', () => {
  test('Should call ValidationComposite ', () => {
    makeSignUpValidation();
    const validations: Validation[] = [];
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidiation(field));
    }
    expect(ValidationComposite).toHaveBeenLastCalledWith(validations);
  });
});
