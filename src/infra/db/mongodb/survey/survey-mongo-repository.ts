import { ObjectId } from 'mongodb';
import { LoadSurveysRepository } from '../../../../data/protocols/db/survey/load-surveys-repository';
import {
  AddSurveyParams,
  AddSurveyRepository,
} from '../../../../data/usecases/survey/add-survey/add-survey-protocols';
import { SurveyModel } from '../../../../domain/models/survey';
import { LoadSurveyById } from '../../../../domain/usecases/survey/load-survey-by-id';
import { MongoHelper, QueryBuilder } from '../helpers';

export class SurveyMongoRepository
  implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyById {
  async add(surveyData: AddSurveyParams): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.insertOne(surveyData);
  }

  async loadAll(accountId: string): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const query = new QueryBuilder()
      .lookup({
        // fazendo um JOIN na tabela local com a surveyResults
        from: 'surveyResults',
        foreignField: 'surveyId',
        localField: '_id',
        as: 'result',
      })
      .project({
        _id: 1,
        question: 1,
        answer: 1,
        date: 1,
        didAnswer: {
          $gte: [
            {
              $size: {
                $filter: {
                  input: '$result',
                  as: 'item',
                  cond: {
                    $eq: ['$$item.accountId', new ObjectId(accountId)], // ObjectId pois vem como string
                  },
                },
              },
            },
            1,
          ],
        },
      })
      .build();

    const surveys = await surveyCollection.aggregate(query).toArray();
    return surveys && MongoHelper.mapCollection(surveys);
  }

  async loadById(id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) });
    return survey && MongoHelper.map(survey);
  }
}
