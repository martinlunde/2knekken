import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import proxy from 'express-http-proxy';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use('/xkcd', proxy('https://xkcd.com'));
// app.use('/lunsj', proxy('http://api.e24.no'))
// http://api.e24.no/content/v1/comics/2022-10-10
app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.get('/lunsj/*', (req: Request, res: Response) => {
    console.log(req.path);
    const date_or_number = req.path.split('/')[2];
    console.log(date_or_number);
    let date_str = date_or_number;
    if (date_str.match(/^\d+$/)) {
        const no = parseInt(date_or_number);
        const days_since_epoch = 19275 - 2680 + no;
        const d = new Date(days_since_epoch * 8.64e7);
        date_str = d.toISOString().split('T')[0]
    }
    const date_parts = date_str.split('-');
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ "date": date_str, "month": date_parts[1], "num": 1500, "link": "", "year": date_parts[0], "news": "", "safe_title": "", "transcript": "", "img": `http://api.e24.no/content/v1/comics/${date_str}`, "title": `Lunsj for ${date_str}`, "day": date_parts[2] }));
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});