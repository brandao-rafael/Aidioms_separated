import express, { Application, NextFunction, Request, Response } from 'express';
import User from './database/routes/User.routes';
import Class from './database/routes/Class.routes';
import Student from './database/routes/Student.routes';
import Chat from './database/routes/Chat.routes';
import Image from './database/routes/Image.routes';
import PlayPhrase from './database/routes/Playphrase.routes';
import cors from 'cors';
const userRouter = new User();
const classRouter = new Class();
const studentRouter = new Student();
const chatRouter = new Chat();
const imageRouter = new Image();
const playPhrase = new PlayPhrase();


class App {
  public app: Application;
  
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }
  
  private allowCors(_req: Request, res: Response, next: NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x_api_key');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  }
  private config(): void {
    this.app.use(express.json());
    this.app.use((_req: Request, _res: Response, next: NextFunction) => {
      next();
    }, cors({ maxAge: 84600, origin: '*', credentials: true }));
    
  }

  private routes(): void {
    this.app.get('/', (_req, res) => res.json({ ok: true }));
    this.app.use(this.allowCors);
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
