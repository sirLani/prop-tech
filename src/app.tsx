import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); // load config vars from .env to process.env
import cors from 'cors';
import { env } from './config/config';

import routes from './routes/routes';

const app = express();

//db

mongoose
   .connect(env.DATABASE, {})
   .then(() => console.log('DB CONNECTED'))
   .catch((err) => console.log('DB CONNECTION ERROR', err));

// middlewares
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//load routes
app.use('/api/v1', routes);

//404
app.all('*', (req, res) => {
   return res.status(404).json({ message: '#NOT_FOUND 😒😒😒' });
});

export default app;
