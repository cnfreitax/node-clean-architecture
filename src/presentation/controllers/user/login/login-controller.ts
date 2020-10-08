import {
  Authentication,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
  badResquest,
  serverError,
  anauthorized,
  ok,
} from './login-controller-protocols';

export class LoginController implements Controller {
  constructor(
    private readonly authentication: Authentication,
    private readonly validation: Validation,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badResquest(error);
      }
      const { email, password } = httpRequest.body;

      const accessToken = await this.authentication.auth({ email, password });
      if (!accessToken) {
        return anauthorized();
      }
      return ok({ accessToken });
    } catch (err) {
      return serverError(err);
    }
  }
}
