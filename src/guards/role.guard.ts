// role.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;

    const userRoleLevel = await this.userService.getUserRoleLevel(userId);
    if (userRoleLevel === 'user') {
      console.log('USER.ROLE.GUARD "ACCESS DENIED"');

      return false;
    } else if (userRoleLevel === 'admin') {
      console.log('USER.ROLE.GUARD: "ACCESS ALLOWED"');
      return true;
    }
  }
}
