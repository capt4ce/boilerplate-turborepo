import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from 'src/entities/User.entity';

@Controller('/api/v1/users')
@ApiTags('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async listUsers(): Promise<User[]> {
        return this.usersService.listUsers()
    }
}
