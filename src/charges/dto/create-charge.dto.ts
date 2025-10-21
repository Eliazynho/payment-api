/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
  @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;

  @IsOptional()
  @IsDateString()
  boletoDueDate?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  creditCardInstallments?: number;
}
