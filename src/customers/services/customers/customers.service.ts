import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../../dtos//CreateCustomer.dto';
import { ICustomer } from '../../types/Customer';
@Injectable()
export class CustomersService {
  private customers: ICustomer[] = [
    {
      id: 1,
      email: 'faridshadmanli@gmail.com',
      name: 'Farid',
    },
    {
      id: 2,
      email: 'feridhelios@gmail.com',
      name: 'Ferid',
    },
    {
      id: 3,
      email: 'movlanmustafayev@gmail.com',
      name: 'Movlan',
    },
  ];
  findCustomerById(id: number): ICustomer | undefined {
    return this.customers.find((user) => user.id === id);
  }
  createCustomer(createCustomerDto: CreateCustomerDto) {
    this.customers.push(createCustomerDto);
  }
  getCustomers(): ICustomer[] {
    return this.customers;
  }
}
