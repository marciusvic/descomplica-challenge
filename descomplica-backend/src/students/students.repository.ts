import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateStudentDto) {
    const { name, cpf, email } = data;
    if (!name || !cpf || !email) {
      throw new BadRequestException('Todos os campos são obrigatórios');
    }

    try {
      return await this.prisma.student.create({
        data,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('CPF já cadastrado');
      }
      throw error;
    }
  }

  async findAll(query: { name?: string; cpf?: string; email?: string }) {
    const where: any = {};

    if (query.name) {
      where.name = {
        contains: query.name,
        mode: 'insensitive',
      };
    }

    if (query.cpf) {
      where.cpf = query.cpf;
    }

    if (query.email) {
      where.email = {
        contains: query.email,
        mode: 'insensitive',
      };
    }

    return await this.prisma.student.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('ID do aluno é obrigatório');
    }

    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException('Estudante não encontrado');
    }

    if (student.deletedAt) {
      throw new BadRequestException('Estudante foi removido');
    }

    return student;
  }

  async update(id: string, data: Partial<CreateStudentDto>) {
    if (!id) {
      throw new BadRequestException('ID do aluno é obrigatório');
    }

    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException('Estudante não encontrado');
    }

    if (student.deletedAt) {
      throw new BadRequestException(
        'Não é possível atualizar um estudante removido',
      );
    }

    const { cpf, ...updateData } = data;

    return await this.prisma.student.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    if (!id) {
      throw new BadRequestException('ID do aluno é obrigatório');
    }

    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException('Estudante não encontrado');
    }

    if (student.deletedAt) {
      throw new BadRequestException('Estudante já foi removido');
    }

    return await this.prisma.student.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async reactivate(id: string) {
    if (!id) {
      throw new BadRequestException('ID do aluno é obrigatório');
    }

    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException('Estudante não encontrado');
    }

    if (!student.deletedAt) {
      throw new BadRequestException('Estudante já está ativo');
    }

    return await this.prisma.student.update({
      where: { id },
      data: {
        deletedAt: null,
      },
    });
  }

  async findById(id: string) {
    return await this.prisma.student.findUnique({
      where: { id },
    });
  }

  async findMany(params: any) {
    return await this.prisma.student.findMany(params);
  }
}
