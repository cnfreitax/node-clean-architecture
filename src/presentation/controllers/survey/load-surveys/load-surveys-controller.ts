import { noContent } from '../../../helpers/http/http-helpers';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveys,
  ok,
  serverError,
} from './load-surveys-controller-protocols';

export class LoadSurveysController implements Controller {
  constructor(private readonly loadSurveys: LoadSurveys) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { accountId } = httpRequest;
      const surveys = await this.loadSurveys.load(accountId);
      return surveys.length ? ok(surveys) : noContent();
    } catch (err) {
      return serverError(err);
    }
  }
}
