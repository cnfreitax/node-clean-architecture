import { throwError } from '../../domain/test';
import { AuthMiddleware } from './auth-middleware';
import { mockLoadAccountByToken } from '../test';
import {
  HttpRequest,
  forbidden,
  ok,
  serverError,
  AccessDeniedError,
  LoadAccountByToken,
} from './auth-middlewares-protocols';

const mockFakeRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token',
  },
});

type SutTypes = {
  sut: AuthMiddleware;
  loadAccountByTokenStub: LoadAccountByToken;
};

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenStub = mockLoadAccountByToken();
  const sut = new AuthMiddleware(loadAccountByTokenStub, role);

  return {
    sut,
    loadAccountByTokenStub,
  };
};

describe('Authentication Middleware', () => {
  test('Should return 403 if no x-access-token is exists in headers', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test('Should call LoadAccountByToken with correct token', async () => {
    const role = 'any_role';
    const { sut, loadAccountByTokenStub } = makeSut(role);
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load');
    await sut.handle(mockFakeRequest());
    expect(loadSpy).toHaveBeenCalledWith('any_token', role);
  });

  test('Should return 403 if LoadAccountByToken return null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    jest
      .spyOn(loadAccountByTokenStub, 'load')
      .mockReturnValueOnce(Promise.resolve(null));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test('Should return 200 if LoadAccountByToken return an account', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(ok({ accountId: 'any_id' }));
  });

  test('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    jest
      .spyOn(loadAccountByTokenStub, 'load')
      .mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
