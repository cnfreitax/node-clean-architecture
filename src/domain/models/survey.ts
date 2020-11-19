export type SurveyModel = {
  id: string;
  question: string;
  answers: SurveyAnwser[];
  date: Date;
  didAnswer: boolean;
};

type SurveyAnwser = {
  image?: string;
  answer: string;
};
