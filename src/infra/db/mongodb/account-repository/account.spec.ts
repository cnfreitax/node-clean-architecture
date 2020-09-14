import { Collection } from 'mongodb';
import { MongoHelper } from '../helpers/mongo-helper';
import { AccountMongoRepository } from './account';

let accountCollections: Collection;

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollections = await MongoHelper.getCollection('accounts');
    await accountCollections.deleteMany({}); // delete datas
  });

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository();
  };

  test('Should return an account on add success', async () => {
    const sut = makeSut();
    const account = await sut.add({
      name: 'any_name',
      email: 'any@mail.com',
      password: 'any_password',
    });

    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('any_name');
    expect(account.email).toBe('any@mail.com');
    expect(account.password).toBe('any_password');
  });

  test('Should return an account on loadByEmail success', async () => {
    const sut = makeSut();
    await accountCollections.insertOne({
      name: 'any_name',
      email: 'any@mail.com',
      password: 'any_password',
    });
    const account = await sut.loadByEmail('any@mail.com');
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('any_name');
    expect(account.email).toBe('any@mail.com');
    expect(account.password).toBe('any_password');
  });

  test('Should return null if loadByEmail fail', async () => {
    const sut = makeSut();
    const account = await sut.loadByEmail('any@mail.com');
    expect(account).toBeFalsy();
  });

  test('Should update the account accessToken on updateAcessToken success', async () => {
    const sut = makeSut();
    const res = await accountCollections.insertOne({
      name: 'any_name',
      email: 'any@mail.com',
      password: 'any_password',
    });
    const fakeAccount = res.ops[0];
    expect(fakeAccount.accessToken).toBeFalsy();
    await sut.updateAccessToken(fakeAccount._id, 'any_token');
    const account = await accountCollections.findOne({ _id: fakeAccount._id });
    expect(account).toBeTruthy();
    expect(account.accessToken).toBe('any_token');
  });
});
