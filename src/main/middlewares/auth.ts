import { adapterMiddleware } from '../adapters/express-middleware-adapter';
import { maekAuthMiddleware } from '../factories/middleware/auth-middleware-factory';

export const auth = adapterMiddleware(maekAuthMiddleware());
