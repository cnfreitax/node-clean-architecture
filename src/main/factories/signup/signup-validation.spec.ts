import { makeSignUpValidation } from './signup-validation';
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite';
import { RequiredFieldValidiation } from '../../../presentation/helpers/validators/required-field-validation';
import { Validation } from '../../../presentation/helpers/validators/validation';
import { CompareFieldsValidation } from '../../../presentation/helpers/validators/compare-fields-validiator';
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

describe('SignUpValidation Factiorie', () => {
  test('Should call ValidationComposite ', () => {
    makeSignUpValidation();
    const validations: Validation[] = [];
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidiation(field));
    }
    validations.push(
      new CompareFieldsValidation('password', 'passwordConfirmation'),
    );
    validations.push(new EmailValidation('email', makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenLastCalledWith(validations);
  });
});
