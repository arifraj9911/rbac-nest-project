import {
  Controller,
  Get,
  Request,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles.guard';

@Controller('profile')
export class ProfileController {
  @Get('/teacher')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['teacher'])
  getUser(@Request() req: any) {
    return 'I am teacher' + JSON.stringify(req.user);
  }
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['student'])
  @Get('/student')
  getStudent(@Request() req: any) {
    return 'I am Student' + JSON.stringify(req.user);
  }
}
