import { SaveSurveyResultParams } from '../../domain/usecases/survey-result/save-survey-result';
import { SaveSurveyResultRepository } from '../protocols/db/survey-result/save-surveys-result-repository';

export const mockAddSaveSurveyResultRepsotirory = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save(surveyData: SaveSurveyResultParams): Promise<void> {
      return Promise.resolve();
    }
  }
  return new SaveSurveyResultRepositoryStub();
};
