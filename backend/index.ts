import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import proxy from 'express-http-proxy';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use('/xkcd', proxy('https://xkcd.com'));
app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});