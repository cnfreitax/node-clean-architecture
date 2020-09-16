import { SignupController } from '../../../presentation/controllers/signup/signup-controller';
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account';
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter';
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository';
import { Controller } from '../../../presentation/protocols';
import { LogControllerDecorator } from '../../Decorators/log-controller-decorator';
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-repository';
import { makeSignUpValidation } from './signup-validation-factorie';

export const makeSignUpController = (): Controller => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const logMongoRepository = new LogMongoRepository();
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
  const signUpController = new SignupController(
    dbAddAccount,
    makeSignUpValidation(),
  );
  return new LogControllerDecorator(signUpController, logMongoRepository);
};
