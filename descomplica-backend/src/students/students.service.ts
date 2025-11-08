import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StudentsRepository } from './students.repository';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(private studentsRepository: StudentsRepository) {}

  async create(createStudentDto: CreateStudentDto) {
    return this.studentsRepository.create({ ...createStudentDto });
  }

  async findAll(where = {}) {
    return this.studentsRepository.findMany({ where });
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('ID do aluno é obrigatório');
    }
    const student = await this.studentsRepository.findById(id);
    if (!student) {
      throw new NotFoundException('Aluno não encontrado');
    }
    if (student.deletedAt) {
      throw new BadRequestException('Não é possível buscar um aluno deletado');
    }
    return student;
  }

  async update(id: string, updateStudentDto: Partial<CreateStudentDto>) {
    if (!id) {
      throw new BadRequestException('ID do aluno é obrigatório');
    }
    const student = await this.studentsRepository.findById(id);
    if (!student) {
      throw new NotFoundException('Aluno não encontrado');
    }
    if (student.deletedAt) {
      throw new BadRequestException(
        'Não é possível atualizar um aluno deletado',
      );
    }
    return this.studentsRepository.update({
      where: { id },
      data: updateStudentDto,
    });
  }

  async remove(id: string) {
    if (!id) {
      throw new BadRequestException('ID do aluno é obrigatório');
    }
    const student = await this.studentsRepository.findById(id);
    if (!student) {
      throw new NotFoundException('Aluno não encontrado');
    }
    if (student.deletedAt) {
      throw new BadRequestException('Não é possível remover um aluno deletado');
    }
    return this.studentsRepository.delete({
      where: { id },
    });
  }
}
