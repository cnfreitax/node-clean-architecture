import { DbLoadAccountByToken } from './db-load-account-by-token';
import { Decrypter } from '../../protocols/criptography/decrypter';

interface SutTypes {
  sut: DbLoadAccountByToken;
  decrypterStub: Decrypter;
}

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(value: string): Promise<string> {
      return new Promise(resolve => resolve('any_value'));
    }
  }
  return new DecrypterStub();
};

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter();
  const sut = new DbLoadAccountByToken(decrypterStub);
  return {
    sut,
    decrypterStub,
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
});
