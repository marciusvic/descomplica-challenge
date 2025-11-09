import { Injectable } from '@nestjs/common';
import { StudentsRepository } from './students.repository';
import { CreateStudentDto } from './dto/create-student.dto';
import { FindStudentsDto } from './dto/find-students.dto';

@Injectable()
export class StudentsService {
  constructor(private studentsRepository: StudentsRepository) {}

  async create(data: CreateStudentDto) {
    return this.studentsRepository.create(data);
  }

  async findAll(query: FindStudentsDto) {
    const allStudents = await this.studentsRepository.findAll(query);

    const activeStudents = allStudents.filter((student) => !student.deletedAt);
    const deletedStudents = allStudents.filter((student) => student.deletedAt);

    return {
      activeStudents,
      deletedStudents,
    };
  }

  async findOne(id: string) {
    return this.studentsRepository.findOne(id);
  }

  async update(id: string, data: Partial<CreateStudentDto>) {
    return this.studentsRepository.update(id, data);
  }

  async remove(id: string) {
    return this.studentsRepository.remove(id);
  }

  async reactivate(id: string) {
    return this.studentsRepository.reactivate(id);
  }
}
