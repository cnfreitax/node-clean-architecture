import { MongoHelper } from '../helpers/mongo-helper';
import { Collection } from 'mongodb';
import { LogMongoRepository } from './log';

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository();
};

describe('Log Mongo Repsoitory', () => {
  let errorsCollections: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    errorsCollections = await MongoHelper.getCollection('errors');
    await errorsCollections.deleteMany({}); // delete datas
  });
  test('Should create an error log on success', async () => {
    const sut = makeSut();
    await sut.logError('any_error');
    const count = await errorsCollections.countDocuments();
    expect(count).toBe(1);
  });
});
