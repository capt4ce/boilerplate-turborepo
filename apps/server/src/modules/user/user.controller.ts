import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller('/api/v1/users')
@ApiTags('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async listUsers(): Promise<[]> {
        return this.userService.listUsers()
    }
}
