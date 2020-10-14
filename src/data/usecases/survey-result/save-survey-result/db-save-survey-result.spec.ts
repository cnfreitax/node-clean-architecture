import Mockdate from 'mockdate';
import {
  throwError,
  mockFakeSurveyResultDate,
  mockSurveyResult,
} from '../../../../domain/test';
import { DbSaveSurveyResult } from './db-save-survey-result';
import { mockAddSaveSurveyResultRepsotirory } from '../../../test';
import { SaveSurveyResultRepository } from './db-save-survey-result-protocols';

type SutTypes = {
  sut: DbSaveSurveyResult;
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository;
};

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockAddSaveSurveyResultRepsotirory();
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub);
  return {
    sut,
    saveSurveyResultRepositoryStub,
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
});
