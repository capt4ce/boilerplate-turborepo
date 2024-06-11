import { Injectable } from '@nestjs/common';
import { Span } from 'nestjs-otel';

@Injectable()
export class UserService {
    constructor() {}

    @Span()
    async listUsers(): Promise<[]> {
        await new Promise((resolve) => setTimeout(resolve, 5000))
        return []
    }
}
