import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useStudent } from "@/context/stundet-context";
import { Search, X } from "lucide-react";

export function StudentFilters() {
  const { fetchStudents } = useStudent();
  const [filters, setFilters] = useState({
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
    setFilters({ ...filters, cpf: formatted });
  };

  const handleFilter = () => {
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value.trim() !== "")
    );
    fetchStudents(activeFilters);
  };

  const handleClear = () => {
    setFilters({ name: "", cpf: "", email: "" });
    fetchStudents({});
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value.trim() !== ""
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <h2 className="text-lg font-semibold">Filtrar Alunos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="filter-name">Nome</Label>
          <Input
            id="filter-name"
            placeholder="Ex: Marco Fisbhen"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="filter-cpf">CPF</Label>
          <Input
            id="filter-cpf"
            placeholder="000.000.000-00"
            value={filters.cpf}
            onChange={handleCPFChange}
            maxLength={14}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="filter-email">E-mail</Label>
          <Input
            id="filter-email"
            placeholder="exemplo@descomplica.com"
            value={filters.email}
            onChange={(e) => setFilters({ ...filters, email: e.target.value })}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={handleFilter}
          className="bg-descgreen text-black hover:bg-descgreen/90"
        >
          <Search className="h-4 w-4 mr-2" />
          Filtrar
        </Button>
        {hasActiveFilters && (
          <Button onClick={handleClear} variant="outline">
            <X className="h-4 w-4 mr-2" />
            Limpar filtros
          </Button>
        )}
      </div>
    </div>
  );
}
