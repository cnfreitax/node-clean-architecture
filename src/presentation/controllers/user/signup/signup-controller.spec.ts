import { SignupController } from './signup-controller';
import { HttpRequest } from '../../../protocols';
import { mockAccount, mockAuthentication, mockValidation } from '../../../test';
import {
  EmailInUseError,
  MissingParamError,
  ServerError,
} from '../../../error';
import {
  AddAccount,
  Validation,
  Authentication,
} from './signup-controller-protocols';
import {
  ok,
  serverError,
  badResquest,
  forbidden,
} from '../../../helpers/http/http-helpers';

type SutTypes = {
  sut: SignupController;
  addAccountStub: AddAccount;
  authenticationStub: Authentication;
  validationStub: Validation;
};

const mockFakeHttpRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
});

const makeSut = (): SutTypes => {
  const addAccountStub = mockAccount();
  const validationStub = mockValidation();
  const authenticationStub = mockAuthentication();
  const sut = new SignupController(
    addAccountStub,
    validationStub,
    authenticationStub,
  );

  return {
    sut,
    validationStub,
    addAccountStub,
    authenticationStub,
  };
};

describe('Signup Controller', () => {
  test('Should return 500 if AddAcount throws', async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()));
    });
    const httpResponse = await sut.handle(mockFakeHttpRequest());
    expect(httpResponse).toEqual(serverError(new ServerError(null)));
  });

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut();
    const addSpy = jest.spyOn(addAccountStub, 'add');
    await sut.handle(mockFakeHttpRequest());
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });

  test('Should return 200 if data correct is provider ', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockFakeHttpRequest());
    expect(httpResponse).toEqual(
      ok({ accessToken: 'any_token', name: 'any_name' }),
    );
  });

  test('Should return 403 if AddAccount return null ', async () => {
    const { sut, addAccountStub } = makeSut();
    jest
      .spyOn(addAccountStub, 'add')
      .mockReturnValueOnce(Promise.resolve(null));
    const httpResponse = await sut.handle(mockFakeHttpRequest());
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()));
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

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, 'auth');
    await sut.handle(mockFakeHttpRequest());
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut();
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResnpose = await sut.handle(mockFakeHttpRequest());
    expect(httpResnpose).toEqual(serverError(new Error()));
  });
});
