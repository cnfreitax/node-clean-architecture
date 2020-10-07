import { Collection } from 'mongodb';
import { MongoHelper } from '../helpers/mongo-helper';
import { SurveyResultMongoRepository } from './survey-result-mongo-repository';
import { SurveyModel } from '../../../../domain/models/survey';
import { AccountModel } from '../../../../domain/models/account';

let surveyCollections: Collection;
let surveyRessultCollection: Collection;
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
        answer: 'any_answer',
      },
      {
        answer: 'other_answer',
      },
    ],
    date: new Date(),
  });
  return res.ops[0];
};

const makeAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any@mail.com',
    password: 'any_password',
  });
  return res.ops[0];
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

    surveyRessultCollection = await MongoHelper.getCollection('surveysResults');
    await surveyRessultCollection.deleteMany({});

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
      expect(surveyResult.answer).toBe(survey.answers[0].answer);
    });
  });
});
