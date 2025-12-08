-- AlterTable
ALTER TABLE "conversations" ADD COLUMN     "challenge_id" UUID;

-- AlterTable
ALTER TABLE "opportunities" ADD COLUMN     "challenge_id" UUID;

-- AddForeignKey
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE SET NULL ON UPDATE CASCADE;
