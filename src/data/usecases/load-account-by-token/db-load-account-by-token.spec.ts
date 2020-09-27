import { DbLoadAccountByToken } from './db-load-account-by-token';
import { Decrypter } from '../../protocols/criptography/decrypter';
import { AccountModel } from '../../../domain/models/account';
import { LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository';

interface SutTypes {
  sut: DbLoadAccountByToken;
  decrypterStub: Decrypter;
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository;
}

const fakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid@mail.com',
  password: 'valid_password',
});

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(value: string): Promise<string> {
      return new Promise(resolve => resolve('any_value'));
    }
  }
  return new DecrypterStub();
};

const makeLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub
    implements LoadAccountByTokenRepository {
    async loadByToken(token: string, role: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(fakeAccount()));
    }
  }
  return new LoadAccountByTokenRepositoryStub();
};

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter();
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepository();
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
      .mockReturnValueOnce(new Promise(resolve => resolve(null)));
    const decrypterResponse = await sut.load('encrypt_value', 'any_role');
    expect(decrypterResponse).toBeNull();
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
});
