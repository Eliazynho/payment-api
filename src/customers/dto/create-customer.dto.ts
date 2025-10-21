import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Nome completo do cliente',
    example: 'João da Silva',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Endereço de e-mail único do cliente',
    example: 'joao.silva@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'CPF ou CNPJ único do cliente',
    example: '12345678901',
  })
  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  document: string;

  @ApiProperty({
    description: 'Número de telefone do cliente',
    example: '11999999999',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  phone: string;
}
