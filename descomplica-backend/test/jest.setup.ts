import { join } from 'path';
import { config } from 'dotenv';

config({ path: join(process.cwd(), '.env.test') });

process.env.DATABASE_URL =
  process.env.DATABASE_URL ??
  'postgres://postgres:password123@localhost:5433/alunos-db-test';
