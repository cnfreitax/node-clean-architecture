import { Router } from 'express';
import { adapterRouter } from '../adapters/express/expres-route-adapter';
import { makeSignUpController } from '../factories/signup/signup-factorie';

export default (router: Router): void => {
  router.post('/signup', adapterRouter(makeSignUpController()));
};
