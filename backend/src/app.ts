import express, { Application, NextFunction, Request, Response } from 'express';
// import cors from 'cors';
import User from './database/routes/User.routes';
import Class from './database/routes/Class.routes';
import Student from './database/routes/Student.routes';
import Chat from './database/routes/Chat.routes';
import Image from './database/routes/Image.routes';
import PlayPhrase from './database/routes/Playphrase.routes';
const cors = require('cors');

const userRouter = new User();
const classRouter = new Class();
const studentRouter = new Student();
const chatRouter = new Chat();
const imageRouter = new Image();
const playPhrase = new PlayPhrase();


// const corsOptions = {
//   origin: 'https://aidioms-production.up.railway.app',
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
//   credentials: true,
//   preflightContinue: false,
//   optionsSuccessStatus: 204
// };

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  // private config(): void {
  //   this.app.use(express.json());
  //   this.app.use(cors(corsOptions));
  // }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      console.log('accessControl');
      res.header('Access-Control-Allow-Origin', 'https://aidioms-production.up.railway.app/');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      app.use(cors());
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.get('/', (_req, res) => res.json({ ok: true }));
    this.app.use('/user', userRouter.router);
    this.app.use('/class', classRouter.router);
    this.app.use('/student', studentRouter.router);
    this.app.use('/chat', chatRouter.router);
    this.app.use('/image', imageRouter.router);
    this.app.use('/playphrase', playPhrase.router);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
