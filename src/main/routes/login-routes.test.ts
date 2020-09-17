import request from 'supertest';
import app from '../config/app';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const mongoCollections = await MongoHelper.getCollection('accounts');
    await mongoCollections.deleteMany({}); // delete datas
  });

  describe('Post/signup', () => {
    test('Should return an 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'any_name',
          email: 'any@mail.com',
          password: 'password',
          passwordConfirmation: 'password',
        })
        .expect(200);
    });
  });
});
