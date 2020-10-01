export interface SurveyAnwser {
  image?: string;
  answer: string;
}

export interface AddSurveyModel {
  question: string;
  answers: SurveyAnwser[];
  date: Date;
}

export interface AddSurvey {
  add(data: AddSurveyModel): Promise<void>;
}
