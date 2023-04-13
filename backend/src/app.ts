import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import User from './database/routes/User.routes';
import Class from './database/routes/Class.routes';
import Student from './database/routes/Student.routes';
import Chat from './database/routes/Chat.routes';
import Image from './database/routes/Image.routes';
import PlayPhrase from './database/routes/Playphrase.routes';

const userRouter = new User();
const classRouter = new Class();
const studentRouter = new Student();
const chatRouter = new Chat();
const imageRouter = new Image();
const playPhrase = new PlayPhrase();

const corsOptions = {
  origin: 'https://aidioms-production.up.railway.app',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  credentials: true
};

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.get('/', (_req, res) => res.json({ ok: true })); 
    this.app.use('/user', cors(corsOptions), userRouter.router);
    this.app.use('/class', cors(corsOptions), classRouter.router);
    this.app.use('/student', cors(corsOptions), studentRouter.router);
    this.app.use('/chat', cors(corsOptions), chatRouter.router);
    this.app.use('/image', cors(corsOptions), imageRouter.router);
    this.app.use('/playphrase', cors(corsOptions), playPhrase.router);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();