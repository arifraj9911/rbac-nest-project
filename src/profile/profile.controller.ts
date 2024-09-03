import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles.guard';

@Controller('profile')
export class ProfileController {
  @Get('/teacher')
  @UseGuards(AuthGuard('jwt'), new RolesGuard('teacher'))
  getUser(@Request() req: any) {
    return 'I am teacher' + JSON.stringify(req.user);
  }
  @UseGuards(AuthGuard('jwt'), new RolesGuard('student'))
  @Get('/student')
  getStudent(@Request() req: any) {
    return 'I am Student' + JSON.stringify(req.user);
  }
}
