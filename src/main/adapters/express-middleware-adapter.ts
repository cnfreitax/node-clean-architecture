//  DESIGN PATERN PROXY
//  CHAMA O REQUEST, O REQUEST PASSA PELO FILTRO
//  SE O USUÁRIO ESTIVER APTO ELE CONTINUA
//  CASO NÃO, ELE INTERROMPE

import { HttpRequest, Middleware } from '../../presentation/protocols';
import { NextFunction, Request, Response } from 'express';

export const adapterMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: req.headers,
    };
    const httpResponse = await middleware.handle(httpRequest);
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body);
      next();
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
};
