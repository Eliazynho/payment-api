import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 14) //cpf ou cnpj
  document: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
