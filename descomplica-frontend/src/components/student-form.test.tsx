import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StudentForm } from "./student-form";

const mockCreateStudent = vi.fn();

vi.mock("@/context/stundet-context", () => ({
  useStudent: () => ({
    createStudent: mockCreateStudent,
  }),
}));

describe("StudentForm", () => {
  it("should render form fields", () => {
    render(<StudentForm />);

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /cadastrar/i })
    ).toBeInTheDocument();
  });

  it("should format CPF on input", async () => {
    const user = userEvent.setup();
    render(<StudentForm />);

    const cpfInput = screen.getByLabelText(/cpf/i);
    await user.type(cpfInput, "11111111111");

    expect(cpfInput).toHaveValue("111.111.111-11");
  });

  it("should submit form with valid data", async () => {
    const user = userEvent.setup();
    render(<StudentForm />);

    await user.type(screen.getByLabelText(/nome/i), "João Silva");
    await user.type(screen.getByLabelText(/cpf/i), "11111111111");
    await user.type(screen.getByLabelText(/e-mail/i), "joao@example.com");

    await user.click(screen.getByRole("button", { name: /cadastrar/i }));

    await waitFor(() => {
      expect(mockCreateStudent).toHaveBeenCalledWith({
        name: "João Silva",
        cpf: "111.111.111-11",
        email: "joao@example.com",
      });
    });
  });

  it("should clear form after successful submission", async () => {
    const user = userEvent.setup();
    mockCreateStudent.mockResolvedValueOnce(undefined);

    render(<StudentForm />);

    await user.type(screen.getByLabelText(/nome/i), "João Silva");
    await user.type(screen.getByLabelText(/cpf/i), "11111111111");
    await user.type(screen.getByLabelText(/e-mail/i), "joao@example.com");

    await user.click(screen.getByRole("button", { name: /cadastrar/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/nome/i)).toHaveValue("");
      expect(screen.getByLabelText(/cpf/i)).toHaveValue("");
      expect(screen.getByLabelText(/e-mail/i)).toHaveValue("");
    });
  });
});
