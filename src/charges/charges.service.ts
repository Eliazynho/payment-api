/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChargeDto } from './dto/create-charge.dto';
import { PaymentMethod } from '@prisma/client';

@Injectable()
export class ChargesService {
  constructor(private prisma: PrismaService) {}

  async create(createChargeDto: CreateChargeDto) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id: createChargeDto.customerId,
      },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found.');
    }

    if (
      createChargeDto.paymentMethod === PaymentMethod.BOLETO &&
      !createChargeDto.boletoDueDate
    ) {
      throw new BadRequestException('Boleto due date is required.');
    }

    if (
      createChargeDto.paymentMethod === PaymentMethod.CREDIT_CARD &&
      !createChargeDto.creditCardInstallments
    ) {
      throw new BadRequestException('Credit card installments is required.');
    }

    return this.prisma.charge.create({
      data: {
        amount: createChargeDto.amount,
        paymentMethod: createChargeDto.paymentMethod,
        customerId: createChargeDto.customerId,
        boletoDueDate: createChargeDto.boletoDueDate
          ? new Date(createChargeDto.boletoDueDate)
          : null,
        creditCardInstallments: createChargeDto.creditCardInstallments,
      },
    });
  }

  findAll() {
    return this.prisma.charge.findMany();
  }

  async findOne(id: string) {
    const charge = await this.prisma.charge.findUnique({ where: { id } });
    if (!charge) {
      throw new NotFoundException(`Charge with ID "${id}" not found.`);
    }
    return charge;
  }
}
