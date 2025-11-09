import api from "./api";
import type { CreateStudentDto } from "@/types/student";

export function useStudentService() {
  const getAllStudents = (filters?: {
    name?: string;
    cpf?: string;
    email?: string;
  }) => {
    const params = new URLSearchParams();
    if (filters?.name) params.append("name", filters.name);
    if (filters?.cpf) params.append("cpf", filters.cpf);
    if (filters?.email) params.append("email", filters.email);

    return api.get(`/students?${params.toString()}`);
  };

  const getStudentById = (id: string) => {
    return api.get(`/students/${id}`);
  };

  const createStudent = (data: CreateStudentDto) => {
    return api.post(`/students`, data);
  };

  const updateStudent = (id: string, data: Partial<CreateStudentDto>) => {
    return api.patch(`/students/${id}`, data);
  };

  const deleteStudent = (id: string) => {
    return api.delete(`/students/${id}`);
  };

  const reactivateStudent = (id: string) => {
    return api.patch(`/students/${id}/reactivate`);
  };

  return {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    reactivateStudent,
  };
}
