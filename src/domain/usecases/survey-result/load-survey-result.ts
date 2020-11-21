import { SurveryResultModel } from './surveys-result';

export interface LoadSurveyResult {
  load(surveyId: string, accountId: string): Promise<SurveryResultModel>;
}
