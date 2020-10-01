import { SurveyAnwser } from '../usecases/add-survey';

export interface SurveyModel {
  id: string;
  question: string;
  answers: SurveyAnwser[];
  date: Date;
}
