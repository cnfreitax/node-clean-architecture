import request from 'supertest';
import app from '../config/app';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import { Collection } from 'mongodb';
import { sign } from 'jsonwebtoken';
import env from '../config/env';

let surveyCollection: Collection;
let accountCollection: Collection;

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any@mail.com',
    password: '123',
    role: 'admin',
  });

  const id = res.ops[0]._id;
  const accessToken = sign({ id }, env.jwtSecret);
  await accountCollection.updateOne(
    { _id: id },
    {
      $set: {
        accessToken,
      },
    },
  );
  return accessToken;
};

describe('Survey Result Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  describe('PUT/surveys/:surveyId/results', () => {
    test('Should return 403 on save survery result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_ansewer',
        })
        .expect(403);
    });

    test('Should return 200 on save survery result with accessToken', async () => {
      const accessToken = await makeAccessToken();
      const res = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [
          {
            image: 'Ansewer 1',
            answer: 'any_answer',
          },
          {
            answer: 'other_answer',
          },
        ],
        date: new Date(),
      });
      await request(app)
        .put(`/api/surveys/${res.ops[0]._id}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'Ansewer 1',
        })
        .expect(403);
    });
  });

  describe('GET survey results', () => {
    test('Should return 403 on load survery result without accessToken', async () => {
      await request(app).get('/api/surveys/any_id/results').expect(403);
    });
  });
});
