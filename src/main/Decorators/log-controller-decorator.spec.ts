import { LogControllerDecorator } from './log-controller-decorator';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../presentation/protocols';
import { serverError, ok } from '../../presentation/helpers/http/http-helpers';
import { LogErrorRepository } from '../../data/protocols/db/log/log-error-repository';
import { mockFakeAccountModel } from '../../domain/test';
import { mockLogErrorRepository } from '../../data/test';

interface SutType {
  sut: LogControllerDecorator;
  controllerStub: Controller;
  logErrorRepositoryStub: LogErrorRepository;
}

const makeFakeError = (): HttpResponse => {
  const fakeError = new Error();
  fakeError.stack = 'any_stack';
  return serverError(fakeError);
};

const fakeHttpRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
});

const makeController = (): any => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      return Promise.resolve(ok(mockFakeAccountModel()));
    }
  }
  return new ControllerStub();
};

const makeSut = (): SutType => {
  const controllerStub = makeController();
  const logErrorRepositoryStub = mockLogErrorRepository();
  const sut = new LogControllerDecorator(
    controllerStub,
    logErrorRepositoryStub,
  );
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub,
  };
};

describe('LogController Decorator', () => {
  test('Should call controller handle ', async () => {
    const { sut, controllerStub } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, 'handle');
    await sut.handle(fakeHttpRequest());
    expect(handleSpy).toHaveBeenCalledWith(fakeHttpRequest());
  });

  test('Should result the same of the controller ', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(fakeHttpRequest());
    expect(httpResponse).toEqual(ok(mockFakeAccountModel()));
  });

  test('Should call logEWrrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut();

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError');
    jest
      .spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(Promise.resolve(makeFakeError()));
    await sut.handle(fakeHttpRequest());
    expect(logSpy).toHaveBeenCalledWith('any_stack');
  });
});
