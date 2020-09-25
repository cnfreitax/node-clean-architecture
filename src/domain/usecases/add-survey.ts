export interface SurveyAnwser {
  image: string;
  question: string;
}

export interface AddSurveyModel {
  question: string;
  answer: SurveyAnwser[];
}

export interface AddSurvey {
  add(data: AddSurveyModel): Promise<void>;
}
