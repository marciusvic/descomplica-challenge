import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Alimentando o banco de dados...');
  const studentsData = [
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
  ];
  const existingStudents = await prisma.student.findMany();
  if (existingStudents.length === 0) {
    for (const student of studentsData) {
      await prisma.student.create({ data: student });
    }
    console.log('Banco de dados alimentado com sucesso!');
  } else {
    console.log(
      'O banco de dados já contém estudantes. Nenhuma ação foi tomada.',
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
