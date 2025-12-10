-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "contactId" UUID;

-- CreateTable
CREATE TABLE "conversation_contacts" (
    "id" UUID NOT NULL,
    "conversationId" UUID NOT NULL,
    "contactId" UUID NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "added_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conversation_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "conversation_contacts_conversationId_idx" ON "conversation_contacts"("conversationId");

-- CreateIndex
CREATE INDEX "conversation_contacts_contactId_idx" ON "conversation_contacts"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "conversation_contacts_conversationId_contactId_key" ON "conversation_contacts"("conversationId", "contactId");

-- CreateIndex
CREATE INDEX "messages_contactId_idx" ON "messages"("contactId");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_contacts" ADD CONSTRAINT "conversation_contacts_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_contacts" ADD CONSTRAINT "conversation_contacts_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
