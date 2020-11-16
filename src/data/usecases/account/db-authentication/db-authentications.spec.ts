import { mockFakeAuthentication, throwError } from '../../../../domain/test';
import { DbAuthentication } from './db-authentication';
import {
  UpdateAccessTokenRepository,
  Encrypter,
  HashComparer,
  LoadAccountByEmailRepository,
} from './db-authentication-protocols';
import {
  mockEncrypter,
  mockHashCompare,
  mockLoadAccountByEmailRepository,
  mockUpdateAccessToken,
} from '../../../test';

type SutTypes = {
  sut: DbAuthentication;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
  hashComparerStub: HashComparer;
  encrypterStub: Encrypter;
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository();
  const hashComparerStub = mockHashCompare();
  const encrypterStub = mockEncrypter();
  const updateAccessTokenRepositoryStub = mockUpdateAccessToken();
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub,
  );
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub,
  };
};

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail');
    await sut.auth(mockFakeAuthentication());
    expect(loadSpy).toHaveBeenCalledWith('any@mail.com');
  });

  test('Should throws if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockImplementationOnce(throwError);
    const promise = sut.auth(mockFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });

  test('Should returns null if LoadAccountByEmailRepository return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(null);
    const authModel = await sut.auth(mockFakeAuthentication());
    expect(authModel).toBe(null);
  });

  test('Should call HashCompare with correct values', async () => {
    const { sut, hashComparerStub } = makeSut();
    const hashSpy = jest.spyOn(hashComparerStub, 'compare');
    await sut.auth(mockFakeAuthentication());
    expect(hashSpy).toHaveBeenCalledWith('any_password', 'hashed_password');
  });

  // quando o método for assincrono, no mock, precisa retornar uma new Promise
  test('Should throws if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut();
    jest.spyOn(hashComparerStub, 'compare').mockImplementationOnce(throwError);
    const promise = sut.auth(mockFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });

  test('(Should return null if HashCompare returns false)', async () => {
    const { sut, hashComparerStub } = makeSut();
    jest
      .spyOn(hashComparerStub, 'compare')
      .mockReturnValueOnce(Promise.resolve(false));
    const authModel = await sut.auth(mockFakeAuthentication());
    expect(authModel).toBeNull();
  });

  test('Should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut();
    const generateSpy = jest.spyOn(encrypterStub, 'encrypt');
    await sut.auth(mockFakeAuthentication());
    expect(generateSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should throws if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(throwError);
    const promise = sut.auth(mockFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });

  test('Should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut();
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt');
    await sut.auth(mockFakeAuthentication());
    expect(encrypterSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should call UpdateAcessTokenRepository', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut();
    const updateSpy = jest.spyOn(
      updateAccessTokenRepositoryStub,
      'updateAccessToken',
    );
    await sut.auth(mockFakeAuthentication());
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token');
  });

  test('Should return throws if UpdateAccessTokenRepository return throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut();
    jest
      .spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
      .mockResolvedValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const promise = sut.auth(mockFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });

  test('Should return accessToken and name on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.auth(mockFakeAuthentication());
    expect(httpResponse).toEqual({
      accessToken: 'any_token',
      name: 'any_name',
    });
  });
});
