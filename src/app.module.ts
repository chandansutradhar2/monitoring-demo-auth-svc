// app.module.ts

import { Module } from '@nestjs/common';
import { PrometheusModule, } from '@willsoto/nestjs-prometheus';
import { AppController } from './app.controller';
import { MetricsService } from './metric.service';

@Module({
  imports: [
    PrometheusModule.register({
      defaultLabels: {
        app: 'auth-svc',
      },
    }),
  ],
  controllers: [AppController],
  providers: [MetricsService],
})
export class AppModule { }
