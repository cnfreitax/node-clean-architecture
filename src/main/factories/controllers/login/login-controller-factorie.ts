import { LoginController } from '../../../../presentation/controllers/user/login/login-controller';
import { Controller } from '../../../../presentation/protocols';
import { makeLoginValidation } from './login-validation-factorie-factorie';
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factorie';
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorater-factorie';

export const makeLoginController = (): Controller => {
  return makeLogControllerDecorator(
    new LoginController(makeDbAuthentication(), makeLoginValidation()),
  );
};
