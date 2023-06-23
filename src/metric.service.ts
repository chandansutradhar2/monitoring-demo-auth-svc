// metric.service.ts

import { Injectable } from '@nestjs/common';
import { Counter, Gauge, register } from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly loginAttemptsCounter: Counter<string>;
  private readonly activeUsersGauge: Gauge<string>;

  constructor() {
    // Define the login attempts counter
    this.loginAttemptsCounter = new Counter({
      name: 'login_attempts_total',
      help: 'Total number of login attempts',
      labelNames: ['status'],
    });
    register.registerMetric(this.loginAttemptsCounter);

    // Define the active users gauge
    this.activeUsersGauge = new Gauge({
      name: 'active_users',
      help: 'Number of active users',
      labelNames: ['region'],
    });
    register.registerMetric(this.activeUsersGauge);
  }

  incrementLoginAttempts(status: 'success' | 'failed') {
    this.loginAttemptsCounter.labels(status).inc();
  }

  setActiveUsers(region: string, value: number) {
    this.activeUsersGauge.set({ region }, value);
  }
}
