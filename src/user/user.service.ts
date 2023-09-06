import { Injectable, NotFoundException } from '@nestjs/common';
import { createUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDTO } from './dto/update-put-user-dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user-dto';
import * as moment from 'moment';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: createUserDTO) {
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());

    data.formatBirthDate();
    const checkIfEmailAlreadyInUse = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (checkIfEmailAlreadyInUse) {
      throw new NotFoundException('Email already in user, please try another.');
    }

    return await this.prisma.user.create({
      data,
    });
  }

  async list() {
    return await this.prisma.user.findMany();
  }

  async show(id: number) {
    await this.checkUserId(id);
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    { name, email, password, birthAt, roleLevel }: UpdatePutUserDTO,
  ) {
    await this.checkUserId(id);

    const data: any = {};
    if (name) {
      data.name = name;
    }
    if (email) {
      console.log('email', email);
      data.email = email;
    }
    if (password) {
      data.password = await bcrypt.hash(password, await bcrypt.genSalt());
    }
    if (birthAt) {
      data.birthAt = moment(birthAt, 'DD-MM-YYYY').format();
    }
    if (roleLevel === undefined) {
      data.roleLevel = null;
    } else {
      data.roleLevel = roleLevel;
    }
    return await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async partialUpdate(
    id: number,
    { name, email, password, birthAt, roleLevel }: UpdatePatchUserDTO,
  ) {
    await this.checkUserId(id);

    const data: any = {};
    if (name) {
      data.name = name;
    }
    if (email) {
      console.log('email', email);
      data.email = email;
    }
    if (password) {
      data.password = await bcrypt.hash(password, await bcrypt.genSalt());
    }
    if (birthAt) {
      data.birthAt = moment(birthAt, 'DD-MM-YYYY').format();
    }
    if (roleLevel === undefined) {
      data.roleLevel = null;
    } else {
      data.roleLevel = roleLevel;
    }

    console.log('data', data);
    await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    await this.checkUserId(id);
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async checkUserId(id: number) {
    if (
      !(await this.prisma.user.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`The user ${id} does not exist!`);
    }
  }

  async getUserRoleLevel(userId: number): Promise<string | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        roleLevel: true,
      },
    });
    return user ? user.roleLevel : null;
  }
}
