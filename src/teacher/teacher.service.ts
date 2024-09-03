import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-couse.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}
  getCourse(): Promise<Teacher[]> {
    return this.teacherRepository.find();
  }

  createCourse(crateCourseDto: CreateCourseDto) {
    return this.teacherRepository.save(crateCourseDto);
  }

  updateCourse(updateCourseDto: UpdateCourseDto, id: number) {
    return this.teacherRepository.update(id, updateCourseDto);
  }

  getOneCourse(course_id: number) {
    return this.teacherRepository.findOne({ where: { course_id } });
  }

  deleteCourse(id: number) {
    return this.teacherRepository.delete(id);
  }
}
