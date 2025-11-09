# Descomplica FullStack Jr - 2025

Repositório do desafio técnico. Descrição completa em `Desafio Assíncrono Tech Descomplica - 2025 _ Jr.pdf`

---

## 🚀 Início Rápido

### Pré-requisitos
- Docker e Docker Compose
- Git

### Instalação

**1. Clone e configure**
```bash
git clone git@github.com:marciusvic/descomplica-challenge.git
cd descomplica-challenge
```

**2. Crie o arquivo `.env`**
```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/alunos
PORT=3000
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=alunos
NODE_ENV=development
```

**3. Inicie os serviços**
```bash
docker-compose up --build
```

### Acessos
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **Swagger Docs**: http://localhost:3000/api
- **Database**: localhost:5432

---

## 🧪 Testes

### Backend (Testes E2E)
```bash
cd descomplica-backend
npm run test:e2e:docker
```

Cobertura completa de funcionalidades incluindo criação, listagem, filtros, atualização, soft delete e reativação de estudantes. Utiliza banco isolado em container Docker.

### Frontend (Testes Unitários)
```bash
cd descomplica-frontend
npm test              # Modo watch
npm run test:ui       # Interface visual
npm run test:coverage # Relatório de cobertura
```

---

## 🏗️ Arquitetura

### Backend (NestJS + PostgreSQL)

**Stack:** TypeScript, Node.js, NestJS, Prisma, PostgreSQL, Jest, Swagger, Docker

**Camadas:**
- **Controller**: Requisições HTTP e validações de entrada
- **Service**: Lógica de negócio e regras da aplicação
- **Repository**: Comunicação com banco via Prisma
- **DTOs**: Validação de dados com class-validator

**Endpoints principais:**
- `GET /students` - Lista todos (com filtros opcionais)
- `GET /students/:id` - Busca por ID
- `POST /students` - Cria estudante
- `PATCH /students/:id` - Atualiza dados
- `DELETE /students/:id` - Soft delete
- `PATCH /students/:id/reactivate` - Reativa estudante deletado

**Validações:**
- CPF único e formato válido
- Email válido
- Campos obrigatórios
- Soft delete mantém histórico
- Tratamento de conflitos (409) e erros (400/404)

### Frontend (React + Vite)

**Stack:** TypeScript, React 19, Vite, React Router, Axios, Shadcn/UI, TailwindCSS

**Arquitetura:**
- **Context API**: Gerenciamento de estado global com cache em memória
- **Services**: Requisições HTTP isoladas
- **Components**: UI reutilizáveis (Shadcn/UI + Radix)
- **Pages**: Composição de componentes

**Features:**
- Sistema de abas (Ativos/Deletados)
- Validação em tempo real
- Formatação automática de CPF
- Loading states e feedback visual
- Confirmações de ações críticas

**Gerenciamento de Estado:**
- Carregamento inicial único no Provider
- Cache local evita requisições desnecessárias
- Sincronização automática após operações CRUD
- Separação de estudantes ativos e deletados

---

## ⭐ Funcionalidade Adicional

### Reativação de Estudantes

Permite restaurar estudantes soft-deleted com validações de regra de negócio:
- Apenas estudantes deletados podem ser reativados
- Retorna erro 400 se já estiver ativo
- Atualização automática nas listas do frontend

---

## 📚 Documentação

**Swagger UI completo:** http://localhost:3000/api

Importe o JSON Schema no Insomnia/Postman via http://localhost:3000/api-json

---

## 🐳 Docker

Três serviços orquestrados via docker-compose:
1. **PostgreSQL**: Banco de dados
2. **Backend**: API NestJS
3. **Frontend**: React servido via Nginx

Todos na mesma rede Docker com comunicação interna.

---

## 🚀 Melhorias Futuras

- Sistema de autenticação e autorização (JWT com guards e roles)
- Paginação e ordenação avançada
- CI/CD com GitHub Actions
- Sistema de logging estruturado
- Histórico de alterações (audit log)
- Internacionalização (i18n)
- Rate limiting e caching (Redis)