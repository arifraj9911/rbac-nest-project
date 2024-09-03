import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
export class ProfileController {
  @UseGuards(AuthGuard('jwt'))
  @Get('/teacher')
  getUser(@Request() req: any) {
    return 'I am teacher' + JSON.stringify(req.user);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/student')
  getStudent(@Request() req: any) {
    return 'I am Student' + JSON.stringify(req.user);
  }
}
