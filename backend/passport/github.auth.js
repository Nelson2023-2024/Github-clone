import { configDotenv } from 'dotenv';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/user.model.js';
configDotenv();
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL:
        'https://github-app-7x56.onrender.com//api/auth/github/callback',
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log('Profile: ', profile);
      const user = await User.findOne({ username: profile.username });

      //signup
      if (!user) {
        const newUser = new User({
          name: profile.displayName,
          username: profile.username,
          profileUrl: profile.profileUrl,
          avatarUrl: profile.photos[0].value,
          likedProfiles: [],
          likedBy: [],
        });
        await newUser.save();
        done(null, newUser);
      } //login
      else {
        done(null, user);
      }
    }
  )
);
