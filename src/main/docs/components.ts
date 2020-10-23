import { apiKeyAuthSchema } from './schemas/';
import {
  badRequest,
  anauthorized,
  serverError,
  forbidden,
} from './components/';

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema,
  },
  badRequest,
  anauthorized,
  serverError,
  forbidden,
};
