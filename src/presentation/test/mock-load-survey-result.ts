import { mockSurveyResult } from '../../domain/test';
import { LoadSurveyResult } from '../../domain/usecases/survey-result/load-survey-result';
import { SurveryResultModel } from '../../domain/usecases/survey-result/surveys-result';

export const mockLoadSurveyResult = (): LoadSurveyResult => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    async load(id: string): Promise<SurveryResultModel> {
      return Promise.resolve(mockSurveyResult());
    }
  }
  return new LoadSurveyResultStub();
};
