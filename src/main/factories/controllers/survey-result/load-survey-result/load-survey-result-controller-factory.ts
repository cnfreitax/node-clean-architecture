import { LoadSurveyResultController } from '../../../../../presentation/controllers/survey-result/load-survey-result/load-survey-result-controller';
import { Controller } from '../../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorater-factorie';
import { makeDbLoadSurveyResult } from '../../../usecases/survey-result/load-survey-result/db-save-survey-result-factory';
import { makeDbLoadSurveyById } from '../../../usecases/survey/load-survey-by-id/db-load-survey-by-id-factory';

export const makeLoadSurveyResultController = (): Controller => {
  return makeLogControllerDecorator(
    new LoadSurveyResultController(
      makeDbLoadSurveyById(),
      makeDbLoadSurveyResult(),
    ),
  );
};
