import { JwtAdapter } from './jwt-adapter';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return new Promise(resolve => resolve('any_token'));
  },
}));

describe('Jwt Adapter', () => {
  test('Should call JwtAdapter with correct values ', async () => {
    const sut = new JwtAdapter('secret');
    const jwtSpy = jest.spyOn(jwt, 'sign');
    await sut.encrypt('any_id');
    expect(jwtSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
  });

  test('Should return a token on sign success', async () => {
    const sut = new JwtAdapter('secret');
    const accessToken = await sut.encrypt('any_id');
    expect(accessToken).toBe('any_token');
  });
});
