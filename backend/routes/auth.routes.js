import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  function (req, res) {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  }
);
router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: process.env.CLIENT_BASE_URL + '/login',
  }),
  function (req, res) {
    res.redirect(CLIENT_BASE_URL);
  }
);

export { router as authRoutes };
