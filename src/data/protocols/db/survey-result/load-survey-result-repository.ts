import { SurveryResultModel } from '../../../../domain/models/surveys-result';

export interface LoadSurveyResultRepository {
  loadBySurveyId(
    surveyId: string,
    accountId: string,
  ): Promise<SurveryResultModel>;
}
