import { SurveryResultModel } from '../../domain/models/surveys-result';
import { mockSurveyResult } from '../../domain/test';
import { LoadSurveyResult } from '../../domain/usecases/survey-result/load-survey-result';

export const mockLoadSurveyResult = (): LoadSurveyResult => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    async load(id: string, accountId: string): Promise<SurveryResultModel> {
      return Promise.resolve(mockSurveyResult());
    }
  }
  return new LoadSurveyResultStub();
};
