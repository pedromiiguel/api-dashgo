import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';
import { router } from './routes';
import { AppError } from './errors';

const app = express();
app.use(morgan())
app.use(cors());
app.use(express.json());
app.use(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if(error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error ${error.message}`,
    })
  }
);

app.listen('3131', () => {
  console.log('Serve is running on port 3131');
});
