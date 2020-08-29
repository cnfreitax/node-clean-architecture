import { Router } from 'express';
import { adaptRoute } from '../adapters/expres-route-adapter';
import { makeSignUpController } from '../factories/signup';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()));
};
