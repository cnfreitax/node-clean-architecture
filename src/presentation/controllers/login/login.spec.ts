import { LoginController } from './login';
import { badResquest } from '../../helpers/http-helpers';
import { MissingParamError } from '../../error';

interface SutType {
  sut: LoginController;
}

const makeSut = (): SutType => {
  const sut = new LoginController();
  return {
    sut,
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
});
