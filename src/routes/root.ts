import { Router } from 'express';

import blogRouter from './blog';

import indexRouter from './index';

const router = Router();

router.use('/', indexRouter);
router.use('/blog', blogRouter);

export default router;
