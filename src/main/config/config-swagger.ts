import { Express } from 'express';
import swaggerConfig from '../docs';
import { setup, serve } from 'swagger-ui-express';

export default (app: Express): void => {
  app.use('/api-docs', serve, setup(swaggerConfig));
};
