import { Router } from 'express';
import { adapterRouter } from '../adapters/expres-route-adapter';
import { makeSaveSurveyResultController } from '../factories/controllers/survey-result/save-survey-result/load-survey-result-controller-factory';
import { auth } from '../middlewares/auth';

export default (router: Router): void => {
  router.put(
    '/surveys/:surveyId/results',
    auth,
    adapterRouter(makeSaveSurveyResultController()),
  );
};
