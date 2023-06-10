import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateCustomerAccountMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { valid } = req.headers;
    console.log('ValidateCustomerAccountMiddleware');
    if (valid) {
      next();
    } else {
      res.status(401).json({ error: 'Account is invalid' });
    }
  }
}
