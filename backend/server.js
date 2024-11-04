import { configDotenv } from 'dotenv';
import express from 'express';
import cors from 'cors';
import { userRoutes } from './routes/user.route.js';
import { exploreRoutes } from './routes/explore.route.js';
import { connectMongoDB } from './db/connectToMongoDB.js';
import { authRoutes } from './routes/auth.routes.js';
configDotenv();

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/explore', exploreRoutes);

app.listen(PORT, () => {
  console.log(`Server running on PORT http://localhost:${PORT}`);
  connectMongoDB();
});
