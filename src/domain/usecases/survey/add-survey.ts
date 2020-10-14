export type SurveyAnwser = {
  image?: string;
  answer: string;
};

export type AddSurveyParams = {
  question: string;
  answers: SurveyAnwser[];
  date: Date;
};

export interface AddSurvey {
  add(data: AddSurveyParams): Promise<void>;
}
