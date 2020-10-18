import {
  AddSurvey,
  AddSurveyParams,
} from '../../domain/usecases/survey/add-survey';

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add(data: AddSurveyParams): Promise<void> {
      return Promise.resolve();
    }
  }
  return new AddSurveyStub();
};
