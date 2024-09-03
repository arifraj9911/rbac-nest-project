import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateCourseDto } from './dto/create-couse.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Get()
  getCourse() {
    return this.teacherService.getCourse();
  }

  @Post()
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
}
