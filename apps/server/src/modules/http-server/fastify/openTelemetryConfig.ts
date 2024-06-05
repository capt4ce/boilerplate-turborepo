import {
    BatchSpanProcessor,
    ConsoleSpanExporter,
    TraceIdRatioBasedSampler
  } from '@opentelemetry/sdk-trace-base'
  
  import  { NodeTracerProvider } from '@opentelemetry/sdk-trace-node'
  
  // Configure a tracer provider.
  const provider = new NodeTracerProvider({
    sampler: new TraceIdRatioBasedSampler(0.5)
  })
  
  // Add a span exporter.
  provider.addSpanProcessor(
    new BatchSpanProcessor(new ConsoleSpanExporter())
  )
  
  // Register a global tracer provider.
  provider.register()
  
  // Note: the above is just a basic example. fastify-opentelemetry is compatible with any
  // @opentelemetry/api configuration.