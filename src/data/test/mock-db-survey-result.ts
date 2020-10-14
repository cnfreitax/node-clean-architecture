import { mockSurveyResult } from '../../domain/test/';
import { SaveSurveyResultParams } from '../../domain/usecases/survey-result/save-survey-result';
import { SurveryResultModel } from '../../domain/usecases/survey-result/surveys-result';
import { SaveSurveyResultRepository } from '../protocols/db/survey-result/save-surveys-result-repository';

export const mockAddSaveSurveyResultRepsotirory = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save(
      surveyData: SaveSurveyResultParams,
    ): Promise<SurveryResultModel> {
      return new Promise(resolve => resolve(mockSurveyResult()));
    }
  }
  return new SaveSurveyResultRepositoryStub();
};
