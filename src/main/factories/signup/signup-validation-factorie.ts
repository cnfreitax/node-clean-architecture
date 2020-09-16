import { EmailValidatorAdapter } from '../../../main/adapters/validators/email-validator-adapter';
import { Validation } from '../../../presentation/protocols/validation';
import {
  ValidationComposite,
  RequiredFieldValidiation,
  EmailValidation,
  CompareFieldsValidation,
} from '../../../presentation/helpers/validators';

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidiation(field));
  }
  validations.push(
    new CompareFieldsValidation('password', 'passwordConfirmation'),
  );

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
