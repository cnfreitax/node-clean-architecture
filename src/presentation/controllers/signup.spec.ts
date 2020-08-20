import { SignupController } from './signup';
import { MissingParamError } from '../error/missing-param-error';

describe('Signup Controller', () => {
  test('Should return 400 if no name is provider', () => {
    const sut = new SignupController();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        password_confirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });
});

describe('Signup Controller', () => {
  test('Should return 400 if no email is provider', () => {
    const sut = new SignupController();
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        password_confirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });
});

describe('Signup Controller', () => {
  test('Should return 400 if no password is provider', () => {
    const sut = new SignupController();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password_confirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });
});

describe('Signup Controller', () => {
  test('Should return 400 if no password confirmation is provider', () => {
    const sut = new SignupController();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError('password confirmation'),
    );
  });
});
