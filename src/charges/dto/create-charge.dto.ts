/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateChargeDto {
  @ApiProperty({
    description: 'ID unico do cliente ao qual a cobranca pertence',
    example: '3c2f3f3f-3f3f-3f3f-3f3f-3f3f3f3f3f3f',
  })
  @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @ApiProperty({
    description: 'Valor da cobranca em centavos',
    example: 10000, // 100 reais
  })
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiProperty({
    description: 'Metodo de pagamento da cobranca',
    enum: PaymentMethod,
    example: PaymentMethod.BOLETO,
  })
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;

  @ApiProperty({
    description:
      'Data de vencimento do boleto(obrigatorio se paymentMethod for BOLETO)',
    example: '2025-12-31T23:59:59.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  boletoDueDate?: string;

  @ApiProperty({
    description:
      'Quantidade de parcelas do cartao de credito(obrigatorio se paymentMethod for CREDIT_CARD)',
    example: 3,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  creditCardInstallments?: number;
}
