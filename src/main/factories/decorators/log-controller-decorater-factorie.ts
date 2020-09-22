import { LogControllerDecorator } from '../../Decorators/log-controller-decorator';
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-repository';
import { Controller } from '../../../presentation/protocols';

export const makeLogControllerDecorator = (
  controller: Controller,
): Controller => {
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(controller, logMongoRepository);
};
