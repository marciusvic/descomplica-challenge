const { execSync } = require('child_process');
const { join } = require('path');
require('dotenv').config({ path: join(process.cwd(), '.env.test') });

console.log('🔧 Running prisma generate using', process.env.DATABASE_URL);

execSync('npx prisma generate', {
  stdio: 'inherit',
  env: {
    ...process.env,
    DATABASE_URL: process.env.DATABASE_URL,
  },
});
