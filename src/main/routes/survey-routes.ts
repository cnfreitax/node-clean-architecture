import { Router } from 'express';
import { adapterRouter } from '../adapters/expres-route-adapter';
import { adapterMiddleware } from '../adapters/express-middleware-adapter';
import { maekAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory';
import { makeLoadSurveysController } from '../factories/controllers/survey/load-surveys/load-survey-controller-factory';
import { maekAuthMiddleware } from '../factories/middleware/auth-middleware-factory';

export default (router: Router): void => {
  const adminAuth = adapterMiddleware(maekAuthMiddleware('admin'));
  const auth = adapterMiddleware(maekAuthMiddleware());
  router.post('/surveys', adminAuth, adapterRouter(maekAddSurveyController()));
  router.get('/surveys', auth, adapterRouter(makeLoadSurveysController()));
};
