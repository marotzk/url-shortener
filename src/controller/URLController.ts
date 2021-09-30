import { Request, Response } from "express";
import shortid from 'shortid';
const config = { API_URL: "http://localhost:3001" };

export class URLController {
  public async shorten(req: Request, res: Response): Promise<void> {
    const { originURL } = req.body;
    //verifica se a URL já existe
    //gerar hash da URL
    const hash = shortid.generate();
    const shortURL = `${config.API_URL}/${hash}`;
    //salvar URL no banco
    //retornar URL que foi salva
    res.status(201).json({ originURL, hash, shortURL });
  }
  public async redirect(req: Request, res: Response): Promise<void> {
    //pegar hash da url
    const { hash } = req.params;
    //encontrar url original pelo hash
    const db = {
      originURL: "https://cloud.mongodb.com/v2/61542e4aede87248dddcc6e3#clusters/detail/Cluster0/connect?clusterId=Cluster0",
      hash: "P5onTW0eB",
      shortURL: "http://localhost:3001/P5onTW0eB"
    };
    //redirecionar para url original
    res.redirect(db.originURL);
  }
}