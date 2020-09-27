import { Router } from 'express';
import { adapterRouter } from '../adapters/express/expres-route-adapter';
import { makeLoginController } from '../factories/controllers/login/login-controller-factorie';
import { makeSignUpController } from '../factories/controllers/signup/signup-controller-factorie';

export default (router: Router): void => {
  router.post('/signup', adapterRouter(makeSignUpController()));
  router.post('/login', adapterRouter(makeLoginController()));
};
