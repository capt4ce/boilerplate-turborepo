import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { FastifyRequest, RawRequestDefaultExpression } from 'fastify';
import type { Observable } from 'rxjs';

interface RequestRoute {
  route: {
    path: string;
  };
}

/**
 * Add the router path so it is visibile in the middleware as req.route.path which
 * nestjs-otel uses for route metrics.
 * See https://github.com/pragmaticivan/nestjs-otel/issues/245
 */
@Injectable()
export class FastifyRoutePathInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const raw = request.raw as RawRequestDefaultExpression & RequestRoute;
    raw.route = {
      path: request.routeOptions.url,
    };

    return next.handle();
  }
}