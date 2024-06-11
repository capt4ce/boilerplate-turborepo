import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Span } from 'nestjs-otel';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) {}

    @Span()
    async listUsers(): Promise<User[]> {
        return this.usersRepository.find();
    }

    @Span()
    async createUser(userData: Partial<User>): Promise<User> {
        return this.usersRepository.save(userData);
    }
}
