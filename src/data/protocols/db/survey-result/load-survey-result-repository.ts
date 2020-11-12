import { SurveryResultModel } from '../../../../domain/usecases/survey-result/surveys-result';

export interface LoadSurveyResultRepository {
  loadBySurveyId(surveyId: string): Promise<SurveryResultModel>;
}
