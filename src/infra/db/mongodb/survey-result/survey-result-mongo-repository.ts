import { SaveSurveyResultRepository } from '../../../../data/protocols/db/survey/save-surveys-result';
import { SurveryResultModel } from '../../../../domain/models/surveys-result';
import { SaveSurveyResultData } from '../../../../domain/usecases/save-survey-result';
import { MongoHelper } from '../helpers/mongo-helper';

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save(surveyData: SaveSurveyResultData): Promise<SurveryResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection(
      'surveyResult',
    );
    const res = await surveyResultCollection.findOneAndUpdate(
      {
        surveyId: surveyData.surveyId,
        accountId: surveyData.accountId,
      },
      {
        $set: {
          answer: surveyData.answer,
          date: surveyData.date,
        },
      },
      {
        upsert: true,
        returnOriginal: false,
      },
    );
    return res.value && MongoHelper.map(res.value);
  }
}
