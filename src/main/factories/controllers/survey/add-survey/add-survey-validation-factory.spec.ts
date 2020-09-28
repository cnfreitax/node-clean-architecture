import { makeAddSurveyValidation } from './add-survey-validation-factory';
import { ValidationComposite } from '../../../../../validation/validators/validation-composite';
import { RequiredFieldValidiation } from '../../../../../validation/validators/required-field-validation';
import { Validation } from '../../../../../presentation/protocols/validation';

jest.mock('../../../../../validation/validators/validation-composite');

describe('AddSurveyValidiation Factory', () => {
  test('Should call ValidationComposite ', () => {
    makeAddSurveyValidation();
    const validations: Validation[] = [];
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidiation(field));
    }
    expect(ValidationComposite).toHaveBeenLastCalledWith(validations);
  });
});
