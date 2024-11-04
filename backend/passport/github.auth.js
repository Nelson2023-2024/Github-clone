import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:5001/api/auth/github/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
    }
  )
);
