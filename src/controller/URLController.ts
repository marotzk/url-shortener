import { Request, Response } from "express";
import shortid from 'shortid';
import { URLModel } from "../database/model/URL";
require('dotenv/config')


export class URLController {
  public async shorten(req: Request, res: Response): Promise<void> {
    const { originURL } = req.body;

    //verifica se a URL já existe
    const url = await URLModel.findOne({ originURL });
    if (url) {
      res.json(url);
      return;
    }

    //gerar hash da URL
    const hash = shortid.generate();
    const shortURL = `${process.env.API_URL}/${hash}`;

    //salvar URL no banco
    const newURL = await URLModel.create({ hash, shortURL, originURL });
    
    //retornar URL que foi salva
    res.status(201).json(newURL);
  }
  public async redirect(req: Request, res: Response): Promise<void> {
    //pegar hash da url
    const { hash } = req.params;
    
    //encontrar url original pelo hash
    const url = await URLModel.findOne({hash})

    //redirecionar para url original
    if(url){
      res.redirect(url.originURL);
      return;
    }
    res.status(400).send({error: 'URL not found!'})
  }
}