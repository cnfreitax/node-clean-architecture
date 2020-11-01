export type SurveryResultModel = {
  surveyId: string;
  question: string;
  answers: SurveyResultAnswerModel[];
  date: Date;
};

type SurveyResultAnswerModel = {
  image?: string;
  answer: string;
  count: number;
  percent: number;
};
