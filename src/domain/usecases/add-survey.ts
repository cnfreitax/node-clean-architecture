export type SurveyAnwser = {
  image?: string;
  answer: string;
};

export type AddSurveyModel = {
  question: string;
  answers: SurveyAnwser[];
  date: Date;
};

export interface AddSurvey {
  add(data: AddSurveyModel): Promise<void>;
}
