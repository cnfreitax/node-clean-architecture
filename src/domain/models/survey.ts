export type SurveyModel = {
  id: string;
  question: string;
  answers: SurveyAnwser[];
  date: Date;
};

type SurveyAnwser = {
  image?: string;
  answer: string;
};
