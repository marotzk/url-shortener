import express, { Request, Response } from 'express';
import { URLController } from './controller/URLController';


const api = express();

api.use(express.json());


api.get('/status', (req: Request, res: Response) => {
  res.json({ success: true });
});

const urlController = new URLController();
api.post('/shorten', urlController.shorten);
api.get('/:hash', urlController.redirect);

api.listen(3001, () => {
  console.log(`
    listening http://localhost:3001
  `)
});