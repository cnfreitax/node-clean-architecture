import { makeLoginValidation } from './login-validation-factorie-factorie';
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite';
import { RequiredFieldValidiation } from '../../../presentation/helpers/validators/required-field-validation';
import { Validation } from '../../../presentation/protocols/validation';
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation';
import { EmailValidator } from '../../../presentation/protocols/email-validotr';

jest.mock('../../../presentation/helpers/validators/validation-composite');

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

describe('LoginValidation Factorie', () => {
  test('Should call ValidationComposite ', () => {
    makeLoginValidation();
    const validations: Validation[] = [];
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidiation(field));
    }
    validations.push(new EmailValidation('email', makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenLastCalledWith(validations);
  });
});
