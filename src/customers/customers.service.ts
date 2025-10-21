import {
  ConflictException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomersService {
  private readonly logger = new Logger(CustomersService.name);
  constructor(private prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      this.logger.debug(
        `Creating customer: ${JSON.stringify(createCustomerDto)}`,
      );

      const customer = await this.prisma.customer.create({
        data: createCustomerDto,
      });

      this.logger.debug(`Created customer: ${JSON.stringify(customer)}`);

      return customer;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        this.logger.error('Email or document already exists.');
        throw new ConflictException('Email or document already exists.');
      }
      if (error instanceof Error) {
        this.logger.error(`Error creating customer: ${error.message}`);
      } else {
        this.logger.error(`Error creating customer: ${String(error)}`);
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.customer.findMany();
  }

  async findOne(id: string) {
    const customer = await this.prisma.customer.findUnique({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Customer with ID "${id}" not found`);
    }
    return customer;
  }
}
