-- AlterTable
ALTER TABLE "conversations" ADD COLUMN     "auto_followups_enabled" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "opportunities" ADD COLUMN     "auto_followups_enabled" BOOLEAN NOT NULL DEFAULT true;
