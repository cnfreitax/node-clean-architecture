import { LoginController } from './login-controller';
import {
  HttpRequest,
  Authentication,
  Validation,
  AuthenticationModel,
  badResquest,
  serverError,
  anauthorized,
  ok,
  MissingParamError,
} from './login-controller-protocols';

interface SutType {
  sut: LoginController;
  authenticationStub: Authentication;
  validationStub: Validation;
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(data: any): Error {
      return null;
    }
  }
  return new ValidationStub();
};

const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    email: 'any@mail.com',
    password: 'any_password',
  },
});

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(authentication: AuthenticationModel): Promise<string> {
      return new Promise(resolve => resolve('any_token'));
    }
  }
  return new AuthenticationStub();
};

const makeSut = (): SutType => {
  const validationStub = makeValidation();
  const authenticationStub = makeAuthentication();
  const sut = new LoginController(authenticationStub, validationStub);
  return {
    sut,
    authenticationStub,
    validationStub,
  };
};

describe('Login Controller', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, 'auth');
    await sut.handle(makeFakeHttpRequest());
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any@mail.com',
      password: 'any_password',
    });
  });

  test('Should return 401 if invalid credential is provided', async () => {
    const { sut, authenticationStub } = makeSut();
    jest
      .spyOn(authenticationStub, 'auth')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)));
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(anauthorized());
  });

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut();
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResnpose = await sut.handle(makeFakeHttpRequest());
    expect(httpResnpose).toEqual(serverError(new Error()));
  });

  test('Should return 200 if Authentication calls correct values', async () => {
    const { sut } = makeSut();

    const httpResnpose = await sut.handle(makeFakeHttpRequest());
    expect(httpResnpose).toEqual(ok({ accessToken: 'any_token' }));
  });

  test('Should call Validation with correct value ', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('Should return 400 if Validator return error', async () => {
    const { sut, validationStub } = makeSut();
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'));
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(
      badResquest(new MissingParamError('any_field')),
    );
  });
});
