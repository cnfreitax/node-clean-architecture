import { SurveyResultModel } from '../models/surveys-result';

export type SaveSurveyResultModel = Omit<SurveyResultModel, 'id'>;

export interface SaveSurveyResult {
  save(data: SaveSurveyResultModel): Promise<SurveyResultModel>;
}
