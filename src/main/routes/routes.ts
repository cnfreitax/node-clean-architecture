import { Router } from 'express';
import { adapterRouter } from '../adapters/express/expres-route-adapter';
import { makeLoginController } from '../factories/login/login-factorie';
import { makeSignUpController } from '../factories/signup/signup-factorie';

export default (router: Router): void => {
  router.post('/signup', adapterRouter(makeSignUpController()));
  router.post('/login', adapterRouter(makeLoginController()));
};
