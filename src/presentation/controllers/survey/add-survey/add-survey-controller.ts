import { AddSurvey } from '../../../../domain/usecases/add-survey';
import { badResquest } from '../../../helpers/http/http-helpers';
import { Validation } from '../../../protocols';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from './add-survey-controller-protocols';

export class AddSurveyController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body);
    if (error) {
      return badResquest(error);
    }

    const { question, answer } = httpRequest.body;
    await this.addSurvey.add({ question, answer });
    return new Promise(resolve => resolve(null));
  }
}
