export interface HttpServerInterface {
    setup(): Promise<void>
    addRoute(method: 'GET'| 'POST', path: string, handler: Function): void
    start(): void
}