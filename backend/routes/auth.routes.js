import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  function (req, res) {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  }
);
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: process.env.CLIENT_BASE_URL + '/login',
  }),
  function (req, res) {
    res.redirect(process.env.CLIENT_BASE_URL);
  }
);
router.get('/check-auth-user', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.send({ user: req.user });
  } else {
    res.send({ user: null });
  }
});

router.get('/logout', (req, res) => {
  res.session().destroy((err) => res.json({ message: 'Loged out' }));
});

export { router as authRoutes };
