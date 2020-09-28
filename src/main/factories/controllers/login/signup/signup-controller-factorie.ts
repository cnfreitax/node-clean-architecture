import { SignupController } from '../../../../../presentation/controllers/user/signup/signup-controller';
import { Controller } from '../../../../../presentation/protocols';
import { makeSignUpValidation } from './signup-validation-factorie';
import { makeDbAuthentication } from '../../../usecases/account/authentication/db-authentication-factorie';
import { makeAddAccount } from '../../../usecases/account/addAccount/db-add-account-factorie';
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorater-factorie';

export const makeSignUpController = (): Controller => {
  return makeLogControllerDecorator(
    new SignupController(
      makeAddAccount(),
      makeSignUpValidation(),
      makeDbAuthentication(),
    ),
  );
};
