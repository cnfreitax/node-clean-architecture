import { SurveyMongoRepository } from '../../../../infra/db/mongodb/survey/survey-mongo-repository';
import { DbAddSurvey } from '../../../../data/usecases/survey/add-survey/db-add-Survery';
import { AddSurvey } from '../../../../domain/usecases/survey/add-survey';

export const makeAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbAddSurvey(surveyMongoRepository);
};
