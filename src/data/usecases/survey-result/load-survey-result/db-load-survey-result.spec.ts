import { mockSurveyResult, throwError } from '../../../../domain/test';
import {
  mockLoadSurveyByIdRepository,
  mockLoadSurveyResultRepository,
} from '../../../test';
import { DbLoadSurveyResult } from './db-load-survey-result';
import {
  LoadSurveyResultRepository,
  LoadSurveyByIdRepository,
} from './db-load-survey-result-protocols';
import mockdate from 'mockdate';

type SutTypes = {
  sut: DbLoadSurveyResult;
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository;
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository;
};

const mockSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository();
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository();
  const sut = new DbLoadSurveyResult(
    loadSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub,
  );
  return {
    sut,
    loadSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub,
  };
};

describe('DbLoadSurveyResult UseCase', () => {
  beforeAll(() => {
    mockdate.set(new Date());
  });
  afterAll(() => {
    mockdate.reset();
  });
  test('should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = mockSut();
    const loadSurveyIdSpy = jest.spyOn(
      loadSurveyResultRepositoryStub,
      'loadBySurveyId',
    );
    await sut.load('any_survey_id', 'account_id');
    expect(loadSurveyIdSpy).toHaveBeenCalledWith('any_survey_id', 'account_id');
  });

  test('should call LoadSurveyByIdRepository if LoadSurveyResults returns null', async () => {
    const {
      sut,
      loadSurveyByIdRepositoryStub,
      loadSurveyResultRepositoryStub,
    } = mockSut();
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockReturnValueOnce(Promise.resolve(null));
    const loadBySurveyIdSpy = jest.spyOn(
      loadSurveyByIdRepositoryStub,
      'loadById',
    );
    await sut.load('any_survey_id', 'account_id');
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id');
  });

  test('should return an SurveyResultModel with count 0 if LoadSurveyResults returns null', async () => {
    const { sut, loadSurveyResultRepositoryStub } = mockSut();
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockReturnValueOnce(Promise.resolve(null));

    const surveyResult = await sut.load('any_survey_id', 'account_id');
    expect(surveyResult).toEqual(mockSurveyResult());
  });

  test('Should return an suvery result model on success', async () => {
    const { sut } = mockSut();
    const surveyResult = await sut.load('any_survei_id', 'account_id');
    expect(surveyResult).toEqual(mockSurveyResult());
  });

  test('Should throws if LoadSuveryResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = mockSut();
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockImplementationOnce(throwError);
    const promise = sut.load('any_survey_id', 'account_id');
    await expect(promise).rejects.toThrow();
  });
});
