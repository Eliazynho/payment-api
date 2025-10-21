/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { ChargesService } from './charges.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PaymentMethod } from '@prisma/client';
import { CreateChargeDto } from './dto/create-charge.dto';

const db = {
  customer: {
    findUnique: jest.fn(),
  },
  charge: {
    create: jest.fn(),
  },
};

describe('ChargesService', () => {
  let service: ChargesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChargesService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<ChargesService>(ChargesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const mockCustomer = {
      id: 'valid-customer-id',
      name: 'Test Customer',
      email: 'customer@test.com',
      document: '11122233344',
      phone: '11999999999',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should create a charge successfully', async () => {
      const chargeDto: CreateChargeDto = {
        customerId: 'valid-customer-id',
        amount: 15000,
        paymentMethod: PaymentMethod.PIX,
      };

      const expectedCharge = {
        id: 'some-charge-uuid',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
        boletoDueDate: null,
        creditCardInstallments: null,
        ...chargeDto,
      };

      (prisma.customer.findUnique as jest.Mock).mockResolvedValue(mockCustomer);
      (prisma.charge.create as jest.Mock).mockResolvedValue(expectedCharge);

      const result = await service.create(chargeDto);

      expect(result).toEqual(expectedCharge);
      expect(prisma.customer.findUnique).toHaveBeenCalledWith({
        where: { id: chargeDto.customerId },
      });
      expect(prisma.charge.create).toHaveBeenCalled();
    });

    it('should throw a NotFoundException if the customer does not exist', async () => {
      const chargeDto: CreateChargeDto = {
        customerId: 'invalid-customer-id',
        amount: 100,
        paymentMethod: PaymentMethod.PIX,
      };

      (prisma.customer.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.create(chargeDto)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.create(chargeDto)).rejects.toThrow(
        'Customer not found.',
      );
      expect(prisma.charge.create).not.toHaveBeenCalled();
    });

    it('should throw a BadRequestException if paymentMethod is BOLETO and boletoDueDate is missing', async () => {
      const chargeDto: CreateChargeDto = {
        customerId: 'valid-customer-id',
        amount: 500,
        paymentMethod: PaymentMethod.BOLETO,
      };

      (prisma.customer.findUnique as jest.Mock).mockResolvedValue(mockCustomer);

      await expect(service.create(chargeDto)).rejects.toThrow(
        BadRequestException,
      );

      await expect(service.create(chargeDto)).rejects.toThrow(
        'Boleto due date is required.',
      );
    });

    it('should throw a BadRequestException if paymentMethod is CREDIT_CARD and creditCardInstallments is missing', async () => {
      const chargeDto: CreateChargeDto = {
        customerId: 'valid-customer-id',
        amount: 1200,
        paymentMethod: PaymentMethod.CREDIT_CARD,
      };

      (prisma.customer.findUnique as jest.Mock).mockResolvedValue(mockCustomer);

      await expect(service.create(chargeDto)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.create(chargeDto)).rejects.toThrow(
        'Credit card installments is required.',
      );
    });
  });
});
