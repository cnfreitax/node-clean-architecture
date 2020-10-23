import paths from './paths';
import schemas from './schemas';
import components from './components';

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
  paths,
  schemas,
  components,
};
