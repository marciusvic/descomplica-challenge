import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStudent } from "@/context/stundet-context";

export function StudentFilters() {
  const { fetchStudents } = useStudent();
  const [filters, setFilters] = useState({
    name: "",
    cpf: "",
    email: "",
  });

  const handleFilter = () => {
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value.trim() !== "")
    );
    fetchStudents(activeFilters);
  };

  const handleClear = () => {
    setFilters({ name: "", cpf: "", email: "" });
    fetchStudents();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <h2 className="text-lg font-semibold">Filtrar Alunos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Nome"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
        <Input
          placeholder="CPF"
          value={filters.cpf}
          onChange={(e) => setFilters({ ...filters, cpf: e.target.value })}
        />
        <Input
          placeholder="E-mail"
          value={filters.email}
          onChange={(e) => setFilters({ ...filters, email: e.target.value })}
        />
      </div>
      <div className="flex gap-2">
        <Button
          onClick={handleFilter}
          className="bg-descgreen text-black hover:bg-descgreen/90"
        >
          Filtrar
        </Button>
        <Button onClick={handleClear} variant="outline">
          Limpar
        </Button>
      </div>
    </div>
  );
}
