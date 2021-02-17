import { PrismaClient } from '@prisma/client';

const tableNames = [
  'User',
  'PlaygroundSettings',
  'Song',
  'Tab',
  'Track',
  'UserSettings',
];
const prisma = new PrismaClient();

async function main() {
  try {
    for (const tableName of tableNames) {
      await prisma.$queryRaw(`DELETE FROM "${tableName}";`);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    console.log('Data reset');
    await prisma.$disconnect();
  });
