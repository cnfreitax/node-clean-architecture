import { DbLoadAccountByToken } from './db-load-account-by-token';
import { Decrypter } from '../../../protocols/criptography/decrypter';
import { LoadAccountByTokenRepository } from '../../../protocols/db/account/load-account-by-token-repository';
import { mockFakeAccountModel, throwError } from '../../../../domain/test';
import { mockDecrypter, mockLoadAccountByTokenRepository } from '../../../test';

type SutTypes = {
  sut: DbLoadAccountByToken;
  decrypterStub: Decrypter;
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository;
};

const makeSut = (): SutTypes => {
  const decrypterStub = mockDecrypter();
  const loadAccountByTokenRepositoryStub = mockLoadAccountByTokenRepository();
  const sut = new DbLoadAccountByToken(
    decrypterStub,
    loadAccountByTokenRepositoryStub,
  );
  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepositoryStub,
  };
};

describe('LoadAccountByToken Usecase', () => {
  test('Should call Dcrypter with correct value', async () => {
    const { sut, decrypterStub } = makeSut();
    const decrypterSpy = jest.spyOn(decrypterStub, 'decrypt');
    await sut.load('encrypt_value', 'any_role');
    expect(decrypterSpy).toHaveBeenCalledWith('encrypt_value');
  });

  test('Should return null if Dcrypter return null', async () => {
    const { sut, decrypterStub } = makeSut();
    jest
      .spyOn(decrypterStub, 'decrypt')
      .mockReturnValueOnce(Promise.resolve(null));
    const account = await sut.load('encrypt_value', 'any_role');
    expect(account).toBeNull();
  });

  test('Should call LoadAccountByTokenRepository with correct value', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    const decrypterSpy = jest.spyOn(
      loadAccountByTokenRepositoryStub,
      'loadByToken',
    );
    await sut.load('encrypt_value', 'any_role');
    expect(decrypterSpy).toHaveBeenCalledWith('encrypt_value', 'any_role');
  });

  test('Should return null if LoadAccountByTokenRepository return null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
      .mockReturnValueOnce(Promise.resolve(null));
    const account = await sut.load('encrypt_value', 'any_role');
    expect(account).toBeNull();
  });

  test('Should return an account on success', async () => {
    const { sut } = makeSut();
    const account = await sut.load('encrypt_value', 'any_role');
    expect(account).toEqual(mockFakeAccountModel());
  });

  test('Should throws if  LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
      .mockImplementationOnce(throwError);
    const promise = sut.load('encrypt_value', 'any_role');
    await expect(promise).rejects.toThrow();
  });

  test('Should throws if  Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut();
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(throwError);
    const promise = sut.load('encrypt_value', 'any_role');
    await expect(promise).rejects.toThrow();
  });
});
