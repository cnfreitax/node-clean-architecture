import { SurveryResultModel } from '../../../../domain/models/surveys-result';
import { SaveSurveyResultData } from '../../../../domain/usecases/save-survey-result';

export interface SaveSurveyResultRepository {
  save(surveyData: SaveSurveyResultData): Promise<SurveryResultModel>;
}
