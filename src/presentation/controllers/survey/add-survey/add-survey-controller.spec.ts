import { HttpRequest, Validation } from './add-survey-controller-protocols';
import { AddSurveyController } from './add-survey-controller';

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answer: [
      {
        image: 'any_image',
        question: 'any_question',
      },
    ],
  },
});

describe('AddSurvey Controller', () => {
  test('Should call Validation with correct values', async () => {
    class ValidationStub implements Validation {
      validate(data: any): Error {
        return null;
      }
    }

    const validationStub = new ValidationStub();
    const sut = new AddSurveyController(validationStub);
    const validationSpy = jest.spyOn(validationStub, 'validate');
    const request = makeFakeRequest();
    await sut.handle(request);
    expect(validationSpy).toHaveBeenCalledWith(request.body);
  });
});
