import { SurveryResultModel } from '../models/surveys-result';

export type SaveSurveyResultData = Omit<SurveryResultModel, 'id'>;

export interface SaveSurveyResult {
  save(data: SaveSurveyResultData): Promise<SurveryResultModel>;
}
