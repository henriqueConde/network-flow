-- AlterTable
ALTER TABLE "conversations" ADD COLUMN     "opportunityId" UUID;

-- CreateTable
CREATE TABLE "opportunities" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "contactId" UUID NOT NULL,
    "title" TEXT,
    "categoryId" UUID,
    "stageId" UUID,
    "next_action_type" TEXT,
    "next_action_due_at" TIMESTAMP(3),
    "priority" TEXT,
    "summary" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "opportunities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "opportunities_userId_idx" ON "opportunities"("userId");

-- CreateIndex
CREATE INDEX "opportunities_contactId_idx" ON "opportunities"("contactId");

-- CreateIndex
CREATE INDEX "opportunities_userId_stageId_idx" ON "opportunities"("userId", "stageId");

-- CreateIndex
CREATE INDEX "opportunities_next_action_due_at_idx" ON "opportunities"("next_action_due_at");

-- CreateIndex
CREATE INDEX "conversations_opportunityId_idx" ON "conversations"("opportunityId");

-- AddForeignKey
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "stages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "opportunities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
