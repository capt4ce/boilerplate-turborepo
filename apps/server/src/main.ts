import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
// import {
//   FastifyAdapter,
//   NestFastifyApplication,
// } from '@nestjs/platform-fastify';
// import { FastifyRoutePathInterceptor } from './dependencies/FastifyRoutePathInterceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import otelSDK from './tracing';
import envConfig from './dependencies/env';

async function bootstrap(env: typeof envConfig) {
  // Start SDK before nestjs factory create
  await otelSDK.start();

  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));

  // // disabling fastify for now as it doesn't support the auto instrumentation yet
  // const fastifyAdapter = new FastifyAdapter()
  // fastifyAdapter.register(require('@fastify/express'))
  // const app = await NestFactory.create<NestFastifyApplication>(
  //   AppModule,
  //   fastifyAdapter,
  // );
  // app.useGlobalInterceptors(new FastifyRoutePathInterceptor())

  app.enableShutdownHooks();
  app.enableCors({ origin: '*' });

  // setup swagger
  const options = new DocumentBuilder()
    .setTitle('boilerplate-server')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(env.SERVICE_PORT, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap(envConfig);