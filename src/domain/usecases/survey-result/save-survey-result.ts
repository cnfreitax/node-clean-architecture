import { SurveryResultModel } from './surveys-result';

export type SaveSurveyResultParams = Omit<SurveryResultModel, 'id'>;

export interface SaveSurveyResult {
  save(data: SaveSurveyResultParams): Promise<SurveryResultModel>;
}
