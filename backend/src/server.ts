import { App } from './app';
import 'dotenv/config';

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || '127.0.0.1';

new App().start(PORT as number, HOST as string);
