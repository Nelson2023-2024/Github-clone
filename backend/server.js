import { configDotenv } from 'dotenv';
import express from 'express';
import { userRoutes } from './routes/user.route.js';
configDotenv();

const app = express();
const PORT = process.env.PORT;

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on PORT http://localhost:${PORT}`);
});
