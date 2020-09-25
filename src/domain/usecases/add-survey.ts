export interface SurveyAnwser {
  image: string;
  answer: string;
}

export interface AddSurveyModel {
  question: string;
  answers: SurveyAnwser[];
}

export interface AddSurvey {
  add(data: AddSurveyModel): Promise<void>;
}
