import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('StudentsController (e2e)', () => {
  let app: INestApplication;
  let studentId: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should access (POST) /students endpoint and create a student', async () => {
    return request(app.getHttpServer())
      .post('/students')
      .send({
        name: 'John Doe',
        cpf: '111.111.111-11',
        email: 'john@descomplica.com',
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('John Doe');
        expect(response.body.cpf).toBe('111.111.111-11');
        expect(response.body.email).toBe('john@descomplica.com');
        studentId = response.body.id;
      });
  });

  it('should access (GET) /students/:id endpoint and retrieve the created student', async () => {
    return request(app.getHttpServer())
      .get(`/students/${studentId}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('id', studentId);
        expect(response.body.name).toBe('John Doe');
        expect(response.body.cpf).toBe('111.111.111-11');
        expect(response.body.email).toBe('john@descomplica.com');
      });
  });

  it('should access (GET) /students endpoint and list all students', async () => {
    return request(app.getHttpServer())
      .get('/students')
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
      });
  });

  it('should access (DELETE) /students/:id endpoint and delete the created student', async () => {
    return request(app.getHttpServer())
      .delete(`/students/${studentId}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('id', studentId);
      });
  });

  it('should return 404 when trying to retrieve the deleted student', async () => {
    return request(app.getHttpServer())
      .get(`/students/${studentId}`)
      .expect(404);
  });
});
