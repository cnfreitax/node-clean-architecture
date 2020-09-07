import { SignupController } from './signup';
import { MissingParamError, ServerError } from '../../error';
import {
  AddAccount,
  AddAccountModel,
  AccountModel,
  Validation,
} from './signup-protocols';
import { HttpRequest } from '../../protocols';
import { ok, serverError, badResquest } from '../../helpers/http/http-helpers';

interface SutTypes {
  sut: SignupController;
  addAccountStub: AddAccount;
  validationStub: Validation;
}

const fakeHttpRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
});

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(data: any): Error {
      return null;
    }
  }
  return new ValidationStub();
};

const fakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid@mail.com',
  password: 'valid_password',
});

const makeAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(fakeAccount()));
    }
  }

  return new AddAccountStub();
};

const makeSut = (): SutTypes => {
  const addAccountStub = makeAccount();
  const validationStub = makeValidation();
  const sut = new SignupController(addAccountStub, validationStub);

  return {
    sut,

    addAccountStub,
    validationStub,
  };
};

describe('Signup Controller', () => {
  test('Should return 500 if AddAcount throws', async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()));
    });
    const httpResponse = await sut.handle(fakeHttpRequest());
    expect(httpResponse).toEqual(serverError(new ServerError(null)));
  });

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut();
    const addSpy = jest.spyOn(addAccountStub, 'add');
    await sut.handle(fakeHttpRequest());
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });

  test('Should return 200 if data correct is provider ', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(fakeHttpRequest());
    expect(httpResponse).toEqual(ok(fakeAccount()));
  });

  test('Should call Validation with correct value ', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = fakeHttpRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('Should return 400 if Validator return error', async () => {
    const { sut, validationStub } = makeSut();
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'));
    const httpResponse = await sut.handle(fakeHttpRequest());
    expect(httpResponse).toEqual(
      badResquest(new MissingParamError('any_field')),
    );
  });
});
