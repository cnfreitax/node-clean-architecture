import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite';
import { RequiredFieldValidiation } from '../../presentation/helpers/validators/required-field-validation';
import { Validation } from '../../presentation/helpers/validators/validation';
import { CompareFieldsValidiator } from '../../presentation/helpers/validators/compare-fields-validiator';

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidiation(field));
  }
  validations.push(
    new CompareFieldsValidiator('password', 'passwordConfirmation'),
  );
  return new ValidationComposite(validations);
};
