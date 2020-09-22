import { makeSignUpValidation } from './signup-validation-factorie';
import { Validation } from '../../../../presentation/protocols/validation';
import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldValidiation,
  ValidationComposite,
} from '../../../../presentation/helpers/validators';
import { EmailValidator } from '../../../../presentation/protocols/email-validotr';

jest.mock('../../../../presentation/helpers/validators/validation-composite');

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
