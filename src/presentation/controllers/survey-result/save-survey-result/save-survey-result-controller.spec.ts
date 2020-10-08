import {
  HttpRequest,
  LoadSurveysById,
  SurveyModel,
} from './save-survey-result-controller-protocols';
import { SaveSurveyResultController } from './save-survey-result-controller';

type SutType = {
  sut: SaveSurveyResultController;
  loadSurveyByIdStub: LoadSurveysById;
};

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id',
  },
});

const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer',
    },
  ],
  date: new Date(),
});

const makeLoadSurveyById = (): LoadSurveysById => {
  class LoadSurveyByIdStub implements LoadSurveysById {
    async loadById(id: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(makeFakeSurvey()));
    }
  }
  return new LoadSurveyByIdStub();
};

const makeSut = (): SutType => {
  const loadSurveyByIdStub = makeLoadSurveyById();
  const sut = new SaveSurveyResultController(loadSurveyByIdStub);
  return {
    loadSurveyByIdStub,
    sut,
  };
};

describe('SaveSurveyResultController', () => {
  test('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    const surveyByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById');
    await sut.handle(makeFakeRequest());
    expect(surveyByIdSpy).toHaveBeenCalledWith('any_id');
  });
});
