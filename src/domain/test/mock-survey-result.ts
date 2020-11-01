import { SaveSurveyResultParams } from '../usecases/survey-result/save-survey-result';
import { SurveryResultModel } from '../usecases/survey-result/surveys-result';

export const mockSurveyResult = (): SurveryResultModel => ({
  surveyId: 'any_survey_id',
  question: 'any_question',
  answers: [
    {
      answer: 'any_answer',
      image: 'any_image',
      count: 20,
      percent: 30,
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
