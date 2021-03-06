import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveyById,
  forbidden,
  InvalidParamError,
  serverError,
  SaveSurveyResult,
  ok,
} from './save-survey-result-controller-protocols';

export class SaveSurveyResultController implements Controller {
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
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

      const account = await this.saveSurveyResult.save({
        accountId,
        surveyId,
        answer,
        date: new Date(),
      });
      return ok(account);
    } catch (err) {
      return serverError(err);
    }
  }
}
