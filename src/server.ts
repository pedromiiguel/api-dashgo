import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(router);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  return response.json({ 
    status: "Error",
    message: error.message
  })
});

app.listen('3000', () => {
  console.log('Serve is running on port 3000');
});
