import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { CustomersService } from './customers/customers.service';
import { CustomersController } from './customers/customers.controller';
import { CustomersModule } from './customers/customers.module';
import { ChargesModule } from './charges/charges.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    CustomersModule,
    ChargesModule,
    HealthModule,
  ],
  controllers: [AppController, CustomersController],
  providers: [AppService, PrismaService, CustomersService],
})
export class AppModule {}
