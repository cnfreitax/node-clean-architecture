import { AddSurveyRepository, AddSurveyParams } from './add-survey-protocols';
import { DbAddSurvey } from './db-add-Survery';
import Mockdate from 'mockdate';

const makeSurveyData = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer',
    },
  ],
  date: new Date(),
});

type SutTypes = {
  sut: DbAddSurvey;
  addSurveyRepositoryStub: AddSurveyRepository;
};

const makeAddSurveyRepsotirory = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(surveyData: AddSurveyParams): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }
  return new AddSurveyRepositoryStub();
};

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepsotirory();
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
    await sut.add(makeSurveyData());
    expect(addSurveyRepositorySpy).toHaveBeenCalledWith(makeSurveyData());
  });
  test('Should throws AddSuveryRepository throws ', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();

    jest
      .spyOn(addSurveyRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const promise = sut.add(makeSurveyData());
    await expect(promise).rejects.toThrow();
  });
});
