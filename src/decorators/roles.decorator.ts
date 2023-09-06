import { SetMetadata } from '@nestjs/common';

export const Roles = (roleLevel: string) => SetMetadata('roleLevel', roleLevel);
console.log('ROLES', Roles);
