import {
  HttpRequest,
  LoadSurveysById,
  forbidden,
  InvalidParamError,
  serverError,
  SaveSurveyResult,
  ok,
} from './save-survey-result-controller-protocols';
import { SaveSurveyResultController } from './save-survey-result-controller';
import MockDate from 'mockdate';
import {
  mockLoadSurveyById,
  mockSaveSurveyResult,
  mockSurveyResultSaved,
} from '../../../test';

type SutType = {
  sut: SaveSurveyResultController;
  loadSurveyByIdStub: LoadSurveysById;
  saveSurveyResultStub: SaveSurveyResult;
};

const mockFakeHttpRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id',
  },
  body: {
    answer: 'any_answer',
  },
  accountId: 'any_account_id',
});

const makeSut = (): SutType => {
  const loadSurveyByIdStub = mockLoadSurveyById();
  const saveSurveyResultStub = mockSaveSurveyResult();
  const sut = new SaveSurveyResultController(
    loadSurveyByIdStub,
    saveSurveyResultStub,
  );

  return {
    sut,
    loadSurveyByIdStub,
    saveSurveyResultStub,
  };
};

describe('SaveSurveyResultController', () => {
  beforeEach(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });
  test('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    const surveyByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById');
    await sut.handle(mockFakeHttpRequest());
    expect(surveyByIdSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdStub, 'loadById')
      .mockReturnValueOnce(Promise.resolve(null));
    const httpResponse = await sut.handle(mockFakeHttpRequest());
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')));
  });

  test('Should return 500 is LoadSurveyById throws ', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdStub, 'loadById')
      .mockRejectedValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const httpResponse = await sut.handle(mockFakeHttpRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 403 if invalid answer is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({
      params: {
        surveyId: 'any_id',
      },
      body: {
        answer: 'wrong_answer',
      },
    });

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')));
  });

  test('Should call SaveSurveyResult with correct value', async () => {
    const { sut, saveSurveyResultStub } = makeSut();
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save');
    await sut.handle(mockFakeHttpRequest());
    expect(saveSpy).toHaveBeenCalledWith({
      surveyId: 'any_id',
      accountId: 'any_account_id',
      answer: 'any_answer',
      date: new Date(),
    });
  });

  test('Should return 500 is SaveSurveyResult throws ', async () => {
    const { sut, saveSurveyResultStub } = makeSut();
    jest
      .spyOn(saveSurveyResultStub, 'save')
      .mockRejectedValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const httpResponse = await sut.handle(mockFakeHttpRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 200 and suvery result on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockFakeHttpRequest());
    expect(httpResponse.statusCode).toEqual(200);
    expect(httpResponse).toEqual(ok(mockSurveyResultSaved()));
  });
});
