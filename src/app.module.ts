import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeacherModule } from './teacher/teacher.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher/teacher.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TeacherModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'arif@210505',
      database: 'teacherdb',
      entities: [Teacher, User],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
