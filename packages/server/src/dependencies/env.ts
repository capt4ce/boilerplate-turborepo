export default {
    SERVICE_NAME: process.env.SERVICE_NAME || 'martplus-server',
    SERVICE_PORT: parseInt(process.env.SERVICE_PORT || '8000'),
    METRICS_PORT: parseInt(process.env.METRICS_PORT || '8081'),
    TRACING_ENDPOINT: process.env.TRACING_ENDPOINT || 'http://localhost:14268/api/traces',
}