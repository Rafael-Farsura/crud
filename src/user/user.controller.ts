import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('createUser')
    create(@Body() user: User): Promise<User> {
        return this.userService.create(user);
    }

    @Get('')
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<User> {
        return this.userService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() user: Partial<User>): Promise<User> {
        return this.userService.update(id, user);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.userService.remove(id);
    }
}
