import { Controller, Get } from '@nestjs/common';

@Controller('/api/v1/user')
export class UserController {
    constructor() {}

    @Get()
    async list(): Promise<[]> {
        await new Promise((resolve) => setTimeout(resolve, 5000))
        return []
    }
}
