import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve('hashmock');
  },

  async compare(): Promise<boolean> {
    return Promise.resolve(true);
  },
}));

const salt = 12;
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe('Bcrypt Adapter', () => {
  describe('hash', () => {
    test('Should call hash with correct value', async () => {
      const sut = makeSut();
      const hashSpy = jest.spyOn(bcrypt, 'hash');
      await sut.hash('any_value');
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
    });

    test('Should return valid hash on hash success', async () => {
      const sut = makeSut();
      const hash = await sut.hash('any_value');
      expect(hash).toBe('hashmock');
    });

    test('Should throws if hash throws', async () => {
      const sut = makeSut();
      jest
        .spyOn(bcrypt, 'hash')
        .mockReturnValueOnce(
          new Promise((resolve, reject) => reject(new Error())),
        );
      const promise = sut.hash('any_value');
      await expect(promise).rejects.toThrow();
    });
  });

  describe('Compare', () => {
    test('Should call compare with correct values ', async () => {
      const sut = makeSut();
      const compareSpy = jest.spyOn(bcrypt, 'compare');
      await sut.compare('any_value', 'any_hash');
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash');
    });

    test('Should return true on compare success', async () => {
      const sut = makeSut();
      const isValid = await sut.compare('any_value', 'any_hash');
      expect(isValid).toBe(true);
    });

    test('Should return false if compare fails ', async () => {
      const sut = makeSut();
      jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.resolve(false));
      const notValid = await sut.compare('wrong_value', 'any_hash');
      expect(notValid).toBe(false);
    });

    test('Should throws if compare throws ', async () => {
      const sut = makeSut();
      jest
        .spyOn(bcrypt, 'compare')
        .mockReturnValueOnce(
          new Promise((resolve, reject) => reject(new Error())),
        );
      const promise = sut.compare('wrong_value', 'any_hash');
      await expect(promise).rejects.toThrow();
    });
  });
});
