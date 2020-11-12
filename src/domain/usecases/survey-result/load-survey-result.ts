import { SurveryResultModel } from './surveys-result';

export interface LoadSurveyResult {
  load(surveyId: string): Promise<SurveryResultModel>;
}
