import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { ChargesService } from './charges.service';
import { CreateChargeDto } from './dto/create-charge.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IdempotencyInterceptor } from 'src/idempotency/idempotency.interceptor';

@ApiTags('Charges')
@Controller('charges')
@UseInterceptors(IdempotencyInterceptor)
export class ChargesController {
  constructor(private readonly chargesService: ChargesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar uma nova cobranca para um cliente' })
  @ApiResponse({ status: 201, description: 'Cobranca criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados invalidos' })
  @ApiResponse({ status: 404, description: 'Cliente nao encontrado' })
  create(@Body() createChargeDto: CreateChargeDto) {
    return this.chargesService.create(createChargeDto);
  }
}
