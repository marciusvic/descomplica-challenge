import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create({ name, cpf, email }: CreateStudentDto) {
    if (!name || !cpf || !email) {
      throw new BadRequestException('Todos os campos são obrigatórios');
    }
    return this.prisma.student.create({
      data: {
        name,
        cpf,
        email,
      },
    });
  }

  async findMany(params: { where?: Prisma.StudentWhereInput }) {
    const { where } = params;
    const baseWhere: Prisma.StudentWhereInput = { deletedAt: null };
    const finalWhere = where ? { AND: [where, baseWhere] } : baseWhere;
    return this.prisma.student.findMany({ where: finalWhere });
  }

  async findById(id: string) {
    return this.prisma.student.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async update(params: {
    where: Prisma.StudentWhereUniqueInput;
    data: Prisma.StudentUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.student.update({
      where,
      data,
    });
  }

  async delete(params: { where: Prisma.StudentWhereUniqueInput }) {
    const { where } = params;
    return this.prisma.student.update({
      where,
      data: { deletedAt: new Date() },
    });
  }
}
