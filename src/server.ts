import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import db from './../database/database.config';
import todoRouters from './todoRoutes';

dotenv.config();

db.sync().then(() => {
  console.log('connect to db');
});

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use('/api/v1/', todoRouters);

app.listen(port, () => {
  console.log(`Server is fired at http://localhost:${port}`);
});
