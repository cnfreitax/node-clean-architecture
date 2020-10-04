import {
  SaveSurveyResult,
  SaveSurveyResultData,
  SurveryResultModel,
  SaveSurveyResultRepository,
} from './db-save-survey-result-protocols';

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSuveryResultRepository: SaveSurveyResultRepository,
  ) {}

  async save(surveyData: SaveSurveyResultData): Promise<SurveryResultModel> {
    await this.saveSuveryResultRepository.save(surveyData);
    return new Promise(resolve => resolve());
  }
}
