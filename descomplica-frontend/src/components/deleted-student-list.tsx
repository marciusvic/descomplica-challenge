import { Button } from "@/components/ui/button";
import { useStudent } from "@/context/stundet-context";
import { RotateCcw } from "lucide-react";

export function DeletedStudentList() {
  const { deletedStudents, reactivateStudent } = useStudent();

  const handleReactivate = async (id: string, name: string) => {
    if (confirm(`Deseja reativar ${name}?`)) {
      await reactivateStudent(id);
    }
  };

  if (deletedStudents.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum aluno deletado.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {deletedStudents.map((student) => (
        <div
          key={student.id}
          className="bg-white p-4 rounded-lg shadow opacity-75"
        >
          <h3 className="font-semibold text-lg mb-2">{student.name}</h3>
          <p className="text-sm text-gray-600">CPF: {student.cpf}</p>
          <p className="text-sm text-gray-600">E-mail: {student.email}</p>
          <Button
            size="sm"
            className="mt-4 bg-descgreen text-black hover:bg-descgreen/90"
            onClick={() => handleReactivate(student.id, student.name)}
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reativar
          </Button>
        </div>
      ))}
    </div>
  );
}
