import * as moment from 'moment';
import { RoleLevel } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class createUserDTO {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsStrongPassword({
    minLength: 6,
    minNumbers: 0,
    minLowercase: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;

  @IsOptional()
  birthAt: string;

  formatBirthDate() {
    if (this.birthAt) {
      this.birthAt = moment(this.birthAt, 'DD-MM-YYYY').format();
    }
  }

  @IsOptional()
  @IsEnum(RoleLevel)
  roleLevel: any;
}
