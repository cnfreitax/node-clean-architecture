import { SurveyModel } from '../../domain/models/survey';
import { mockFakeSurveysList } from '../../domain/test';
import { LoadSurveys } from '../../domain/usecases/survey/load-surveys';

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(mockFakeSurveysList()));
    }
  }
  return new LoadSurveysStub();
};
