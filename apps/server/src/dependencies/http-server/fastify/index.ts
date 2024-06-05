import Fastify, { FastifyInstance } from 'fastify'
import openTelemetryPlugin from '@autotelic/fastify-opentelemetry'
import cors from 'fastify-cors'

import ENV from '../../../common/env'
import './openTelemetryConfig'

import {HttpServerInterface} from '../interface'


class FastifyServer implements HttpServerInterface {
  private fastify: FastifyInstance

  constructor() {
    this.fastify = Fastify({
      logger: ENV.DEBUG_MODE
    })
  }

  async setup() {
    this.fastify.register(cors, {})
    await this.fastify.register(openTelemetryPlugin, { 
        wrapRoutes: true, 
        ignoreRoutes: (path, method) => method === 'OPTIONS' 
    })
  }


  addRoute(method: string, path: string, handler: any) {
    if (method === 'GET') {
      this.fastify.get(path, async (request, response)=> {
        return handler(request, response)
      })
    }
}

  start() {
    const self = this
    this.fastify.listen({ port: ENV.APP_PORT }, function (err, address) {
        if (err) {
            self.fastify.log.error(err)
            process.exit(1)
        }
    })
  }
}

export default FastifyServer