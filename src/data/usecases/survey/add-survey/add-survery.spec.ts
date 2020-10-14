import { AddSurveyRepository } from './add-survey-protocols';
import { DbAddSurvey } from './db-add-Survery';
import Mockdate from 'mockdate';
import { mockAddSurveyRepsotirory } from '../../../test';
import { mockAddSurvey, throwError } from '../../../../domain/test';

type SutTypes = {
  sut: DbAddSurvey;
  addSurveyRepositoryStub: AddSurveyRepository;
};

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = mockAddSurveyRepsotirory();
  const sut = new DbAddSurvey(addSurveyRepositoryStub);
  return {
    sut,
    addSurveyRepositoryStub,
  };
};

describe('DbAddSurvey', () => {
  beforeAll(() => {
    Mockdate.set(new Date());
  });
  afterAll(() => {
    Mockdate.reset();
  });

  test('Should call AddSuveryRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    const addSurveyRepositorySpy = jest.spyOn(addSurveyRepositoryStub, 'add');
    await sut.add(mockAddSurvey());
    expect(addSurveyRepositorySpy).toHaveBeenCalledWith(mockAddSurvey());
  });
  test('Should throws AddSuveryRepository throws ', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();

    jest
      .spyOn(addSurveyRepositoryStub, 'add')
      .mockImplementationOnce(throwError);
    const promise = sut.add(mockAddSurvey());
    await expect(promise).rejects.toThrow();
  });
});
