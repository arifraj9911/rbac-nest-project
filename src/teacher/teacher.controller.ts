import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateCourseDto } from './dto/create-couse.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles.guard';
import { EnrollDto } from 'src/enrollment/enroll.dto';

@Controller('teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Get()
  getCourse() {
    return this.teacherService.getCourse();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['teacher'])
  createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.teacherService.createCourse(createCourseDto);
  }

  @Patch('/:id')
  updateCourse(
    @Body() updateCourseDto: UpdateCourseDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.teacherService.updateCourse(updateCourseDto, id);
  }

  @Get('/:id')
  getOneCourse(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.getOneCourse(id);
  }

  @Delete('/:id')
  deleteCourse(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.deleteCourse(id);
  }

  // enroll the courses
  @Post('/enroll')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['student'])
  enrollInCourse(@Body() enrollDto: EnrollDto, @Request() req: any) {
    const { id, passcode } = enrollDto;
    return this.teacherService.enroll(id, passcode, req.user);
  }
}
