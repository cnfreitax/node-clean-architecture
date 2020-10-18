import { SurveyModel } from '../../domain/models/survey';
import { mockFakeSurvey } from '../../domain/test';
import { LoadSurveysById } from '../../domain/usecases/survey/load-survey-by-id';

export const mockLoadSurveyById = (): LoadSurveysById => {
  class LoadSurveyByIdStub implements LoadSurveysById {
    async loadById(id: string): Promise<SurveyModel> {
      return Promise.resolve(mockFakeSurvey());
    }
  }
  return new LoadSurveyByIdStub();
};
