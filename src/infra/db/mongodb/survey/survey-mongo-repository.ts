import { LoadSurveysRepository } from '../../../../data/protocols/db/survey/load-surveys-repository';
import {
  AddSurveyModel,
  AddSurveyRepository,
} from '../../../../data/usecases/add-survey/add-survey-protocols';
import { SurveyModel } from '../../../../domain/models/survey';
import { LoadSurveysById } from '../../../../domain/usecases/load-survey-by-id';
import { MongoHelper } from '../helpers/mongo-helper';

export class SurveyMongoRepository
  implements AddSurveyRepository, LoadSurveysRepository, LoadSurveysById {
  async add(surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.insertOne(surveyData);
  }

  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const surveys = await surveyCollection.find().toArray();
    return surveys;
  }

  async loadById(id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const survery = await surveyCollection.findOne({ _id: id });
    return survery;
  }
}
