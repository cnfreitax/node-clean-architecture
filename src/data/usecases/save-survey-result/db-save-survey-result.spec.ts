import Mockdate from 'mockdate';
import { DbSaveSurveyResult } from './db-save-survey-result';
import {
  SurveryResultModel,
  SaveSurveyResultData,
  SaveSurveyResultRepository,
} from './db-save-survey-result-protocols';

const makeSurveyResult = (): SurveryResultModel => ({
  id: 'any_id',
  surveyId: 'any_question',
  answer: 'any_answer',
  accountId: 'any_id',
  date: new Date(),
});

const makeFakeSurveyResultDate = (): SaveSurveyResultData => ({
  surveyId: 'any_question',
  answer: 'any_answer',
  accountId: 'any_id',
  date: new Date(),
});

type SutTypes = {
  sut: DbSaveSurveyResult;
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository;
};

const makeAddSaveSurveyResultRepsotirory = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save(surveyData: SaveSurveyResultData): Promise<SurveryResultModel> {
      return new Promise(resolve => resolve(makeSurveyResult()));
    }
  }
  return new SaveSurveyResultRepositoryStub();
};

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeAddSaveSurveyResultRepsotirory();
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
    await sut.save(makeFakeSurveyResultDate());
    expect(saveSpy).toHaveBeenCalledWith(makeFakeSurveyResultDate());
  });
});
