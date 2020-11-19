import { Collection } from 'mongodb';
import { AccountModel } from '../../../../domain/models/account';
import { MongoHelper } from '../helpers/mongo-helper';
import { SurveyMongoRepository } from './survey-mongo-repository';

let surveyCollections: Collection;
let surveyResultCollection: Collection;
let accountCollection: Collection;

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository();
};

const makeAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any@mail.com',
    password: 'any_password',
  });
  return MongoHelper.map(res.ops[0]);
};

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollections = await MongoHelper.getCollection('surveys');
    await surveyCollections.deleteMany({}); // delete datas

    surveyResultCollection = await MongoHelper.getCollection('surveyResults');
    await surveyResultCollection.deleteMany({});

    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  describe('Add method', () => {
    test('Should create survey', async () => {
      const sut = makeSut();
      await sut.add({
        question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer',
          },
          {
            answer: 'other_answer',
          },
        ],
        date: new Date(),
      });
      const survey = await surveyCollections.findOne({
        question: 'any_question',
      });
      expect(survey).toBeTruthy();
    });
  });

  describe('Load Surveys', () => {
    test('Should list surveys on success', async () => {
      const account = await makeAccount();
      const result = await surveyCollections.insertMany([
        {
          question: 'any_question',
          answers: [
            {
              image: 'any_image',
              answer: 'any_answer1',
            },
          ],
          date: new Date(),
        },
        {
          question: 'any_question',
          answers: [
            {
              image: 'any_image',
              answer: 'any_answer2',
            },
          ],
          date: new Date(),
        },
      ]);
      const survey = result.ops[0];
      await surveyResultCollection.insertOne({
        surveyId: survey._id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date(),
      });
      const sut = makeSut();
      const surveys = await sut.loadAll(account.id);
      expect(surveys.length).toBe(2);
      expect(surveys[0].id).toBeTruthy();
      expect(surveys[0].didAnswer).toBe(true);
      expect(surveys[1].didAnswer).toBe(false);
    });

    test('Should list empty list', async () => {
      const account = await makeAccount();
      const sut = makeSut();
      const surveys = await sut.loadAll(account.id);
      expect(surveys.length).toBe(0);
    });
  });

  describe('LoadById', () => {
    test('Should load survey by id', async () => {
      const res = await surveyCollections.insertOne({
        question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer',
          },
        ],
        date: new Date(),
      });
      const id = res.ops[0]._id;
      const sut = makeSut();
      const surveys = await sut.loadById(id);
      expect(surveys).toBeTruthy();
      expect(surveys.id).toBeTruthy();
    });
  });
});
