import { JwtAdapter } from './jwt-adapter';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return Promise.resolve('any_token');
  },

  async verify(token: String): Promise<string> {
    return Promise.resolve('any_value');
  },
}));

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret');
};

describe('Jwt Adapter', () => {
  describe('Sign', () => {
    test('Should call JwtAdapter with correct values ', async () => {
      const sut = makeSut();
      const jwtSpy = jest.spyOn(jwt, 'sign');
      await sut.encrypt('any_id');
      expect(jwtSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
    });

    test('Should return a token on sign success', async () => {
      const sut = makeSut();
      const accessToken = await sut.encrypt('any_id');
      expect(accessToken).toBe('any_token');
    });

    test('Should throws if sign throws', async () => {
      const sut = makeSut();
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error();
      });
      const promise = sut.encrypt('any_id');
      await expect(promise).rejects.toThrow();
    });
  });

  describe('verify', () => {
    test('Should call verify with correct values ', async () => {
      const sut = makeSut();
      const verifySpy = jest.spyOn(jwt, 'verify');
      await sut.decrypt('any_token');
      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret');
    });

    test('Should return a token on verify success', async () => {
      const sut = makeSut();
      const accessToken = await sut.decrypt('any_token');
      expect(accessToken).toBe('any_value');
    });

    test('Should throws if verify throws', async () => {
      const sut = makeSut();
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error();
      });
      const promise = sut.decrypt('any_id');
      await expect(promise).rejects.toThrow();
    });
  });
});
