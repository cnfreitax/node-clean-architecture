import { AddSurveyController } from '../../../../../presentation/controllers/survey/add-survey/add-survey-controller';
import { Controller } from '../../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorater-factorie';
import { makeAddSurvey } from '../../../usecases/survey/db-add-survey-factory';
import { makeAddSurveyValidation } from './add-survey-validation-factory';

export const maekAddSurveyController = (): Controller => {
  return makeLogControllerDecorator(
    new AddSurveyController(makeAddSurveyValidation(), makeAddSurvey()),
  );
};
