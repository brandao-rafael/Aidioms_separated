import { App } from './app';
import 'dotenv/config';

const PORT = Number(process.env.PORT);
const HOST = process.env.HOST;

new App().start(PORT as number, HOST as string);
