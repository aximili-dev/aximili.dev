import { Router } from 'express';

const router = Router();

router.get(/^\/$/, (req, res) => {
  res.render('pages/wip', { currentPage: 'blog' });
});

export default router;
