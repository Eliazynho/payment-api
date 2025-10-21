import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { CustomersService } from './customers/customers.service';
import { CustomersController } from './customers/customers.controller';
import { CustomersModule } from './customers/customers.module';
import { ChargesModule } from './charges/charges.module';

@Module({
  imports: [PrismaModule, CustomersModule, ChargesModule],
  controllers: [AppController, CustomersController],
  providers: [AppService, PrismaService, CustomersService],
})
export class AppModule {}
