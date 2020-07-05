import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import '@shared/infra/typeorm';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate';
import routes from './routes';
import '@shared/container';
import rateLimiter from './middlewares/rateLimiter';

const server = express();
server.use(rateLimiter);
server.use(cors());
server.use(express.json());
server.use('/files', express.static(uploadConfig.uploadsFolder));
server.use(routes);
server.use(errors());
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
