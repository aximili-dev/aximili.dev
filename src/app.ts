import path from 'path';

import { json } from 'body-parser';
import cors from 'cors';
import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { HttpError, NotFound } from 'http-errors';
import morgan from 'morgan';
import { http } from 'winston';

import indexRouter from './routes/root';
import { createLogger } from './util/logger';

const app = express();

const httpLogger = createLogger('http', 'dev');

if (process.env.NODE_ENV === 'prod')
  app.use(morgan('combined', { stream: { write: (str) => httpLogger.info(str.trim()) } }));
else
  app.use(morgan('dev', { stream: { write: (str) => httpLogger.info(str.trim()) } }));

// Set up middlewares
app.use(json());
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'static')));

// Set up template engine
app.set('view engine', 'pug');

// Set up routes
app.use(indexRouter);

// 404 Handler
app.use((req, res, next) => {
  next(new NotFound());
});

// Error handler
const errorHandler: ErrorRequestHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  let errorCode: number;
  let errorMessage: string;

  if (error instanceof HttpError) {
    errorCode = error.status;
    errorMessage = error.message;
  } else {
    errorCode = 500;
    errorMessage = error.message;
  }

  if (res.headersSent)
    next(error);
  else
    res.render('pages/error', { errorCode, errorMessage });
};

app.use(errorHandler);

export default app;
