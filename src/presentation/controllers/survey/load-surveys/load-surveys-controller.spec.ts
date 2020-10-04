import {
  LoadSurveys,
  SurveyModel,
  ok,
  serverError,
} from './load-surveys-controller-protocols';
import { LoadSurveysController } from './load-surveys-controller';
import Mockdate from 'mockdate';
import { noContent } from '../../../helpers/http/http-helpers';

type SutTypes = {
  sut: LoadSurveysController;
  loadSurveysStub: LoadSurveys;
};

const makeFakeSurveysList = (): SurveyModel[] => {
  return [
    {
      id: 'any_id',
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer',
        },
      ],
      date: new Date(),
    },
  ];
};

const makeLoadSurveysStub = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(makeFakeSurveysList()));
    }
  }
  return new LoadSurveysStub();
};

const makeSut = (): SutTypes => {
  const loadSurveysStub = makeLoadSurveysStub();
  const sut = new LoadSurveysController(loadSurveysStub);
  return {
    sut,
    loadSurveysStub,
  };
};

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    Mockdate.set(new Date());
  });
  afterAll(() => {
    Mockdate.reset();
  });

  test('Should call LoadSurveys ', async () => {
    const { sut, loadSurveysStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveysStub, 'load');
    await sut.handle({});
    expect(loadSpy).toHaveBeenCalled();
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const response = await sut.handle({});
    expect(response).toEqual(ok(makeFakeSurveysList()));
  });

  test('Should return 204 if LoadSurveys return empty', async () => {
    const { sut, loadSurveysStub } = makeSut();
    jest
      .spyOn(loadSurveysStub, 'load')
      .mockReturnValueOnce(new Promise(resolve => resolve([])));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(noContent());
  });

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut();
    jest
      .spyOn(loadSurveysStub, 'load')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const httpresponse = await sut.handle({});
    expect(httpresponse).toEqual(serverError(new Error()));
  });
});
