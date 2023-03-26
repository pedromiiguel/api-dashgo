import express, { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv'
dotenv.config()
import cors from 'cors';
import 'express-async-errors';
import { routes } from './routes';
import { AppError } from './errors';

const app = express();
const PORT = process.env.PORT || 3333

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error ${error.message}`,
    });
  }
);

app.listen(PORT, () => {
  console.log(`Serve is running on port ${PORT}`);
});
