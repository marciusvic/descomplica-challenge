import type { Student } from "@/types/student";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useStudent } from "@/context/stundet-context";
import { StudentEditDialog } from "./student-edit-dialog";

interface StudentCardProps {
  student: Student;
}

export function StudentCard({ student }: StudentCardProps) {
  const { deleteStudent } = useStudent();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async () => {
    if (confirm(`Deseja realmente deletar ${student.name}?`)) {
      await deleteStudent(student.id);
    }
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
        <h3 className="font-semibold text-lg mb-2">{student.name}</h3>
        <p className="text-sm text-gray-600">CPF: {student.cpf}</p>
        <p className="text-sm text-gray-600">E-mail: {student.email}</p>
        <div className="flex gap-2 mt-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsEditOpen(true)}
          >
            <Pencil className="w-4 h-4 mr-1" />
            Editar
          </Button>
          <Button size="sm" variant="destructive" onClick={handleDelete}>
            <Trash2 className="w-4 h-4 mr-1" />
            Deletar
          </Button>
        </div>
      </div>
      <StudentEditDialog
        student={student}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
    </>
  );
}
