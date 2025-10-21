import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChargeDto } from './dto/create-charge.dto';
import { PaymentMethod } from '@prisma/client';

@Injectable()
export class ChargesService {
  private readonly logger = new Logger(ChargesService.name);
  constructor(private prisma: PrismaService) {}

  async create(createChargeDto: CreateChargeDto) {
    this.logger.debug('Creating charge...');
    const customer = await this.prisma.customer.findUnique({
      where: {
        id: createChargeDto.customerId,
      },
    });

    if (!customer) {
      this.logger.error('Customer not found.');
      throw new NotFoundException('Customer not found.');
    }

    if (
      createChargeDto.paymentMethod === PaymentMethod.BOLETO &&
      !createChargeDto.boletoDueDate
    ) {
      this.logger.error('Boleto due date is required.');
      throw new BadRequestException('Boleto due date is required.');
    }

    if (
      createChargeDto.paymentMethod === PaymentMethod.CREDIT_CARD &&
      !createChargeDto.creditCardInstallments
    ) {
      this.logger.error('Credit card installments is required.');
      throw new BadRequestException('Credit card installments is required.');
    }

    this.logger.debug('Charge created.');

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
