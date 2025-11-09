import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { FindStudentsDto } from './dto/find-students.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @ApiBody({
    type: CreateStudentDto,
    description: 'Dados para criação de um novo estudante',
    examples: {
      example1: {
        summary: 'Exemplo de criação de estudante',
        value: {
          name: 'Marco Fisbhen',
          cpf: '123.456.789-00',
          email: 'marco@descomplica.com',
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Cria um novo estudante',
    description: 'Endpoint para criar um novo estudante no sistema.',
  })
  @ApiResponse({
    status: 200,
    description: 'Estudante criado com sucesso.',
    type: CreateStudentDto,
  })
  @Post()
  create(@Body() data: CreateStudentDto) {
    return this.studentsService.create(data);
  }
  @ApiOperation({
    summary: 'Busca estudantes',
    description: 'Endpoint para buscar estudantes com filtros opcionais.',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    description: 'Nome do estudante',
    example: 'Marco Fisbhen',
  })
  @ApiQuery({
    name: 'cpf',
    required: false,
    type: String,
    description: 'CPF do estudante',
    example: '123.456.789-00',
  })
  @ApiQuery({
    name: 'email',
    required: false,
    type: String,
    description: 'Email do estudante',
    example: 'marco@descomplica.com',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de estudantes encontrados.',
    type: [CreateStudentDto],
    example: [
      {
        name: 'Marco Fisbhen',
        cpf: '123.456.789-00',
        email: 'marco@descomplica.com',
      },
      {
        name: 'Rodrigo Bosisio',
        cpf: '987.654.321-00',
        email: 'rodrigo@descomplica.com',
      },
    ],
  })
  @Get()
  findAll(@Query() query: FindStudentsDto) {
    return this.studentsService.findAll(query);
  }

  @ApiOperation({
    summary: 'Busca um estudante por ID',
    description: 'Endpoint para buscar um estudante específico pelo seu ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Estudante encontrado com sucesso.',
    type: CreateStudentDto,
    example: {
      name: 'Marco Fisbhen',
      cpf: '123.456.789-00',
      email: 'marco@descomplica.com',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'ID do aluno é obrigatório ou aluno deletado.',
  })
  @ApiResponse({
    status: 404,
    description: 'Estudante não encontrado.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @ApiBody({
    type: CreateStudentDto,
    description: 'Dados para atualização de um estudante',
    examples: {
      example1: {
        summary: 'Exemplo de atualização de estudante',
        value: {
          name: 'Marco Fisbhen Atualizado',
          cpf: '123.456.789-00',
          email: 'marco@descomplica.com',
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Atualiza um estudante existente',
    description: 'Endpoint para atualizar os dados de um estudante existente.',
  })
  @ApiResponse({
    status: 200,
    description: 'Estudante atualizado com sucesso.',
    type: CreateStudentDto,
  })
  @ApiResponse({
    status: 400,
    description: 'ID do aluno é obrigatório ou aluno deletado.',
  })
  @ApiResponse({
    status: 404,
    description: 'Estudante não encontrado.',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<CreateStudentDto>) {
    return this.studentsService.update(id, data);
  }

  @ApiOperation({
    summary: 'Reativa um estudante deletado',
    description:
      'Endpoint para reativar um estudante que foi removido (soft delete).',
  })
  @ApiResponse({
    status: 200,
    description: 'Estudante reativado com sucesso.',
    type: CreateStudentDto,
  })
  @ApiResponse({
    status: 400,
    description: 'ID do aluno é obrigatório ou aluno já está ativo.',
  })
  @ApiResponse({
    status: 404,
    description: 'Estudante não encontrado.',
  })
  @Patch(':id/reactivate')
  reactivate(@Param('id') id: string) {
    return this.studentsService.reactivate(id);
  }

  @ApiOperation({
    summary: 'Remove um estudante',
    description: 'Endpoint para remover um estudante do sistema(soft delete).',
  })
  @ApiResponse({
    status: 200,
    description: 'Estudante removido com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'ID do aluno é obrigatório ou aluno deletado.',
  })
  @ApiResponse({
    status: 404,
    description: 'Estudante não encontrado.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
