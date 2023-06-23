// app.controller.ts

import { Controller, Body, Post, UseInterceptors } from '@nestjs/common';
import { MetricsService } from './metric.service';

@Controller()
export class AppController {
  constructor(private readonly metricsService: MetricsService) { }

  @Post('login')
  async login(@Body() data: { email: string; password: string }) {
    let authenticated: boolean = Math.random() < 0.5;
    // Your authentication logic here

    // Example: Increment login attempts counter based on authentication result
    if (authenticated) {
      // Successful login attempt
      this.metricsService.incrementLoginAttempts('success');
    } else {
      // Failed login attempt
      this.metricsService.incrementLoginAttempts('failed');
    }

    // Continue with your login logic

    return authenticated
  }
}
