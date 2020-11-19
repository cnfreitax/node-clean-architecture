import { LoadSurveysController } from './load-surveys-controller';
import Mockdate from 'mockdate';
import { noContent } from '../../../helpers/http/http-helpers';
import { mockFakeSurveysList, throwError } from '../../../../domain/test';
import { mockLoadSurveys } from '../../../test';
import {
  LoadSurveys,
  ok,
  serverError,
} from './load-surveys-controller-protocols';
import { HttpRequest } from '../../../protocols';

const mockRequest = (): HttpRequest => ({
  accountId: 'any_account_id',
});

type SutTypes = {
  sut: LoadSurveysController;
  loadSurveysStub: LoadSurveys;
};

const makeSut = (): SutTypes => {
  const loadSurveysStub = mockLoadSurveys();
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

  test('Should call LoadSurveys with correct value', async () => {
    const { sut, loadSurveysStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveysStub, 'load');
    await sut.handle(mockRequest());
    expect(loadSpy).toHaveBeenCalledWith(mockRequest().accountId);
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(ok(mockFakeSurveysList()));
  });

  test('Should return 204 if LoadSurveys return empty', async () => {
    const { sut, loadSurveysStub } = makeSut();
    jest
      .spyOn(loadSurveysStub, 'load')
      .mockReturnValueOnce(Promise.resolve([]));
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(noContent());
  });

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut();
    jest.spyOn(loadSurveysStub, 'load').mockImplementationOnce(throwError);
    const httpresponse = await sut.handle(mockRequest());
    expect(httpresponse).toEqual(serverError(new Error()));
  });
});
