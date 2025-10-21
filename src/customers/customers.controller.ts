import {
  Controller,
  Body,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
  Get,
  Param,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IdempotencyInterceptor } from 'src/idempotency/idempotency.interceptor';

@ApiTags('customers')
@Controller('customers')
@UseInterceptors(IdempotencyInterceptor)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cria um novo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso' })
  @ApiResponse({ status: 409, description: 'Email ou documento ja cadastrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os clientes' })
  @ApiResponse({ status: 200, description: 'Clientes listados com sucesso' })
  @ApiResponse({ status: 404, description: 'Nenhum cliente encontrado' })
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um cliente por ID' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }
}
