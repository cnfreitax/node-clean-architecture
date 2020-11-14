import { Collection, ObjectId } from 'mongodb';
import { MongoHelper } from '../helpers/mongo-helper';
import { SurveyResultMongoRepository } from './survey-result-mongo-repository';
import { SurveyModel } from '../../../../domain/models/survey';
import { AccountModel } from '../../../../domain/models/account';

let surveyCollections: Collection;
let surveyResultCollection: Collection;
let accountCollection: Collection;

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository();
};

const makeSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollections.insertOne({
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer_1',
      },
      {
        answer: 'any_answer_2',
      },
      {
        answer: 'any_answer_3',
      },
    ],
    date: new Date(),
  });
  return MongoHelper.map(res.ops[0]);
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
    await surveyCollections.deleteMany({});

    surveyResultCollection = await MongoHelper.getCollection('surveyResults');
    await surveyResultCollection.deleteMany({});

    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  describe('Save method', () => {
    test('Should add a survey ressult if its new', async () => {
      const sut = makeSut();
      const survey = await makeSurvey();
      const account = await makeAccount();
      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date(),
      });

      expect(surveyResult).toBeTruthy();
      expect(surveyResult.surveyId).toEqual(survey.id);
      expect(surveyResult.answers[0].count).toBe(1);
    });

    test('Should update a survey ressult if its not new', async () => {
      const sut = makeSut();
      const survey = await makeSurvey();
      const account = await makeAccount();

      await surveyResultCollection.insertOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date(),
      });
      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[1].answer,
        date: new Date(),
      });

      expect(surveyResult).toBeTruthy();
      expect(surveyResult.surveyId).toEqual(survey.id);
      expect(surveyResult.answers[0].answer).toBe(survey.answers[1].answer);
      expect(surveyResult.answers[0].count).toBe(1);
      expect(surveyResult.answers[0].percent).toBe(100);
      expect(surveyResult.answers[1].count).toBe(0);
      expect(surveyResult.answers[1].percent).toBe(0);
    });
  });
});

describe('loadSurvey()', () => {
  test('Should load surveys', async () => {
    const sut = makeSut();
    const survey = await makeSurvey();
    const account = await makeAccount();

    await surveyResultCollection.insertMany([
      {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date(),
      },
      {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date(),
      },
      {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[1].answer,
        date: new Date(),
      },
      {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[1].answer,
        date: new Date(),
      },
    ]);
    const surveyResult = await sut.loadBySurveyId(survey.id);

    expect(surveyResult).toBeTruthy();
    expect(surveyResult.surveyId).toEqual(survey.id);
    expect(surveyResult.answers[0].count).toBe(2);
    expect(surveyResult.answers[0].percent).toBe(50);
    expect(surveyResult.answers[1].count).toBe(2);
    expect(surveyResult.answers[1].percent).toBe(50);
    expect(surveyResult.answers[2].percent).toBe(0);
  });
});
