import { LoginController } from './login';
import {
  badResquest,
  serverError,
  anauthorized,
} from '../../helpers/http-helpers';
import { MissingParamError, InvalidParamError } from '../../error';
import { EmailValidator, HttpRequest } from '../signup/signup-protocols';
import { Authentication } from '../../../domain/usecases/authentication';

interface SutType {
  sut: LoginController;
  emailValidatorStub: EmailValidator;
  authenticationStub: Authentication;
}

const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    email: 'any@mail.com',
    password: 'any_password',
  },
});

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(email: string, password: string): Promise<string> {
      return new Promise(resolve => resolve('any_token'));
    }
  }
  return new AuthenticationStub();
};

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

const makeSut = (): SutType => {
  const emailValidatorStub = makeEmailValidator();
  const authenticationStub = makeAuthentication();
  const sut = new LoginController(emailValidatorStub, authenticationStub);
  return {
    sut,
    emailValidatorStub,
    authenticationStub,
  };
};

describe('Login Controller', () => {
  test('Should return 400 if email is not provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: 'any_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badResquest(new MissingParamError('email')));
  });

  test('Should return 400 if password is not provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any@mail.com',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      badResquest(new MissingParamError('password')),
    );
  });

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const emailValidatorSpy = jest.spyOn(emailValidatorStub, 'isValid');
    await sut.handle(makeFakeHttpRequest());
    expect(emailValidatorSpy).toHaveBeenCalledWith('any@mail.com');
  });

  test('Should return 400 if invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(badResquest(new InvalidParamError('email')));
  });

  test('(Should return 500 if EmailValidator throws)', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpReponse = await sut.handle(makeFakeHttpRequest());
    expect(httpReponse).toEqual(serverError(new Error()));
  });

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, 'auth');
    await sut.handle(makeFakeHttpRequest());
    expect(authSpy).toHaveBeenCalledWith('any@mail.com', 'any_password');
  });

  test('Should return 401 if invalid credential is provided', async () => {
    const { sut, authenticationStub } = makeSut();
    jest
      .spyOn(authenticationStub, 'auth')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)));
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(anauthorized());
  });
});
