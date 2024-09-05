import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// export class RolesGuard implements CanActivate {
//   private rolePassed: string;
//   constructor(role: string) {
//     this.rolePassed = role;
//   }
//   canActivate(context: ExecutionContext): boolean {
//     const ctx = context.switchToHttp();
//     const request: any = ctx.getRequest<Request>();
//     return this.rolePassed === request.user.role;
//   }
// }

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return roles.includes(user.role);
  }
}
