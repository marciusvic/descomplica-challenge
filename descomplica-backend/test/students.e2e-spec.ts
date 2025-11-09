import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'nestjs-prisma';

describe('StudentsController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  let student1Id: string;
  let student2Id: string;
  let student3Id: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = app.get(PrismaService);
    await app.init();

    await prisma.student.deleteMany({});
  });

  afterAll(async () => {
    await prisma.student.deleteMany({});
    await app.close();
  });

  describe('E2E Flow - Student Lifecycle', () => {
    it('1. should create first student', async () => {
      const response = await request(app.getHttpServer())
        .post('/students')
        .send({
          name: 'Marco Fisbhen',
          cpf: '111.111.111-11',
          email: 'marco@descomplica.com',
        })
        .expect(201);

      student1Id = response.body.id;
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Marco Fisbhen');
      expect(response.body.cpf).toBe('111.111.111-11');
      expect(response.body.email).toBe('marco@descomplica.com');
      expect(response.body.deletedAt).toBeNull();
    });

    it('2. should create second student', async () => {
      const response = await request(app.getHttpServer())
        .post('/students')
        .send({
          name: 'Rodrigo Bosisio',
          cpf: '222.222.222-22',
          email: 'rodrigo@descomplica.com',
        })
        .expect(201);

      student2Id = response.body.id;
      expect(response.body.name).toBe('Rodrigo Bosisio');
    });

    it('3. should create third student', async () => {
      const response = await request(app.getHttpServer())
        .post('/students')
        .send({
          name: 'Ana Silva',
          cpf: '333.333.333-33',
          email: 'ana@descomplica.com',
        })
        .expect(201);

      student3Id = response.body.id;
      expect(response.body.name).toBe('Ana Silva');
    });

    it('4. should return 409 when creating student with duplicate CPF', async () => {
      await request(app.getHttpServer())
        .post('/students')
        .send({
          name: 'Duplicate CPF',
          cpf: '111.111.111-11',
          email: 'duplicate@descomplica.com',
        })
        .expect(409);
    });

    it('5. should return 400 when creating student with invalid data', async () => {
      await request(app.getHttpServer())
        .post('/students')
        .send({
          name: '',
          cpf: 'invalid-cpf',
          email: 'invalid-email',
        })
        .expect(400);
    });

    it('6. should list all 3 active students and 0 deleted', async () => {
      const response = await request(app.getHttpServer())
        .get('/students')
        .expect(200);

      expect(response.body).toHaveProperty('activeStudents');
      expect(response.body).toHaveProperty('deletedStudents');
      expect(Array.isArray(response.body.activeStudents)).toBe(true);
      expect(Array.isArray(response.body.deletedStudents)).toBe(true);
      expect(response.body.activeStudents.length).toBe(3);
      expect(response.body.deletedStudents.length).toBe(0);
    });

    it('7. should retrieve student by id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/students/${student1Id}`)
        .expect(200);

      expect(response.body.id).toBe(student1Id);
      expect(response.body.name).toBe('Marco Fisbhen');
    });

    it('8. should filter students by name', async () => {
      const response = await request(app.getHttpServer())
        .get('/students?name=Marco')
        .expect(200);

      expect(response.body).toHaveProperty('activeStudents');
      expect(Array.isArray(response.body.activeStudents)).toBe(true);
      expect(response.body.activeStudents.length).toBeGreaterThan(0);
      expect(response.body.activeStudents[0].name).toContain('Marco');
    });

    it('9. should filter students by CPF', async () => {
      const response = await request(app.getHttpServer())
        .get('/students?cpf=222.222.222-22')
        .expect(200);

      expect(response.body).toHaveProperty('activeStudents');
      expect(Array.isArray(response.body.activeStudents)).toBe(true);
      expect(response.body.activeStudents.length).toBe(1);
      expect(response.body.activeStudents[0].cpf).toBe('222.222.222-22');
    });

    it('10. should filter students by email', async () => {
      const response = await request(app.getHttpServer())
        .get('/students?email=ana@descomplica.com')
        .expect(200);

      expect(response.body).toHaveProperty('activeStudents');
      expect(Array.isArray(response.body.activeStudents)).toBe(true);
      expect(response.body.activeStudents.length).toBe(1);
      expect(response.body.activeStudents[0].email).toBe('ana@descomplica.com');
    });

    it('11. should update student name and email', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/students/${student1Id}`)
        .send({
          name: 'Marco Fisbhen Atualizado',
          email: 'marco.updated@descomplica.com',
        })
        .expect(200);

      expect(response.body.name).toBe('Marco Fisbhen Atualizado');
      expect(response.body.email).toBe('marco.updated@descomplica.com');
      expect(response.body.cpf).toBe('111.111.111-11');
    });

    it('12. should update CPF successfully', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/students/${student1Id}`)
        .send({
          cpf: '999.999.999-99',
        })
        .expect(200);

      expect(response.body.cpf).toBe('999.999.999-99');
    });

    it('12b. should return 409 when updating CPF to an existing one', async () => {
      await request(app.getHttpServer())
        .patch(`/students/${student1Id}`)
        .send({
          cpf: '222.222.222-22',
        })
        .expect(409);
    });

    it('13. should return 404 when updating non-existent student', async () => {
      await request(app.getHttpServer())
        .patch('/students/00000000-0000-0000-0000-000000000000')
        .send({ name: 'New Name' })
        .expect(404);
    });

    it('14. should soft delete student', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/students/${student2Id}`)
        .expect(200);

      expect(response.body.id).toBe(student2Id);
      expect(response.body.deletedAt).not.toBeNull();
    });

    it('15. should list 2 active and 1 deleted student', async () => {
      const response = await request(app.getHttpServer())
        .get('/students')
        .expect(200);

      expect(response.body).toHaveProperty('activeStudents');
      expect(response.body).toHaveProperty('deletedStudents');
      expect(response.body.activeStudents.length).toBe(2);
      expect(response.body.deletedStudents.length).toBe(1);
      expect(
        response.body.activeStudents.find((s: any) => s.id === student2Id),
      ).toBeUndefined();
      expect(
        response.body.deletedStudents.find((s: any) => s.id === student2Id),
      ).toBeDefined();
    });

    it('16. should return 400 when trying to retrieve deleted student', async () => {
      await request(app.getHttpServer())
        .get(`/students/${student2Id}`)
        .expect(400);
    });

    it('17. should return 400 when updating deleted student', async () => {
      await request(app.getHttpServer())
        .patch(`/students/${student2Id}`)
        .send({ name: 'Updated Name' })
        .expect(400);
    });

    it('18. should return 400 when deleting already deleted student', async () => {
      await request(app.getHttpServer())
        .delete(`/students/${student2Id}`)
        .expect(400);
    });

    it('19. should reactivate deleted student', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/students/${student2Id}/reactivate`)
        .expect(200);

      expect(response.body.id).toBe(student2Id);
      expect(response.body.deletedAt).toBeNull();
    });

    it('20. should list 3 active and 0 deleted students', async () => {
      const response = await request(app.getHttpServer())
        .get('/students')
        .expect(200);

      expect(response.body).toHaveProperty('activeStudents');
      expect(response.body).toHaveProperty('deletedStudents');
      expect(response.body.activeStudents.length).toBe(3);
      expect(response.body.deletedStudents.length).toBe(0);
    });

    it('21. should retrieve reactivated student by id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/students/${student2Id}`)
        .expect(200);

      expect(response.body.id).toBe(student2Id);
      expect(response.body.deletedAt).toBeNull();
    });

    it('22. should return 400 when reactivating active student', async () => {
      await request(app.getHttpServer())
        .patch(`/students/${student1Id}/reactivate`)
        .expect(400);
    });

    it('23. should return 404 when reactivating non-existent student', async () => {
      await request(app.getHttpServer())
        .patch('/students/00000000-0000-0000-0000-000000000000/reactivate')
        .expect(404);
    });

    it('24. should return 404 when deleting non-existent student', async () => {
      await request(app.getHttpServer())
        .delete('/students/00000000-0000-0000-0000-000000000000')
        .expect(404);
    });
  });
});
