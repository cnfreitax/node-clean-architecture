import { mockSurveyResult } from '../../domain/test';
import {
  SaveSurveyResult,
  SaveSurveyResultParams,
} from '../../domain/usecases/survey-result/save-survey-result';
import { SurveryResultModel } from '../../domain/models/surveys-result';

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save(data: SaveSurveyResultParams): Promise<SurveryResultModel> {
      return Promise.resolve(mockSurveyResult());
    }
  }
  return new SaveSurveyResultStub();
};
