import { Router } from 'express';
import { adapterRouter } from '../adapters/expres-route-adapter';
import { maekAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory';
import { makeLoadSurveysController } from '../factories/controllers/survey/load-surveys/load-survey-controller-factory';
import { auth } from '../middlewares/auth';
import { adminAuth } from '../middlewares/auth-admin';

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adapterRouter(maekAddSurveyController()));
  router.get('/surveys', auth, adapterRouter(makeLoadSurveysController()));
};
