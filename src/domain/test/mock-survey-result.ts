import { SaveSurveyResultParams } from '../usecases/survey-result/save-survey-result';
import { SurveryResultModel } from '../models/surveys-result';

export const mockSurveyResult = (): SurveryResultModel => ({
  surveyId: 'any_id',
  question: 'any_question',
  answers: [
    {
      answer: 'any_answer',
      image: 'any_image',
      count: 0,
      percent: 0,
      isCurrentAccountAnswer: false,
    },
  ],
  date: new Date(),
});

export const mockFakeSurveyResultDate = (): SaveSurveyResultParams => ({
  surveyId: 'any_question',
  answer: 'any_answer',
  accountId: 'any_id',
  date: new Date(),
});
