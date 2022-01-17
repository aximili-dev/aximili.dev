import { Router } from 'express';

import blogRouter from './blog';
import projectRouter from './projects';

import indexRouter from './index';


const router = Router();

router.use('/', indexRouter);
router.use('/blog', blogRouter);
router.use('/projects', projectRouter);

export default router;
