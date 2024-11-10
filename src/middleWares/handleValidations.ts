import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

class Middleware {
  handleValidation(req: Request, res: Response, next: NextFunction) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.json(error.array()[0]);
      return;
    } else {
      next();
    }
  }
}

export default new Middleware();
