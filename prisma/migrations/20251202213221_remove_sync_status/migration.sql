/*
  Warnings:

  - You are about to drop the `sync_status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sync_status" DROP CONSTRAINT "sync_status_userId_fkey";

-- DropTable
DROP TABLE "sync_status";
