export interface Student {
  id: string;
  name: string;
  cpf: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CreateStudentDto {
  name: string;
  cpf: string;
  email: string;
}
