import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { StudentsRepository } from './students.repository';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [PrismaModule],
  providers: [StudentsService, StudentsRepository],
  controllers: [StudentsController],
})
export class StudentsModule {}
