import { SaveSurveyResultRepository } from '../../../../data/protocols/db/survey-result/save-surveys-result-repository';
import { SaveSurveyResultData } from '../../../../domain/usecases/survey-result/save-survey-result';
import { SurveryResultModel } from '../../../../domain/usecases/survey-result/surveys-result';
import { MongoHelper } from '../helpers/mongo-helper';

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save(surveyData: SaveSurveyResultData): Promise<SurveryResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection(
      'surveyResults',
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
