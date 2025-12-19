-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT IF EXISTS "contacts_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT IF EXISTS "contacts_stageId_fkey";

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN IF EXISTS "categoryId";

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN IF EXISTS "stageId";




