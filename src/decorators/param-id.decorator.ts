/**
 * This decorator is used to extract the 'id' parameter from the HTTP request's
 * parameters and return it as a number. It can be applied to controller methods
 * or route handlers to simplify the access to the 'id' parameter.
 *
 * Usage:
 * ```
 * @Controller('users')
 * export class UsersController {
 *   @Get(':id')
 *   async getUserById(@ParamId() userId: number) {
 *     // userId now contains the 'id' parameter as a number
 *     // ...
 *   }
 * }
 * ```
 * @returns await this.userService.getUserById(userId)
 */
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ParamId = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return Number(context.switchToHttp().getRequest().params.id);
  },
);
