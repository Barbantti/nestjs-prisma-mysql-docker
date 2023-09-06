import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Patch,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { createUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user-dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user-dto';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
// Importing ParamId custom decorator
import { ParamId } from 'src/decorators/param-id.decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';

@Roles('admin')
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
// Create user profile
export class UserController {
  // Importing create new user with UserService
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: createUserDTO) {
    return await this.userService.create(data);
  }

  //Get all users on db
  @Get()
  async list() {
    return await this.userService.list();
  }

  //Get only user by id
  @Get(':id')
  // Using ParamId custom decorator
  async show(@ParamId() id: number) {
    console.log('id', { id });
    return await this.userService.show(id);
  }

  // Update all user data
  @Put(':id')
  // Using ParamId custom decorator
  async update(@Body() data: UpdatePutUserDTO, @ParamId() id: number) {
    return await this.userService.update(id, data);
  }
  // Update only one part of user data
  @Patch(':id')
  // Using ParamId custom decorator
  async partialUpdate(@Body() data: UpdatePatchUserDTO, @ParamId() id: number) {
    return await this.userService.partialUpdate(id, data);
  }

  // Delete user data from db
  @Delete(':id')
  // Use ParseIntPepe to convert string to number
  async delete(@ParamId() id: number) {
    return this.userService.delete(id);
  }
}
