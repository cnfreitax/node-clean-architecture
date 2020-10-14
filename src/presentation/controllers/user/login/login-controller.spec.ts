import { LoginController } from './login-controller';
import { mockAuthentication, mockValidation } from '../../../test';
import {
  HttpRequest,
  Authentication,
  Validation,
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

const mockFakeHttpRequest = (): HttpRequest => ({
  body: {
    email: 'any@mail.com',
    password: 'any_password',
  },
});

const makeSut = (): SutType => {
  const validationStub = mockValidation();
  const authenticationStub = mockAuthentication();
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
    await sut.handle(mockFakeHttpRequest());
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
    const httpResponse = await sut.handle(mockFakeHttpRequest());
    expect(httpResponse).toEqual(anauthorized());
  });

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut();
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResnpose = await sut.handle(mockFakeHttpRequest());
    expect(httpResnpose).toEqual(serverError(new Error()));
  });

  test('Should return 200 if Authentication calls correct values', async () => {
    const { sut } = makeSut();

    const httpResnpose = await sut.handle(mockFakeHttpRequest());
    expect(httpResnpose).toEqual(ok({ accessToken: 'any_token' }));
  });

  test('Should call Validation with correct value ', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = mockFakeHttpRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('Should return 400 if Validator return error', async () => {
    const { sut, validationStub } = makeSut();
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'));
    const httpResponse = await sut.handle(mockFakeHttpRequest());
    expect(httpResponse).toEqual(
      badResquest(new MissingParamError('any_field')),
    );
  });
});
