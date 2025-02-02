import * as process from 'process';
import {
    CompositePropagator,
    W3CTraceContextPropagator,
    W3CBaggagePropagator,
  } from '@opentelemetry/core';
  import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
  import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
  import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
  import { JaegerPropagator } from '@opentelemetry/propagator-jaeger';
  import { B3InjectEncoding, B3Propagator } from '@opentelemetry/propagator-b3';
  import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
  import { NodeSDK } from '@opentelemetry/sdk-node';
  import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
  import { PinoInstrumentation } from '@opentelemetry/instrumentation-pino';
  import env from './dependencies/env';
  
  const otelSDK = new NodeSDK({
    serviceName: env.SERVICE_NAME,
    metricReader: new PrometheusExporter({
      port: env.METRICS_PORT,
    }),
    spanProcessor: new BatchSpanProcessor(new JaegerExporter({
      endpoint: env.TRACING_ENDPOINT,
    })),
    contextManager: new AsyncLocalStorageContextManager(),
    textMapPropagator: new CompositePropagator({
      propagators: [
        new JaegerPropagator(),
        new W3CTraceContextPropagator(),
        new W3CBaggagePropagator(),
        new B3Propagator(),
        new B3Propagator({
          injectEncoding: B3InjectEncoding.MULTI_HEADER,
        }),
      ],
    }),
    instrumentations: [
      getNodeAutoInstrumentations(), 
      // new PinoInstrumentation()
    ],
  });
  
  export default otelSDK;
  
  // You can also use the shutdown method to gracefully shut down the SDK before process shutdown
  // or on some operating system signal.
  process.on('SIGTERM', () => {
    otelSDK
      .shutdown()
      .then(
        () => console.log('SDK shut down successfully'),
        err => console.log('Error shutting down SDK', err)
      )
      .finally(() => process.exit(0));
  });