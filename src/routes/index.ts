import { Router } from 'express';

const router = Router();

router.get(/^\/$/, (req, res) => {
  res.render('pages/index', { currentPage: 'index' });
});

router.get(/^\/about$/, (req, res) => {
  res.render('pages/wip', { currentPage: 'about' });
});

router.get(/^\/contact$/, (req, res) => {
  res.render('pages/contact', { currentPage: 'contact' });
});

export default router;
