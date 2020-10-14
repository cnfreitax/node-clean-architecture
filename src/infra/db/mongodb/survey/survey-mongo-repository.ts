import { ObjectId } from 'mongodb';
import { LoadSurveysRepository } from '../../../../data/protocols/db/survey/load-surveys-repository';
import {
  AddSurveyParams,
  AddSurveyRepository,
} from '../../../../data/usecases/survey/add-survey/add-survey-protocols';
import { SurveyModel } from '../../../../domain/models/survey';
import { LoadSurveysById } from '../../../../domain/usecases/survey/load-survey-by-id';
import { MongoHelper } from '../helpers/mongo-helper';

export class SurveyMongoRepository
  implements AddSurveyRepository, LoadSurveysRepository, LoadSurveysById {
  async add(surveyData: AddSurveyParams): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.insertOne(surveyData);
  }

  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const surveys = await surveyCollection.find().toArray();
    return surveys && MongoHelper.mapCollection(surveys);
  }

  async loadById(id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) });
    return survey && MongoHelper.map(survey);
  }
}
