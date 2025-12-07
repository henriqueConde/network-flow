-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "common_ground" TEXT,
ADD COLUMN     "company_id" UUID,
ADD COLUMN     "connection_accepted_at" TIMESTAMP(3),
ADD COLUMN     "connection_request_sent_at" TIMESTAMP(3),
ADD COLUMN     "connection_status" TEXT,
ADD COLUMN     "contact_type" TEXT,
ADD COLUMN     "dm_sent_at" TIMESTAMP(3),
ADD COLUMN     "email" TEXT,
ADD COLUMN     "first_message_date" TIMESTAMP(3),
ADD COLUMN     "last_follow_up_at" TIMESTAMP(3),
ADD COLUMN     "referral_details" TEXT,
ADD COLUMN     "referral_given" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "referral_given_at" TIMESTAMP(3),
ADD COLUMN     "strategy_ids" TEXT[],
ADD COLUMN     "warm_or_cold" TEXT;

-- AlterTable
ALTER TABLE "conversations" ADD COLUMN     "email_follow_up_dates" TIMESTAMP(3)[],
ADD COLUMN     "email_sent_at" TIMESTAMP(3),
ADD COLUMN     "email_status" TEXT,
ADD COLUMN     "follow_up_1_date" TIMESTAMP(3),
ADD COLUMN     "follow_up_2_date" TIMESTAMP(3),
ADD COLUMN     "follow_up_3_date" TIMESTAMP(3),
ADD COLUMN     "loom_sent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "loom_video_url" TEXT,
ADD COLUMN     "response_received" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "response_received_at" TIMESTAMP(3),
ADD COLUMN     "strategy_ids" TEXT[];

-- AlterTable
ALTER TABLE "opportunities" ADD COLUMN     "github_repo_url" TEXT,
ADD COLUMN     "issues_found" JSONB,
ADD COLUMN     "live_demo_url" TEXT,
ADD COLUMN     "loom_video_url" TEXT,
ADD COLUMN     "project_details" TEXT,
ADD COLUMN     "proof_of_work_type" TEXT,
ADD COLUMN     "shared_channels" TEXT[],
ADD COLUMN     "strategy_ids" TEXT[],
ADD COLUMN     "team_responses" JSONB;

-- CreateTable
CREATE TABLE "companies" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "industry" TEXT,
    "funding_round" TEXT,
    "funding_date" TIMESTAMP(3),
    "funding_source" TEXT,
    "careers_page_url" TEXT,
    "has_relevant_role" BOOLEAN NOT NULL DEFAULT false,
    "role_title" TEXT,
    "applied" BOOLEAN NOT NULL DEFAULT false,
    "application_date" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_postings" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "company_id" UUID,
    "job_title" TEXT NOT NULL,
    "job_url" TEXT NOT NULL,
    "posted_at" TIMESTAMP(3),
    "applicants_when_found" TEXT,
    "source" TEXT NOT NULL,
    "opportunity_id" UUID,
    "outreach_done" BOOLEAN NOT NULL DEFAULT false,
    "outreach_channels" TEXT[],
    "contacts_found" JSONB,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_postings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenges" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "goal" INTEGER NOT NULL,
    "outreaches_count" INTEGER NOT NULL DEFAULT 0,
    "accepts_count" INTEGER NOT NULL DEFAULT 0,
    "replies_count" INTEGER NOT NULL DEFAULT 0,
    "calls_count" INTEGER NOT NULL DEFAULT 0,
    "interviews_count" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenge_contacts" (
    "id" UUID NOT NULL,
    "challenge_id" UUID NOT NULL,
    "contact_id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "challenge_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenge_conversations" (
    "id" UUID NOT NULL,
    "challenge_id" UUID NOT NULL,
    "conversation_id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "challenge_conversations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "companies_userId_idx" ON "companies"("userId");

-- CreateIndex
CREATE INDEX "companies_funding_date_idx" ON "companies"("funding_date");

-- CreateIndex
CREATE INDEX "companies_funding_round_idx" ON "companies"("funding_round");

-- CreateIndex
CREATE UNIQUE INDEX "job_postings_opportunity_id_key" ON "job_postings"("opportunity_id");

-- CreateIndex
CREATE INDEX "job_postings_userId_idx" ON "job_postings"("userId");

-- CreateIndex
CREATE INDEX "job_postings_company_id_idx" ON "job_postings"("company_id");

-- CreateIndex
CREATE INDEX "job_postings_posted_at_idx" ON "job_postings"("posted_at");

-- CreateIndex
CREATE INDEX "job_postings_source_idx" ON "job_postings"("source");

-- CreateIndex
CREATE INDEX "challenges_userId_idx" ON "challenges"("userId");

-- CreateIndex
CREATE INDEX "challenges_start_date_idx" ON "challenges"("start_date");

-- CreateIndex
CREATE INDEX "challenges_end_date_idx" ON "challenges"("end_date");

-- CreateIndex
CREATE INDEX "challenge_contacts_challenge_id_idx" ON "challenge_contacts"("challenge_id");

-- CreateIndex
CREATE INDEX "challenge_contacts_contact_id_idx" ON "challenge_contacts"("contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "challenge_contacts_challenge_id_contact_id_key" ON "challenge_contacts"("challenge_id", "contact_id");

-- CreateIndex
CREATE INDEX "challenge_conversations_challenge_id_idx" ON "challenge_conversations"("challenge_id");

-- CreateIndex
CREATE INDEX "challenge_conversations_conversation_id_idx" ON "challenge_conversations"("conversation_id");

-- CreateIndex
CREATE UNIQUE INDEX "challenge_conversations_challenge_id_conversation_id_key" ON "challenge_conversations"("challenge_id", "conversation_id");

-- CreateIndex
CREATE INDEX "contacts_userId_idx" ON "contacts"("userId");

-- CreateIndex
CREATE INDEX "contacts_company_id_idx" ON "contacts"("company_id");

-- CreateIndex
CREATE INDEX "contacts_warm_or_cold_idx" ON "contacts"("warm_or_cold");

-- CreateIndex
CREATE INDEX "contacts_connection_status_idx" ON "contacts"("connection_status");

-- CreateIndex
CREATE INDEX "conversations_email_status_idx" ON "conversations"("email_status");

-- CreateIndex
CREATE INDEX "opportunities_proof_of_work_type_idx" ON "opportunities"("proof_of_work_type");

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_postings" ADD CONSTRAINT "job_postings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_postings" ADD CONSTRAINT "job_postings_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_postings" ADD CONSTRAINT "job_postings_opportunity_id_fkey" FOREIGN KEY ("opportunity_id") REFERENCES "opportunities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_contacts" ADD CONSTRAINT "challenge_contacts_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_contacts" ADD CONSTRAINT "challenge_contacts_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_conversations" ADD CONSTRAINT "challenge_conversations_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_conversations" ADD CONSTRAINT "challenge_conversations_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
