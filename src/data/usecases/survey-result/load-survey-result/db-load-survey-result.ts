import { LoadSurveyResultRepository } from '../../../protocols/db/survey-result/load-survey-result-repository';
import { SurveryResultModel } from '../save-survey-result/db-save-survey-result-protocols';
import { LoadSurveyResult } from './db-load-survey-result-protocols';

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
  ) {}

  async load(surveyId: string): Promise<SurveryResultModel> {
    await this.loadSurveyResultRepository.loadBySurveyId(surveyId);
    return null;
  }
}
