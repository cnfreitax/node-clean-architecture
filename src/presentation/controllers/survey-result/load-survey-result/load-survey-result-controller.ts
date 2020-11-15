import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveyById,
  forbidden,
  InvalidParamError,
  serverError,
} from './load-survey-result-controller-protocols';

export class LoadSurveyResultController implements Controller {
  constructor(private readonly loadSurveyById: LoadSurveyById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params;
      const survey = await this.loadSurveyById.loadById(surveyId);
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'));
      }
      return Promise.resolve(null);
    } catch (err) {
      return serverError(err);
    }
  }
}
