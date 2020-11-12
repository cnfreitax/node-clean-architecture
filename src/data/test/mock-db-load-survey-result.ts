import { mockSurveyResult } from '../../domain/test/';
import { SurveryResultModel } from '../../domain/usecases/survey-result/surveys-result';
import { LoadSurveyResultRepository } from '../protocols/db/survey-result/load-survey-result-repository';

export const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId(surveyId: string): Promise<SurveryResultModel> {
      return Promise.resolve(mockSurveyResult());
    }
  }
  return new LoadSurveyResultRepositoryStub();
};
