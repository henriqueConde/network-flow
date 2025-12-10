/**
 * Data Migration Script: Populate Opportunities from Conversations
 * 
 * This script creates opportunities from existing conversations.
 * Strategy:
 * - Creates one opportunity per conversation initially
 * - Copies stageId, categoryId, nextActionType, priority from conversation to opportunity
 * - Links conversation to opportunity via opportunityId
 * 
 * Usage:
 *   npx tsx scripts/populate-opportunities.ts
 */

import { prisma } from '../src/backend/core/db/prisma';

async function populateOpportunities() {
  console.log('🚀 Starting opportunity population...');

  // Get all conversations that don't have an opportunity yet
  const conversations = await prisma.conversation.findMany({
    where: {
      opportunityId: null,
    },
    include: {
      contact: true,
      category: true,
      stage: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  console.log(`📊 Found ${conversations.length} conversations without opportunities`);

  let created = 0;
  let skipped = 0;
  let errors = 0;

  // Process conversations in batches to avoid overwhelming the database
  const batchSize = 100;
  for (let i = 0; i < conversations.length; i += batchSize) {
    const batch = conversations.slice(i, i + batchSize);
    
    await Promise.all(
      batch.map(async (conversation) => {
        try {
          // Generate opportunity title from contact and company
          let title: string | null = null;
          if (conversation.contact.company) {
            title = `${conversation.contact.company}`;
            if (conversation.contact.headlineOrRole) {
              title = `${conversation.contact.headlineOrRole} at ${conversation.contact.company}`;
            }
          }

          // Create opportunity from conversation data
          const opportunity = await prisma.opportunity.create({
            data: {
              userId: conversation.userId,
              contactId: conversation.contactId,
              title,
              categoryId: conversation.categoryId,
              stageId: conversation.stageId,
              nextActionType: conversation.nextActionType,
              nextActionDueAt: conversation.nextActionDueAt,
              priority: conversation.priority,
              summary: conversation.summary, // Copy summary if exists
              notes: conversation.notes, // Copy notes if exists
              createdAt: conversation.createdAt, // Preserve original creation time
              updatedAt: conversation.updatedAt,
            },
          });

          // Link conversation to opportunity
          await prisma.conversation.update({
            where: { id: conversation.id },
            data: { opportunityId: opportunity.id },
          });

          created++;
          
          if (created % 50 === 0) {
            console.log(`  ✓ Created ${created} opportunities...`);
          }
        } catch (error) {
          errors++;
          console.error(`  ✗ Error processing conversation ${conversation.id}:`, error);
        }
      })
    );
  }

  console.log(`\n✅ Migration complete!`);
  console.log(`   Created: ${created} opportunities`);
  console.log(`   Skipped: ${skipped} conversations`);
  console.log(`   Errors: ${errors} conversations`);

  // Verify results
  const opportunityCount = await prisma.opportunity.count();
  const linkedConversations = await prisma.conversation.count({
    where: {
      opportunityId: { not: null },
    },
  });

  console.log(`\n📈 Final stats:`);
  console.log(`   Total opportunities: ${opportunityCount}`);
  console.log(`   Linked conversations: ${linkedConversations}`);
}

// Run the migration
populateOpportunities()
  .then(() => {
    console.log('\n✨ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


