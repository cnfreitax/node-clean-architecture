import { Express } from 'express';
import { noCache } from '../middlewares/no-cache';
import swaggerConfig from '../docs';
import { setup, serve } from 'swagger-ui-express';

export default (app: Express): void => {
  app.use('/api-docs', noCache, serve, setup(swaggerConfig));
};
