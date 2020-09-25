import { AddSurveyRepository, AddSurveyModel } from './add-survey-protocols';
import { DbAddSurvey } from './db-add-Survery';

const makeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer',
    },
  ],
});

describe('DbAddSurvey', () => {
  test('Should call AddSuveryRepository with correct values', async () => {
    class AddSurveyRepositoryStub implements AddSurveyRepository {
      async add(surveyData: AddSurveyModel): Promise<void> {
        return new Promise(resolve => resolve());
      }
    }

    const addSurveyRepositoryStub = new AddSurveyRepositoryStub();
    const sut = new DbAddSurvey(addSurveyRepositoryStub);
    const addSurveyRepositorySpy = jest.spyOn(addSurveyRepositoryStub, 'add');
    await sut.add(makeSurveyData());
    expect(addSurveyRepositorySpy).toHaveBeenCalledWith(makeSurveyData());
  });
});
