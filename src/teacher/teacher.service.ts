import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-couse.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Enrollment } from 'src/enrollment/enroll.entity';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
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

  getOneCourse(id: number) {
    return this.teacherRepository.findOne({ where: { id } });
  }

  deleteCourse(id: number) {
    return this.teacherRepository.delete(id);
  }

  // for enrollment
  async enroll(id: number, passcode: string, student: User): Promise<any> {
    // find course by id
    const course = await this.teacherRepository.findOne({ where: { id } });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // verify password
    if (course.passcode !== passcode) {
      throw new UnauthorizedException('Invalid Passcode');
    }

    // check if the student has already access this course
    const existingEnrollment = await this.enrollmentRepository.findOne({
      where: {
        student: { id: student.id },
        course: {
          id: course.id,
        },
      },
    });

    if (existingEnrollment) {
      throw new ConflictException('You are already enrolled in this course');
    }

    // for new enrollment
    const enrollment = this.enrollmentRepository.create({
      student,
      course,
    });

    // save to the database
    return this.enrollmentRepository.save(enrollment);
  }
}
