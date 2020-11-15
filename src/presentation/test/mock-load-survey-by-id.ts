import { SurveyModel } from '../../domain/models/survey';
import { mockFakeSurvey } from '../../domain/test';
import { LoadSurveyById } from '../../domain/usecases/survey/load-survey-by-id';

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById(id: string): Promise<SurveyModel> {
      return Promise.resolve(mockFakeSurvey());
    }
  }
  return new LoadSurveyByIdStub();
};
