import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveysById,
  forbidden,
  InvalidParamError,
} from './save-survey-result-controller-protocols';

export class SaveSurveyResultController implements Controller {
  constructor(private readonly loadSurveyById: LoadSurveysById) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const survey = await this.loadSurveyById.loadById(
      httpRequest.params.surveyId,
    );
    if (!survey) {
      return forbidden(new InvalidParamError('surveyId'));
    }
    return null;
  }
}
