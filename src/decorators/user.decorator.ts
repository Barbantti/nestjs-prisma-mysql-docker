/**
 * This decorator is used to extract user data from the HTTP request,
 * provided by AuthGuard. It ensures that the user
 * object exists in the request, and if not, it throws a `NotFoundException`.
 *
 * Usage:
 * ```
 * @Get('profile')
 * async getUserProfile(@User() user: UserEntity) {
 *   // user now contains the user data from the request
 *   // ...
 * }
 * ```
 *
 * @throws {NotFoundException} If the user data is not found in the request.
 */
import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';

export const User = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.user) {
      request.user[filter];
      console.log('request.user', request.user);
      if (filter) {
      } else {
        return request.user;
      }
    } else {
      throw new NotFoundException(
        'The user was not found upon request. Please use AuthGuard to get user data.',
      );
    }
  },
);
