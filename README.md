# Repositório voltado para desafio da Descomplica

## Descomplica FullStack Jr - 2025

- Descrição do desafio no arquivo `Desafio Assíncrono Tech Descomplica - 2025 _ Jr.pdf`

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- Docker e Docker Compose instalados
- Git

### Passo a passo

1. **Clone o repositório**
```bash
git clone git@github.com:marciusvic/descomplica-challenge.git
cd descomplica-challenge
```

2. **Crie o arquivo `.env` na raiz do projeto**
```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/alunos
PORT=3000

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=alunos

JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d

NODE_ENV=development
```

3. **Inicie todos os serviços com Docker Compose**
```bash
docker-compose up --build
```

4. **Aguarde os serviços iniciarem**
   - O banco de dados será criado automaticamente
   - As migrations serão executadas
   - O seed inicial será aplicado
   - Frontend e Backend estarão disponíveis

### 🌐 Acessos

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **Swagger Docs**: http://localhost:3000/api
- **Database**: localhost:5432

---

## 🧪 Como rodar os testes

1. Entre na pasta do backend
```bash
cd descomplica-backend
```

2. Execute os testes de integração
```bash
npm run test:e2e:docker
```

### Sobre os testes

- Optei por usar **testes de integração (E2E)** para cobrir o fluxo completo da aplicação
- Utiliza um `docker-compose.test.yml` para subir o banco de dados de testes em um container separado
- Todos os testes são executados em um banco isolado que é destruído após a execução

### Fluxo dos testes:

1. Cria 3 estudantes
2. Valida duplicação de CPF (retorna 409)
3. Valida dados inválidos (retorna 400)
4. Lista todos os estudantes (3 ativos, 0 deletados)
5. Busca estudante por ID
6. Filtra por nome, CPF e email
7. Atualiza dados do estudante
8. Atualiza CPF e valida conflito
9. Soft delete em um estudante
10. Verifica listagem (2 ativos, 1 deletado)
11. Valida que estudante deletado não pode ser acessado/atualizado
12. **Reativa estudante deletado** (funcionalidade adicional)
13. Verifica que estudante foi reativado com sucesso
14. Valida que não é possível reativar estudante já ativo

---

## 🏗️ Arquitetura e Tecnologias

### Backend

#### Tecnologias utilizadas
- **TypeScript** - Tipagem estática
- **Node.js** - Runtime JavaScript
- **Nest.js** - Framework backend
- **Prisma** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **Jest** - Framework de testes
- **Swagger** - Documentação automática da API
- **Docker** - Containerização

#### Por que NestJS?
- Framework que facilita a construção de APIs REST organizadas
- Estrutura robusta para validação de dados com `class-validator`
- Integração nativa com Prisma
- Documentação automática com Swagger
- É o framework backend que mais tenho expertise

#### Organização do código

```
descomplica-backend/
├── src/
│   ├── students/
│   │   ├── students.controller.ts    # Endpoints HTTP
│   │   ├── students.service.ts       # Regras de negócio
│   │   ├── students.repository.ts    # Acesso ao banco
│   │   ├── dto/                      # Data Transfer Objects
│   │   │   ├── create-student.dto.ts
│   │   │   └── update-student.dto.ts
│   │   └── students.module.ts
│   ├── prisma/
│   │   └── prisma.service.ts         # Cliente Prisma
│   └── main.ts                       # Configuração do app
├── prisma/
│   ├── schema.prisma                 # Schema do banco
│   ├── migrations/                   # Histórico de migrations
│   └── seed.ts                       # Dados iniciais
├── test/
│   └── students.e2e-spec.ts          # Testes E2E
└── Dockerfile
```

#### Camadas da aplicação

- **Controller**: Lida com requisições HTTP, validações de entrada e respostas
- **Service**: Contém toda a lógica de negócio e regras da aplicação
- **Repository**: Responsável pela comunicação com o banco de dados via Prisma
- **DTOs**: Validação e transformação de dados de entrada usando `class-validator`

#### Endpoints da API

```
GET    /students                    # Lista todos (ativos e deletados)
GET    /students?name=Marco          # Filtro por nome
GET    /students?cpf=11111111111     # Filtro por CPF
GET    /students?email=teste@email   # Filtro por email
GET    /students/:id                 # Busca por ID
POST   /students                     # Cria novo estudante
PATCH  /students/:id                 # Atualiza estudante
DELETE /students/:id                 # Soft delete
PATCH  /students/:id/reactivate      # Reativa estudante (adicional)
```

#### Validações implementadas

- ✅ CPF único (retorna 409 Conflict)
- ✅ Formato válido de CPF
- ✅ Email válido
- ✅ Nome obrigatório
- ✅ Soft delete (mantém histórico)
- ✅ Validação de estudante deletado antes de operações
- ✅ Tratamento de erros com mensagens claras

---

### Frontend

#### Tecnologias utilizadas
- **TypeScript** - Tipagem estática
- **React 19** - Biblioteca para UI
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento
- **Axios** - Cliente HTTP
- **Shadcn/UI** - Componentes reutilizáveis(Radix + TailwindCSS)
- **TailwindCSS** - Estilização

#### Organização do código

```
descomplica-frontend/
├── src/
│   ├── components/
│   │   ├── ui/                    # Componentes Shadcn/UI
│   │   ├── students/              # Componentes específicos
│   │   │   ├── student-list.tsx
│   │   │   ├── student-form.tsx
│   │   │   └── student-card.tsx
│   │   └── layout/                # Layout da aplicação
│   ├── context/
│   │   ├── student-context.tsx    # Estado global
│   │   └── context-manager.tsx    # Centraliza contexts
│   ├── services/
│   │   └── student-service.tsx    # Requisições HTTP
│   ├── types/
│   │   └── types.ts               # Tipos TypeScript
│   ├── pages/
│   │   └── students.tsx           # Página principal
│   ├── App.tsx                    # Rotas
│   └── main.tsx                   # Entry point
├── public/
├── Dockerfile
├── nginx.conf
└── package.json
```

#### Gerenciamento de Estado com Context API

O frontend utiliza **Context API** para gerenciar o estado global dos estudantes de forma eficiente e centralizada.

**Estrutura do Context (`student-context.tsx`)**

```typescript
interface StudentContextType {
  activeStudents: Student[];      // Lista de estudantes ativos
  deletedStudents: Student[];     // Lista de estudantes deletados
  loading: boolean;               // Estado de carregamento
  getStudent: (id: string) => Promise<Student | null>;
  fetchStudents: (filters?) => Promise<void>;
  createStudent: (student) => Promise<void>;
  updateStudent: (id, data) => Promise<void>;
  deleteStudent: (id) => Promise<void>;
  reactivateStudent: (id) => Promise<void>;
}
```

**Vantagens da abordagem:**

1. **Carregamento inicial único**: Os dados são carregados uma vez no `useEffect` do provider
2. **Cache em memória**: Evita requisições desnecessárias ao navegar entre páginas
3. **Sincronização automática**: Após criar/atualizar/deletar, o contexto recarrega os dados automaticamente
4. **Separação de responsabilidades**:
   - `student-context.tsx` - gerencia estado e lógica
   - `student-service.tsx` - faz requisições HTTP
   - Componentes - apenas consomem os dados

**Como funciona:**

```typescript
// 1. Provider carrega dados na montagem
useEffect(() => {
  fetchStudents(); // Busca inicial
}, []);

// 2. Após qualquer operação, recarrega automaticamente
async function createStudent(student: CreateStudentDto) {
  await createStudentService(student);
  await fetchStudents(); // Atualiza cache local
}
```

**Uso nos componentes:**

```typescript
function StudentList() {
  const { activeStudents, deletedStudents, loading } = useStudent();
  
  // Sem necessidade de useEffect ou requisições manuais
  return (
    <>
      {loading ? <Loading /> : <Table data={activeStudents} />}
    </>
  );
}
```

#### Sistema de Abas (Tabs)

O frontend utiliza **Radix UI Tabs** para separar estudantes ativos e deletados:

- **Aba "Ativos"**: Lista estudantes com `deletedAt = null`
- **Aba "Deletados"**: Lista estudantes com `deletedAt != null`

Ambas as listas são carregadas **uma única vez** e filtradas no estado do Context, evitando requisições duplicadas.

#### Validações implementadas

- ✅ Validação de CPF em tempo real
- ✅ Validação de email
- ✅ Feedback visual de erros
- ✅ Loading states em todas as operações
- ✅ Confirmação antes de deletar
- ✅ Separação visual entre ativos/deletados
- ✅ Mensagens de sucesso/erro
- ✅ Formatação automática de CPF

---

## ⭐ Funcionalidade Adicional: Reativação de Estudantes

### Backend

Criei um endpoint adicional para **reativar estudantes soft-deleted**:

```typescript
// PATCH /students/:id/reactivate
@Patch(':id/reactivate')
async reactivate(@Param('id') id: string) {
  return this.studentsService.reactivate(id);
}
```

**Regras de negócio:**

1. ✅ Apenas estudantes com `deletedAt != null` podem ser reativados
2. ❌ Retorna erro 400 se tentar reativar estudante já ativo
3. ❌ Retorna erro 404 se o estudante não existir
4. ✅ Ao reativar, define `deletedAt = null`

### Frontend

Na aba **"Deletados"**, cada estudante tem um botão **"Reativar"**:

```typescript
async function handleReactivate(id: string) {
  await reactivateStudent(id);
  // Context atualiza automaticamente ambas as listas
}
```

**Após reativação:**
- Estudante é removido da aba "Deletados"
- Estudante aparece na aba "Ativos"
- Sem necessidade de refresh manual da página

---

## 📚 Documentação da API

- **Swagger UI**: http://localhost:3000/api
- **JSON Schema**: http://localhost:3000/api-json

Você pode importar o schema JSON no **Insomnia** ou **Postman** para testar os endpoints.

---

## 🐳 Estrutura Docker

### Arquitetura

```
descomplica-challenge/
├── docker-compose.yml          # Orquestra todos os serviços
├── .env                        # Variáveis de ambiente
├── descomplica-backend/
│   └── Dockerfile             # Imagem do backend
└── descomplica-frontend/
    ├── Dockerfile             # Imagem do frontend
    └── nginx.conf             # Config do servidor web
```

### Serviços

1. **PostgreSQL (db)**: Banco de dados em container
2. **Backend (NestJS)**: API REST em Node.js
3. **Frontend (React)**: Aplicação servida via Nginx

Todos os serviços estão na mesma rede Docker e se comunicam internamente.

---

## 🚀 Melhorias que faria para escalar

- [ ] Sistema de autenticação e autorização (tenho outro projetos com essa funcionalidade nos meus repositórios com guards e roles)
- [ ] Paginação na listagem de estudantes
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Tratamento de erros mais robusto(ex.: Uso de chaves de erro ao invés de mensagens fixas)
- [ ] Histórico de alterações dos estudantes