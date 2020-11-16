import express from 'express';
import setupSwagger from './config-swagger';
import setupMiddlewares from './middlewares';
import setupRoutes from './routes';
import setupStaticFiles from './static-files';

const app = express();
setupSwagger(app);
setupStaticFiles(app);
setupMiddlewares(app);
setupRoutes(app);

export default app;
