import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { CreateStudentDto } from "@/types/student";
import { useStudent } from "@/context/stundet-context";

export function StudentForm() {
  const { createStudent } = useStudent();
  const [formData, setFormData] = useState<CreateStudentDto>({
    name: "",
    cpf: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createStudent(formData);
      setFormData({ name: "", cpf: "", email: "" });
      alert("Aluno criado com sucesso!");
    } catch {
      alert("Erro ao criar aluno");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-semibold">Adicionar Novo Aluno</h2>
      <div className="space-y-3">
        <Input
          placeholder="Nome completo"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          placeholder="CPF"
          value={formData.cpf}
          onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
          required
        />
        <Input
          type="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-descgreen text-black hover:bg-descgreen/90"
      >
        Cadastrar Aluno
      </Button>
    </form>
  );
}
