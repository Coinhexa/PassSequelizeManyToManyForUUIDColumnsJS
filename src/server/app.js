import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger';

import { adminbroRouter } from './routes/adminbro.route';
import { roleRouter } from './routes/role.route';
import { userRouter } from './routes/user.route';

import {
  errorHandler,
  responseHandler,
  pageNotFoundHandler,
  initResLocalsHandler,
} from './middlewares';

const app = express();

// Swagger
app.use('/swagger', swaggerUi.serveFiles(swaggerDocument), swaggerUi.setup(swaggerDocument));

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(initResLocalsHandler);

app.use('/admin', adminbroRouter);

app.use('/role', roleRouter);

app.use('/user', userRouter);

// Use custom response handler
app.use(responseHandler);

// Use custom error handler
app.use(errorHandler);

// Page not found
app.use(pageNotFoundHandler);

export { app };
