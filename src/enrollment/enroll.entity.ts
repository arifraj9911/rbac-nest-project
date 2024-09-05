import { Teacher } from 'src/teacher/teacher.entity';
import { User } from 'src/user/entity/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['student', 'course'])
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.enrollments, { eager: true })
  student: User;

  @ManyToOne(() => Teacher, (course) => course.enrollments, { eager: true })
  course: Teacher;
}
