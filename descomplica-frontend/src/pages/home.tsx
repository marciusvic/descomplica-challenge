import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import logo from "../../assets/logo.svg";
import { useStudent } from "@/context/stundet-context";
import { StudentFilters } from "@/components/student-filters";
import { StudentList } from "@/components/student-list";
import { StudentForm } from "@/components/student-form";
import { DeletedStudentList } from "@/components/deleted-student-list";

export default function HomePage() {
  const { loading } = useStudent();

  return (
    <div className="w-full h-full bg-gray-50">
      <header className="w-full bg-white shadow-sm grid grid-cols-3 items-center p-4">
        <img src={logo} alt="Logo da Descomplica" className="w-32 h-auto" />
        <h1 className="text-2xl font-bold text-center">Sistema de Alunos</h1>
        <div></div>
      </header>

      <main className="container mx-auto p-6">
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger
              value="list"
              className="data-[state=active]:bg-descgreen data-[state=active]:text-black"
            >
              Listar Alunos
            </TabsTrigger>
            <TabsTrigger
              value="create"
              className="data-[state=active]:bg-descgreen data-[state=active]:text-black"
            >
              Adicionar Aluno
            </TabsTrigger>
            <TabsTrigger
              value="deleted"
              className="data-[state=active]:bg-descgreen data-[state=active]:text-black"
            >
              Alunos Deletados
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <StudentFilters />
            {loading ? (
              <div className="text-center py-8">Carregando...</div>
            ) : (
              <StudentList />
            )}
          </TabsContent>

          <TabsContent value="create">
            <div className="max-w-2xl mx-auto">
              <StudentForm />
            </div>
          </TabsContent>

          <TabsContent value="deleted" className="space-y-4">
            {loading ? (
              <div className="text-center py-8">Carregando...</div>
            ) : (
              <DeletedStudentList />
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
