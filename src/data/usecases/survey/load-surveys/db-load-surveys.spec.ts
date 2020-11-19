import { LoadSurveysRepository } from '../../../protocols/db/survey/load-surveys-repository';
import { DbLoadSurveys } from './db-load-surveys';
import Mockdate from 'mockdate';
import { mockFakeSurveysList, throwError } from '../../../../domain/test';
import { mockLoadSurveysRepository } from '../../../test';

type SutTypes = {
  sut: DbLoadSurveys;
  loadSurveysRepositoryStub: LoadSurveysRepository;
};

const accountId = 'any_account_id';

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepository();
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub);
  return {
    sut,
    loadSurveysRepositoryStub,
  };
};

describe('DbLoadSurveys', () => {
  beforeEach(() => {
    Mockdate.set(new Date());
  });

  afterAll(() => {
    Mockdate.reset();
  });
  test('Should call LoadSurveysReepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    const loadRepositorySpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');
    await sut.load(accountId);
    expect(loadRepositorySpy).toHaveBeenCalledWith('any_account_id');
  });

  test('Should throws if LoadSurveysReepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveysRepositoryStub, 'loadAll')
      .mockImplementationOnce(throwError);
    const promise = sut.load(accountId);
    await expect(promise).rejects.toThrow();
  });

  test('Should return an surveys list on success', async () => {
    const { sut } = makeSut();
    const surveys = await sut.load(accountId);
    expect(surveys).toEqual(mockFakeSurveysList());
  });
});
