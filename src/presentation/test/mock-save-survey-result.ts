import {
  SaveSurveyResult,
  SaveSurveyResultParams,
} from '../../domain/usecases/survey-result/save-survey-result';
import { SurveryResultModel } from '../../domain/usecases/survey-result/surveys-result';

export const mockSurveyResultSaved = (): SurveryResultModel => ({
  id: 'any_id',
  surveyId: 'any_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date(),
});

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save(data: SaveSurveyResultParams): Promise<SurveryResultModel> {
      return new Promise(resolve => resolve(mockSurveyResultSaved()));
    }
  }
  return new SaveSurveyResultStub();
};
