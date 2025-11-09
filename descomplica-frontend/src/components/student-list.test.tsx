import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { StudentList } from "./student-list";
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
    deletedAt: null,
  },
];

const mockUseStudent = vi.fn();

vi.mock("@/context/stundet-context", () => ({
  useStudent: () => mockUseStudent(),
}));

describe("StudentList", () => {
  it("should render list of students", () => {
    mockUseStudent.mockReturnValue({
      activeStudents: mockStudents,
      deleteStudent: vi.fn(),
    });

    render(<StudentList />);

    expect(screen.getByText("João Silva")).toBeInTheDocument();
    expect(screen.getByText("Maria Santos")).toBeInTheDocument();
  });

  it("should show empty message when no students", () => {
    mockUseStudent.mockReturnValue({
      activeStudents: [],
      deleteStudent: vi.fn(),
    });

    render(<StudentList />);

    expect(screen.getByText(/nenhum aluno encontrado/i)).toBeInTheDocument();
  });
});
