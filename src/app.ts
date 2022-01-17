import { json } from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { HttpError, NotFound } from 'http-errors';

import indexRouter from './routes/root';

const app = express();

// Set up middlewares
app.use(json());
app.use(cors());
app.use(express.static('../static'));

// Set up template engine
app.set('view engine', 'pug');

// Set up routes
app.use(indexRouter);

// 404 Handler
app.use((req, res, next) => {
  next(new NotFound());
});

// Error handler
app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
  let errorCode: number;
  let errorMessage: string;

  if (error instanceof HttpError) {
    errorCode = error.status;
    errorMessage = error.message;
  } else {
    errorCode = 500;
    errorMessage = error.message;
  }

  res.render('pages/error', { errorCode, errorMessage });
});

export default app;
