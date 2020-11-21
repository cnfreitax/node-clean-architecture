import Mockdate from 'mockdate';
import {
  throwError,
  mockFakeSurveyResultDate,
  mockSurveyResult,
} from '../../../../domain/test';
import { DbSaveSurveyResult } from './db-save-survey-result';
import {
  mockAddSaveSurveyResultRepsotirory,
  mockLoadSurveyResultRepository,
} from '../../../test';
import { SaveSurveyResultRepository } from './db-save-survey-result-protocols';
import { LoadSurveyResultRepository } from '../../../protocols/db/survey-result/load-survey-result-repository';

type SutTypes = {
  sut: DbSaveSurveyResult;
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository;
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository();
  const saveSurveyResultRepositoryStub = mockAddSaveSurveyResultRepsotirory();
  const sut = new DbSaveSurveyResult(
    saveSurveyResultRepositoryStub,
    loadSurveyResultRepositoryStub,
  );
  return {
    sut,
    saveSurveyResultRepositoryStub,
    loadSurveyResultRepositoryStub,
  };
};

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => {
    Mockdate.set(new Date());
  });
  afterAll(() => {
    Mockdate.reset();
  });

  test('Should call SaveSuveryResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save');
    await sut.save(mockFakeSurveyResultDate());
    expect(saveSpy).toHaveBeenCalledWith(mockFakeSurveyResultDate());
  });

  test('Should call LoadSuveryResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(
      loadSurveyResultRepositoryStub,
      'loadBySurveyId',
    );
    const { surveyId, accountId } = mockFakeSurveyResultDate();
    await sut.save(mockFakeSurveyResultDate());
    expect(loadSpy).toHaveBeenCalledWith(surveyId, accountId);
  });

  test('Should return an suvery result on success', async () => {
    const { sut } = makeSut();
    const surveyResult = await sut.save(mockFakeSurveyResultDate());
    expect(surveyResult).toEqual(mockSurveyResult());
  });

  test('Should throws if SaveSuveryResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(saveSurveyResultRepositoryStub, 'save')
      .mockImplementationOnce(throwError);
    const promise = sut.save(mockFakeSurveyResultDate());
    await expect(promise).rejects.toThrow();
  });

  test('Should throws if LoadSuveryResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockImplementationOnce(throwError);
    const promise = sut.save(mockFakeSurveyResultDate());
    await expect(promise).rejects.toThrow();
  });
});
