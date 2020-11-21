import {
  SaveSurveyResult,
  SaveSurveyResultParams,
  SurveryResultModel,
  SaveSurveyResultRepository,
  LoadSurveyResultRepository,
} from './db-save-survey-result-protocols';

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSuveryResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
  ) {}

  async save(surveyData: SaveSurveyResultParams): Promise<SurveryResultModel> {
    await this.saveSuveryResultRepository.save(surveyData);
    const surveryResult = await this.loadSurveyResultRepository.loadBySurveyId(
      surveyData.surveyId,
      surveyData.accountId,
    );
    return surveryResult;
  }
}
