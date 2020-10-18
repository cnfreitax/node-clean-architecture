import { loginPath } from './paths';
import { loginParamsSchema, errorSchema, accountSchema } from './schemas';
import { badRequest, anauthorized, serverError } from './components';

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
  ],
  paths: {
    '/login': loginPath,
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema,
  },
  components: {
    badRequest: badRequest,
    anauthorized: anauthorized,
    serverError: serverError,
  },
};
