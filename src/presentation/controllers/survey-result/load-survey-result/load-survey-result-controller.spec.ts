import {
  HttpRequest,
  forbidden,
  LoadSurveyById,
  LoadSurveyResult,
  InvalidParamError,
  serverError,
  ok,
} from './load-survey-result-controller-protocols';
import { LoadSurveyResultController } from './load-survey-result-controller';
import { mockLoadSurveyById, mockLoadSurveyResult } from '../../../test';
import { mockSurveyResult, throwError } from '../../../../domain/test';
import MockDate from 'mockdate';

type SutTypes = {
  sut: LoadSurveyResultController;
  loadSurveyByIdStub: LoadSurveyById;
  loadSurveyResultStub: LoadSurveyResult;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById();
  const loadSurveyResultStub = mockLoadSurveyResult();
  const sut = new LoadSurveyResultController(
    loadSurveyByIdStub,
    loadSurveyResultStub,
  );
  return {
    sut,
    loadSurveyByIdStub,
    loadSurveyResultStub,
  };
};

const mockFakeRequest = (): HttpRequest => ({
  accountId: 'any_account_id',
  params: {
    surveyId: 'any_id',
  },
});

describe('LoadSurveyResult Controller', () => {
  beforeEach(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });
  test('Should call LoadSuveyById with correct value ', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    const loadSurveyByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById');
    await sut.handle(mockFakeRequest());
    expect(loadSurveyByIdSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should return 403 if LoadSuveyById returns null ', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdStub, 'loadById')
      .mockReturnValueOnce(Promise.resolve(null));
    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')));
  });

  test('Should return 500 if LoadSuveyById throws ', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdStub, 'loadById')
      .mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should call LoadSuveyResultBy with correct values', async () => {
    const { sut, loadSurveyResultStub } = makeSut();
    const loadSurveyResultSpy = jest.spyOn(loadSurveyResultStub, 'load');
    await sut.handle(mockFakeRequest());
    expect(loadSurveyResultSpy).toHaveBeenCalledWith(
      'any_id',
      'any_account_id',
    );
  });

  test('Should return 500 if LoadSuveyResultBy throws ', async () => {
    const { sut, loadSurveyResultStub } = makeSut();
    jest.spyOn(loadSurveyResultStub, 'load').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(ok(mockSurveyResult()));
  });
});
