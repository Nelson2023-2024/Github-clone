import { configDotenv } from 'dotenv';
import express from 'express';
import passport from 'passport';
import path from 'path';

import session from 'express-session';
import cors from 'cors';

import './passport/github.auth.js';
import { userRoutes } from './routes/user.route.js';
import { exploreRoutes } from './routes/explore.route.js';
import { connectMongoDB } from './db/connectToMongoDB.js';
import { authRoutes } from './routes/auth.routes.js';
configDotenv();

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();
console.log(__dirname);
app.use(cors());

app.use(
  session({ secret: 'keyboard cat', resave: false, saveUninitialized: false })
);
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/explore', exploreRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist'))); //our static assets

//our react application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on PORT http://localhost:${PORT}`);
  connectMongoDB();
});
