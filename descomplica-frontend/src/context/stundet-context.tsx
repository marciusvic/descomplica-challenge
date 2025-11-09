import { useStudentService } from "@/services/student-service";
import type { CreateStudentDto, Student } from "@/types/student";
import type { ChildrenProps } from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";

interface StudentContextType {
  activeStudents: Student[];
  deletedStudents: Student[];
  loading: boolean;
  getStudent: (id: string) => Promise<Student | null>;
  fetchStudents: (filters?: {
    name?: string;
    cpf?: string;
    email?: string;
  }) => Promise<void>;
  createStudent: (student: CreateStudentDto) => Promise<void>;
  updateStudent: (id: string, data: Partial<CreateStudentDto>) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
  reactivateStudent: (id: string) => Promise<void>;
}

export const StudentContext = createContext<StudentContextType>({
  activeStudents: [],
  deletedStudents: [],
  loading: false,
  getStudent: async () => null,
  fetchStudents: async () => {},
  createStudent: async () => {},
  updateStudent: async () => {},
  deleteStudent: async () => {},
  reactivateStudent: async () => {},
});

export default function StudentProvider({ children }: ChildrenProps) {
  const [activeStudents, setActiveStudents] = useState<Student[]>([]);
  const [deletedStudents, setDeletedStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    getAllStudents,
    getStudentById,
    createStudent: createStudentService,
    updateStudent: updateStudentService,
    deleteStudent: deleteStudentService,
    reactivateStudent: reactivateStudentService,
  } = useStudentService();

  async function fetchStudents(filters?: {
    name?: string;
    cpf?: string;
    email?: string;
  }) {
    setLoading(true);
    try {
      const response = await getAllStudents(filters);
      const { activeStudents: active, deletedStudents: deleted } =
        response.data;
      setActiveStudents(active);
      setDeletedStudents(deleted);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  }

  async function getStudent(id: string): Promise<Student | null> {
    try {
      const response = await getStudentById(id);
      return response.data;
    } catch (error) {
      console.error("Error fetching student:", error);
      return null;
    }
  }

  async function createStudent(student: CreateStudentDto) {
    setLoading(true);
    try {
      await createStudentService(student);
      await fetchStudents();
    } catch (error) {
      console.error("Error creating student:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function updateStudent(id: string, data: Partial<CreateStudentDto>) {
    setLoading(true);
    try {
      await updateStudentService(id, data);
      await fetchStudents();
    } catch (error) {
      console.error("Error updating student:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function deleteStudent(id: string) {
    setLoading(true);
    try {
      await deleteStudentService(id);
      await fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function reactivateStudent(id: string) {
    setLoading(true);
    try {
      await reactivateStudentService(id);
      await fetchStudents();
    } catch (error) {
      console.error("Error reactivating student:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  // Carrega os estudantes assim que o componente é montado
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <StudentContext.Provider
      value={{
        activeStudents,
        deletedStudents,
        loading,
        getStudent,
        fetchStudents,
        createStudent,
        updateStudent,
        deleteStudent,
        reactivateStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
}
