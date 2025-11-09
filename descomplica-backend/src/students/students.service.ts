import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StudentsRepository } from './students.repository';
import { CreateStudentDto } from './dto/create-student.dto';
import { FindStudentsDto } from './dto/find-students.dto';

@Injectable()
export class StudentsService {
  constructor(private studentsRepository: StudentsRepository) {}

  async create(createStudentDto: CreateStudentDto) {
    return this.studentsRepository.create({ ...createStudentDto });
  }

  async findAll(filters?: FindStudentsDto) {
    const where: any = {};

    if (filters?.name) {
      where.name = { contains: filters.name, mode: 'insensitive' };
    }
    if (filters?.cpf) {
      where.cpf = { contains: filters.cpf };
    }
    if (filters?.email) {
      where.email = { contains: filters.email, mode: 'insensitive' };
    }

    const allStudents = await this.studentsRepository.findMany({ where });

    const activeStudents = allStudents.filter((student) => !student.deletedAt);
    const deletedStudents = allStudents.filter((student) => student.deletedAt);

    return {
      activeStudents,
      deletedStudents,
    };
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('ID do aluno é obrigatório');
    }
    const student = await this.studentsRepository.findById(id);
    if (!student) {
      throw new NotFoundException('Aluno não encontrado');
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

  async reactivate(id: string) {
    if (!id) {
      throw new BadRequestException('ID do aluno é obrigatório');
    }
    const student = await this.studentsRepository.findById(id);
    if (!student) {
      throw new NotFoundException('Aluno não encontrado');
    }
    if (!student.deletedAt) {
      throw new BadRequestException('Aluno já está ativo');
    }
    return this.studentsRepository.reactivate({
      where: { id },
    });
  }
}
