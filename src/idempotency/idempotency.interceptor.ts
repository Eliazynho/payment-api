/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

// Em um cenário real, você pode armazenar essas informações em um cache como Redis
const idempotencyCache = new Map<string, any>();

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const idempotencyKey = request.headers['idempotency-key'];

    if (!idempotencyKey || request.method !== 'POST') {
      return next.handle();
    }

    if (idempotencyCache.has(idempotencyKey)) {
      console.log('Chave de idempotência duplicada:', idempotencyKey);
      return idempotencyCache.get(idempotencyKey);
    }

    const response = next.handle();
    response.subscribe((res) => {
      console.log('Chave de idempotência:', idempotencyKey);
      idempotencyCache.set(idempotencyKey, res);
    });
    return next.handle();
  }
}
