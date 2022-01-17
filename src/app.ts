import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';

import indexRouter from './routes/index';

const app = express();

// Set up middlewares
app.use(json());
app.use(cors());

// Set up template engine
app.set('view engine', 'pug');

// Set up routes
app.use(indexRouter);

export default app;
