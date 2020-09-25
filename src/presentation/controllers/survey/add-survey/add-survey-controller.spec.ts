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

interface SutTypes {
  sut: AddSurveyController;
  validationStub: Validation;
}

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate(data: any): Error {
      return null;
    }
  }
  return new ValidationStub();
};

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub();
  const sut = new AddSurveyController(validationStub);

  return {
    sut,
    validationStub,
  };
};

describe('AddSurvey Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validationSpy = jest.spyOn(validationStub, 'validate');
    const request = makeFakeRequest();
    await sut.handle(request);
    expect(validationSpy).toHaveBeenCalledWith(request.body);
  });
});
