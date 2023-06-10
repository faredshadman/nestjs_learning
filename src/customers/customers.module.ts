import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CustomersController } from './controllers/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';
import { ValidateCustomerMiddleware } from './middlewares/validate-customer.middleware';
import { ValidateCustomerAccountMiddleware } from './middlewares/validate-customer-account.middleware';
import { NextFunction } from 'express';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        ValidateCustomerMiddleware,
        ValidateCustomerAccountMiddleware,
        (req: Request, res: Response, next: NextFunction) => {
          console.log('lastMiddleware');
          next();
        },
      )
      .exclude(
        {
          path: 'customers/create',
          method: RequestMethod.POST,
        },
        {
          path: 'customers',
          method: RequestMethod.GET,
        },
      )
      .forRoutes(CustomersController);
  }
}

// {
//   path: 'customers/search/:id',
//   method: RequestMethod.GET,
// },
// {
//   path: 'customers/:id',
//   method: RequestMethod.GET,
// },
