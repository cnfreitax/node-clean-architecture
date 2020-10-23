import { loginPath, signUpPath, surveyPath } from './paths';
import {
  loginParamsSchema,
  errorSchema,
  accountSchema,
  surveySchema,
  surveysSchema,
  surveyAnswerSchema,
  apiKeyAuthSchema,
  signUpParamsSchema,
  addSurveyParamsSchema,
} from './schemas';
import { badRequest, anauthorized, serverError, forbidden } from './components';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Node clean API',
    description: 'API to perform surveys between devs',
    version: '1.0.0',
  },
  servers: [
    {
      url: '/api',
    },
  ],
  tags: [
    {
      name: 'Login',
    },
    {
      name: 'Survey',
    },
  ],
  paths: {
    '/login': loginPath,
    '/signup': signUpPath,
    '/surveys': surveyPath,
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signUpParams: signUpParamsSchema,
    error: errorSchema,
    survey: surveySchema,
    surveys: surveysSchema,
    surveyAnswer: surveyAnswerSchema,
    addSurveyParams: addSurveyParamsSchema,
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema,
    },
    badRequest,
    anauthorized,
    serverError,
    forbidden,
  },
};
