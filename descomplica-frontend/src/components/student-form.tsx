import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { CreateStudentDto } from "@/types/student";
import { useStudent } from "@/context/stundet-context";

export function StudentForm() {
  const { createStudent } = useStudent();
  const [formData, setFormData] = useState<CreateStudentDto>({
    name: "",
    cpf: "",
    email: "",
  });

  const formatCPF = (value: string): string => {
    const numbers = value.replace(/\D/g, "");

    const limitedNumbers = numbers.slice(0, 11);

    if (limitedNumbers.length <= 3) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 6) {
      return `${limitedNumbers.slice(0, 3)}.${limitedNumbers.slice(3)}`;
    } else if (limitedNumbers.length <= 9) {
      return `${limitedNumbers.slice(0, 3)}.${limitedNumbers.slice(
        3,
        6
      )}.${limitedNumbers.slice(6)}`;
    } else {
      return `${limitedNumbers.slice(0, 3)}.${limitedNumbers.slice(
        3,
        6
      )}.${limitedNumbers.slice(6, 9)}-${limitedNumbers.slice(9, 11)}`;
    }
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setFormData({ ...formData, cpf: formatted });
  };

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
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            placeholder="Ex: Marco Fisbhen"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChange={handleCPFChange}
            maxLength={14}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="exemplo@descomplica.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
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
