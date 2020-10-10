import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveysById,
  forbidden,
  InvalidParamError,
  serverError,
} from './save-survey-result-controller-protocols';

export class SaveSurveyResultController implements Controller {
  constructor(private readonly loadSurveyById: LoadSurveysById) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { answer } = httpRequest.body;
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
      return null;
    } catch (err) {
      return serverError(err);
    }
  }
}
