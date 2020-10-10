import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveysById,
  forbidden,
  InvalidParamError,
  serverError,
  SaveSurveyResult,
} from './save-survey-result-controller-protocols';

export class SaveSurveyResultController implements Controller {
  constructor(
    private readonly loadSurveyById: LoadSurveysById,
    private readonly saveSurveyResult: SaveSurveyResult,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { answer } = httpRequest.body;
      const { surveyId } = httpRequest.params;
      const { accountId } = httpRequest;
      const survey = await this.loadSurveyById.loadById(
        httpRequest.params.surveyId,
      );
      if (survey) {
        const answers = survey.answers.map(a => a.answer);
        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'));
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'));
      }

      await this.saveSurveyResult.save({
        accountId,
        surveyId,
        answer,
        date: new Date(),
      });
      return null;
    } catch (err) {
      return serverError(err);
    }
  }
}
