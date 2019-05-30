import { Module } from '@nestjs/common';
import { LeeLogger } from './logger';

@Module({
  providers: [LeeLogger],
  exports: [LeeLogger],
})
export class LoggerModule {}
