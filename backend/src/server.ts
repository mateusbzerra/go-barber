import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes';
import './database';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

const server = express();

server.use(cors());
server.use(express.json());
server.use('/files', express.static(uploadConfig.directory));
server.use(routes);
server.use(
  (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }
    console.error(err);
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

server.listen(3333, () => {
  console.log('## 🚀 server started on port 3333 ##');
});