import { Router } from 'express';
import { adapterRouter } from '../adapters/express/expres-route-adapter';
import { maekAddSurveyController } from '../factories/controllers/survey/add-survey-controller-factory';

export default (router: Router): void => {
  router.post('/surveys', adapterRouter(maekAddSurveyController()));
};
