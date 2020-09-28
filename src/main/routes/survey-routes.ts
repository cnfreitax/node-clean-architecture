import { Router } from 'express';
import { adapterRouter } from '../adapters/expres-route-adapter';
import { maekAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory';

export default (router: Router): void => {
  router.post('/surveys', adapterRouter(maekAddSurveyController()));
};
