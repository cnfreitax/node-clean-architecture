import { MongoHelper as sut } from './mongo-helper';

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await sut.disconnect();
  });

  test('Should reconect if mongodb is down', async () => {
    let accountConection = sut.getCollection('accounts');
    expect(accountConection).toBeTruthy();
    await sut.disconnect();
    accountConection = sut.getCollection('accounts');
    expect(accountConection).toBeTruthy();
  });
});
