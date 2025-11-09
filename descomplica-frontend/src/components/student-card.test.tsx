import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Student } from "@/types/student";
import { StudentCard } from "./student-card.";

vi.mock("@/context/stundet-context", () => ({
  useStudent: () => ({
    deleteStudent: vi.fn(),
  }),
}));

describe("StudentCard", () => {
  const mockStudent: Student = {
    id: "1",
    name: "João Silva",
    cpf: "111.111.111-11",
    email: "joao@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  it("should render student information", () => {
    render(<StudentCard student={mockStudent} />);

    expect(screen.getByText("João Silva")).toBeInTheDocument();
    expect(screen.getByText(/111\.111\.111-11/)).toBeInTheDocument();
    expect(screen.getByText(/joao@example\.com/)).toBeInTheDocument();
  });

  it("should have edit and delete buttons", () => {
    render(<StudentCard student={mockStudent} />);

    expect(screen.getByRole("button", { name: /editar/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /deletar/i })
    ).toBeInTheDocument();
  });

  it("should open edit dialog when clicking edit button", async () => {
    const user = userEvent.setup();
    render(<StudentCard student={mockStudent} />);

    const editButton = screen.getByRole("button", { name: /editar/i });
    await user.click(editButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
