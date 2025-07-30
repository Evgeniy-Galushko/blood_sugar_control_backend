import express from 'express';
import { getEnvVar } from './utils/getEnvVars.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pino from 'pino-http';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = Number(getEnvVar('PORT'));

export const setupServer = () => {
  const app = express();

  app.use(express.json({ type: 'application/json' }));
  app.use(cors());
  app.use(cookieParser());
  app.use(pino({ transport: { target: 'pino-pretty' } }));

  app.use('/api', router);

  // app.use('/api-docs');

  app.use('*splat', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
