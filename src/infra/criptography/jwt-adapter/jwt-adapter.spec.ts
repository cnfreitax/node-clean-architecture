import { JwtAdapter } from './jwt-adapter';
import jwt from 'jsonwebtoken';

describe('Jwt Adapter', () => {
  test('Should call JwtAdapter with correct values ', async () => {
    const sut = new JwtAdapter('secret');
    const jwtSpy = jest.spyOn(jwt, 'sign');
    await sut.encrypt('any_id');
    expect(jwtSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
  });
});
