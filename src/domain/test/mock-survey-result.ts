import { SaveSurveyResultParams } from '../usecases/survey-result/save-survey-result';
import { SurveryResultModel } from '../usecases/survey-result/surveys-result';

export const mockSurveyResult = (): SurveryResultModel => ({
  id: 'any_id',
  surveyId: 'any_question',
  answer: 'any_answer',
  accountId: 'any_id',
  date: new Date(),
});

export const mockFakeSurveyResultDate = (): SaveSurveyResultParams => ({
  surveyId: 'any_question',
  answer: 'any_answer',
  accountId: 'any_id',
  date: new Date(),
});
