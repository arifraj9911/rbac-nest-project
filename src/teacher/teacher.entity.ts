import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  course_id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  passcode: string;

  @Column()
  video_link: string;
}
