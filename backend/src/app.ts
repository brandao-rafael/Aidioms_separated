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

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  // private config(): void {
  //   const corsOptions = {
  //     origin: "https://aidioms-production.up.railway.app",
  //     methods: 'GET,POST,DELETE,OPTIONS,PUT,PATCH',
  //     allowedHeaders: 'Content-Type,Authorization,X-Requested-With,x_api_key',
  //     credentials: true,
  //   };
  
  //   this.app.options('*', cors(corsOptions)); // Handle preflight requests
  //   this.app.use(cors(corsOptions));
  
  //   this.app.use((_req: Request, res: Response, next: NextFunction) => {
  //     res.setHeader('Access-Control-Allow-Origin', "https://aidioms-production.up.railway.app");
  //     res.setHeader('Access-Control-Allow-Credentials', 'true');
  //     next();
  //   });
  
  //   this.app.use(express.json());
  // }

  // dev testing
    private config(): void {
    const corsOptions = {
      origin: "https://aidiomsseparated-production.up.railway.app/",
      methods: 'GET,POST,DELETE,OPTIONS,PUT,PATCH',
      allowedHeaders: 'Content-Type,Authorization,X-Requested-With,x_api_key',
      credentials: true,
    };
  
    this.app.options('*', cors(corsOptions)); // Handle preflight requests
    this.app.use(cors(corsOptions));
  
    this.app.use((_req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Access-Control-Allow-Origin', "https://aidiomsseparated-production.up.railway.app/");
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      next();
    });
  
    this.app.use(express.json());
  }


  // private config(): void {
  //   const corsOptions = {
  //     origin: "http://localhost:3000",
  //     methods: 'GET,POST,DELETE,OPTIONS,PUT,PATCH',
  //     allowedHeaders: 'Content-Type,Authorization,X-Requested-With,x_api_key',
  //     credentials: true,
  //   };
  
  //   this.app.options('*', cors(corsOptions)); // Handle preflight requests
  //   this.app.use(cors(corsOptions));
  
  //   this.app.use((_req: Request, res: Response, next: NextFunction) => {
  //     res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
  //     res.setHeader('Access-Control-Allow-Credentials', 'true');
  //     next();
  //   });
  
  //   this.app.use(express.json());
  // } 

  private routes(): void {
    this.app.get('/', (_req, res) => res.json({ ok: true }));
    this.app.use('/user', userRouter.router);
    this.app.use('/class', classRouter.router);
    this.app.use('/student', studentRouter.router);
    this.app.use('/chat', chatRouter.router);
    this.app.use('/image', imageRouter.router);
    this.app.use('/playphrase', playPhrase.router);
  }

  public start(PORT: number, HOST: string): void {
    this.app.listen(PORT, HOST, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
