import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpenTelemetryModule } from 'nestjs-otel';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import env from './dependencies/env';
import { Logger } from 'nestjs-pino';
import { LoggerModule } from './dependencies/logger/logger.module';

const typeOrmModule = TypeOrmModule.forRoot({
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  synchronize: true,

  // // mysql
  // type: 'mysql',
  // host: 'localhost',
  // port: 3306,
  // username: 'root',
  // password: 'root',
  // database: 'test',

  // sqlite
  type :"sqlite",
  database: "db.sqlite",
})

const openTelemetryModuleConfig = OpenTelemetryModule.forRoot({
  metrics: {
    hostMetrics: true, // Includes Host Metrics
    apiMetrics: {
      enable: true, // Includes api metrics
      defaultAttributes: {
        // You can set default labels for api metrics
        custom: 'label',
      },
      ignoreRoutes: ['/favicon.ico'], // You can ignore specific routes (See https://docs.nestjs.com/middleware#excluding-routes for options)
      ignoreUndefinedRoutes: false, //Records metrics for all URLs, even undefined ones
      prefix: env.SERVICE_NAME, // Add a custom prefix to all API metrics
    },
  },
});

@Module({
  imports: [
    typeOrmModule,
    openTelemetryModuleConfig,
    LoggerModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
