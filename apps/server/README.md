# MartPlus - Server

## How to
### NestJS
generate a module
`nest generate module <module_name> <module_subdirectory_from_src>`

generate a service
`nest generate service <service_name> <service_subdirectory_from_src>`

generate a controller
`nest generate controller <controller_name> <controller_subdirectory_from_src>`

Naming conventions:
- module, service, controller names should be: concise, in plural form, and uses small characters (e.g. users, products, stores)

### Typeorm
#### Creating a new entity
1. create a new entity file in the `src/entities`
2. specifiy the fields of the entities

Naming conventions:
- Entity name should be in Pascal case
- Entity file should be postfixed with `.entity.ts`

## Notes
## Swagger documentation
available in `http://localhost:8000/docs`

### Metrics
it's available in `http://localhost:8081/metrics`

### Traces
Starting Jaeger to visualize the tracing: https://www.jaegertracing.io/docs/1.6/getting-started/

The Jaeger UI then can be accessed in http://localhost:16686/search