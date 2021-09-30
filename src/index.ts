import express, { Request, Response } from 'express';

const api = express();

api.get('/status', (req: Request, res: Response) => {
  res.json({success: true});
})

api.listen(3001, () => {
  console.log(`
    listening http://localhost:3001
  `)
})