import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumberString,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from './CreateAddress.dto';
import { Type } from 'class-transformer';

export class CreateCustomerDto {
  @IsNumberString()
  @IsNotEmpty()
  id: number;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  @IsNotEmpty()
  address: CreateAddressDto;
}
