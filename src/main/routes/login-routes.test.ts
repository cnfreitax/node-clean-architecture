import request from 'supertest';
import app from '../config/app';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import { Collection } from 'mongodb';
import { hash } from 'bcrypt';

let mongoCollections: Collection;

describe('Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    mongoCollections = await MongoHelper.getCollection('accounts');
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

  describe('POST/login', () => {
    test('Should return 401 on login fail', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'any@mail.com',
          password: '123',
        })
        .expect(401);
    });

    test('Should return 200 on login success', async () => {
      const password = await hash('123', 12);
      await mongoCollections.insertOne({
        name: 'any_name',
        email: 'any@mail.com',
        password,
      });
      await request(app)
        .post('/api/login')
        .send({
          email: 'any@mail.com',
          password: '123',
        })
        .expect(200);
    });
  });
});
