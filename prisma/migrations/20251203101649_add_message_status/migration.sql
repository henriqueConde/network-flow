-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'confirmed';

-- CreateIndex
CREATE INDEX "messages_status_idx" ON "messages"("status");
