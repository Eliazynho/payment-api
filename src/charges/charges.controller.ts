import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ChargesService } from './charges.service';
import { CreateChargeDto } from './dto/create-charge.dto';

@Controller('charges')
export class ChargesController {
  constructor(private readonly chargesService: ChargesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createChargeDto: CreateChargeDto) {
    return this.chargesService.create(createChargeDto);
  }
}
