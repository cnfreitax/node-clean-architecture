import Mockdate from 'mockdate';
import { mockFakeSurvey, throwError } from '../../../../domain/test';
import { LoadSurveyByIdRepository } from '../../../protocols/db/survey/load-survey-by-id-repository';
import { DbLoadSurveyById } from './db-load-survey-by-id';
import { mockLoadSurveyByIdRepositoryRepository } from '../../../test';

type SutTypes = {
  sut: DbLoadSurveyById;
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepositoryRepository();
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub);
  return {
    sut,
    loadSurveyByIdRepositoryStub,
  };
};

describe('DbLoadSurveyById', () => {
  beforeEach(() => {
    Mockdate.set(new Date());
  });

  afterAll(() => {
    Mockdate.reset();
  });
  test('Should call LoadSurveysByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    const loadRepositorySpy = jest.spyOn(
      loadSurveyByIdRepositoryStub,
      'loadById',
    );
    await sut.loadById('any_id');
    expect(loadRepositorySpy).toHaveBeenCalledWith('any_id');
  });

  test('Should return an survey on success', async () => {
    const { sut } = makeSut();
    const surveys = await sut.loadById('any_id');
    expect(surveys).toEqual(mockFakeSurvey());
  });

  test('Should throws if LoadSurveyByIdReepository throws', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdRepositoryStub, 'loadById')
      .mockImplementationOnce(throwError);
    const promise = sut.loadById('any_id');
    await expect(promise).rejects.toThrow();
  });
});
