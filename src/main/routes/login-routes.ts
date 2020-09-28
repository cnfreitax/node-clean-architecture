import { Router } from 'express';
import { adapterRouter } from '../adapters/expres-route-adapter';
import { makeLoginController } from '../factories/controllers/login/login/login-controller-factorie';
import { makeSignUpController } from '../factories/controllers/login/signup/signup-controller-factorie';

export default (router: Router): void => {
  router.post('/signup', adapterRouter(makeSignUpController()));
  router.post('/login', adapterRouter(makeLoginController()));
};
