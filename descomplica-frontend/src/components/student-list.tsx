import { useStudent } from "@/context/stundet-context";
import { StudentCard } from "./student-card.";

export function StudentList() {
  const { activeStudents } = useStudent();

  if (activeStudents.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum aluno encontrado.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {activeStudents.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
}
