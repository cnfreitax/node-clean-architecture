import {
  LoadSurveyResult,
  LoadSurveyResultRepository,
  SurveryResultModel,
} from './db-load-survey-result-protocols';

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
  ) {}

  async load(surveyId: string): Promise<SurveryResultModel> {
    await this.loadSurveyResultRepository.loadBySurveyId(surveyId);
    return null;
  }
}
