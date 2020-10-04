import { SurveyAnwser } from '../usecases/add-survey';

export type SurveyModel = {
  id: string;
  question: string;
  answers: SurveyAnwser[];
  date: Date;
};
