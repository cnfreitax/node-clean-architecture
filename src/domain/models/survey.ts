import { SurveyAnwser } from '../usecases/survey/add-survey';

export type SurveyModel = {
  id: string;
  question: string;
  answers: SurveyAnwser[];
  date: Date;
};
