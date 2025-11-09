import { http, HttpResponse } from "msw";
import type { Student } from "@/types/student";

const mockStudents: Student[] = [
  {
    id: "1",
    name: "João Silva",
    cpf: "111.111.111-11",
    email: "joao@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: "2",
    name: "Maria Santos",
    cpf: "222.222.222-22",
    email: "maria@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
];

export const handlers = [
  // GET /students
  http.get("http://localhost:3000/students", () => {
    return HttpResponse.json(mockStudents);
  }),

  // GET /students/:id
  http.get("http://localhost:3000/students/:id", ({ params }) => {
    const student = mockStudents.find((s) => s.id === params.id);
    if (!student) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(student);
  }),

  // POST /students
  http.post("http://localhost:3000/students", async ({ request }) => {
    const body = await request.json();
    const newStudent: Student = {
      id: "3",
      ...(body as any),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    return HttpResponse.json(newStudent, { status: 201 });
  }),

  // PATCH /students/:id
  http.patch(
    "http://localhost:3000/students/:id",
    async ({ params, request }) => {
      const body = await request.json();
      const student = mockStudents.find((s) => s.id === params.id);
      if (!student) {
        return new HttpResponse(null, { status: 404 });
      }
      const updated = {
        ...student,
        ...(body as any),
        updatedAt: new Date(),
      };
      return HttpResponse.json(updated);
    }
  ),

  // DELETE /students/:id
  http.delete("http://localhost:3000/students/:id", ({ params }) => {
    const student = mockStudents.find((s) => s.id === params.id);
    if (!student) {
      return new HttpResponse(null, { status: 404 });
    }
    return new HttpResponse(null, { status: 204 });
  }),

  // PATCH /students/:id/reactivate
  http.patch("http://localhost:3000/students/:id/reactivate", ({ params }) => {
    const student = mockStudents.find((s) => s.id === params.id);
    if (!student) {
      return new HttpResponse(null, { status: 404 });
    }
    const reactivated = { ...student, deletedAt: null };
    return HttpResponse.json(reactivated);
  }),
];
