import { mockSurveyResult, throwError } from '../../../../domain/test';
import { mockLoadSurveyResultRepository } from '../../../test';
import { DbLoadSurveyResult } from './db-load-survey-result';
import { LoadSurveyResultRepository } from './db-load-survey-result-protocols';

type SutTypes = {
  sut: DbLoadSurveyResult;
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository;
};

const mockSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository();
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub);
  return {
    sut,
    loadSurveyResultRepositoryStub,
  };
};

describe('DbLoadSurveyResult UseCase', () => {
  test('should call LoadSurveyResultRepository', async () => {
    const { sut, loadSurveyResultRepositoryStub } = mockSut();
    const loadSurveyIdSpy = jest.spyOn(
      loadSurveyResultRepositoryStub,
      'loadBySurveyId',
    );
    await sut.load('any_survey_id');
    expect(loadSurveyIdSpy).toHaveBeenCalledWith('any_survey_id');
  });

  test('Should return an suvery result model on success', async () => {
    const { sut } = mockSut();
    const surveyResult = await sut.load('any_survei_id');
    expect(surveyResult).toEqual(mockSurveyResult());
  });

  test('Should throws if LoadSuveryResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = mockSut();
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockImplementationOnce(throwError);
    const promise = sut.load('any_survey_id');
    await expect(promise).rejects.toThrow();
  });
});
