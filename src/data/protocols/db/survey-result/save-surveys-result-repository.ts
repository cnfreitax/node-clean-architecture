import { SaveSurveyResultParams } from '../../../../domain/usecases/survey-result/save-survey-result';
import { SurveryResultModel } from '../../../../domain/usecases/survey-result/surveys-result';

export interface SaveSurveyResultRepository {
  save(surveyData: SaveSurveyResultParams): Promise<SurveryResultModel>;
}
