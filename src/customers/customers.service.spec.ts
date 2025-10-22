/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

const db = {
  customer: {
    create: jest.fn(),
  },
};

describe('CustomersService', () => {
  let service: CustomersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a customer successfully', async () => {
      const customerDto = {
        name: 'Test User',
        email: 'test@example.com',
        document: '12345678901',
        phone: '11999999999',
      };

      const expectedCustomer = {
        id: 'some-uuid',
        ...customerDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.customer.create as jest.Mock).mockResolvedValue(expectedCustomer);

      const result = await service.create(customerDto);
      expect(result).toEqual(expectedCustomer);
      expect(prisma.customer.create).toHaveBeenCalledWith({
        data: customerDto,
      });
    });

    it('should throw a ConflictException if email or document already exists', async () => {
      const customerDto = {
        name: 'Test User',
        email: 'test@example.com',
        document: '12345678901',
        phone: '11999999999',
      };

      (prisma.customer.create as jest.Mock).mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
          code: 'P2002',
          clientVersion: 'x.x.x',
        }),
      );

      await expect(service.create(customerDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
