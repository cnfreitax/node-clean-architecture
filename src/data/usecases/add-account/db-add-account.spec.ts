import {
  Encrypter,
  AccountModel,
  AddAccountModel,
  AddAccountRepository,
} from './db-add-account-protocols';
import { DbAddAccount } from './db-add-account';

interface SutTypes {
  sut: DbAddAccount;
  encrypterStub: Encrypter;
  addAccountRepositoryStub: AddAccountRepository;
}

const fakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid@mail.com',
  password: 'valid_password',
});

const accountData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid@mail.com',
  password: 'valid_password',
});

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(fakeAccount()));
    }
  }
  return new AddAccountRepositoryStub();
};

const makeEncypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'));
    }
  }
  return new EncrypterStub();
};

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncypter();
  const addAccountRepositoryStub = makeAddAccountRepository();
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);

  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub,
  };
};

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password ', async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    await sut.add(accountData());
    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });

  test('Should throws Encrypter throws ', async () => {
    const { sut, encrypterStub } = makeSut();

    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const promise = sut.add(accountData());
    await expect(promise).rejects.toThrow();
  });

  test('Should throws DbAddAccount throws ', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();

    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const promise = sut.add(accountData());
    await expect(promise).rejects.toThrow();
  });

  test('Should callAddAccountRepository with correct values ', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    await sut.add(accountData());
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid@mail.com',
      password: 'hashed_password',
    });
  });

  test('Should return account on success ', async () => {
    const { sut } = makeSut();
    const account = await sut.add(accountData());
    expect(account).toEqual(fakeAccount());
  });
});
