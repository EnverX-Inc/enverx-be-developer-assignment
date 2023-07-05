import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authenticationRouter from './routes/authenticationRoutes';
import { postRouter } from './routes/blogPostsRoute';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 65535;
const MONGO_DB_URL = process.env.MONGO_DB_URL;


app.use(cors());

app.use(express.json());

app.use('/auth', authenticationRouter);
app.use('/blog', postRouter);

// app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
//   console.error('Internal server error:', err);
//   res.status(500).json({ error: 'Internal server error' });
// });


if (MONGO_DB_URL) {
  mongoose
    .connect(MONGO_DB_URL)
    .then(() => {
      console.log('MongoDB Connection Successful');
      app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
      });
    })
    .catch((error: Error) => {
      console.error('MongoDB Connection Failed:', error);
    });
} else {
  console.error('MONGO_DB_URL is not defined');
}
