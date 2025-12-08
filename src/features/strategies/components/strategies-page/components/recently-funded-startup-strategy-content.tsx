'use client';

import { Box, Typography } from '@mui/material';
import { styles } from '../strategies-page.styles';
import type { RECENTLY_FUNDED_STARTUP_STRATEGY_CONFIG } from '../strategies-page.config';

interface RecentlyFundedStartupStrategyContentProps {
  config: typeof RECENTLY_FUNDED_STARTUP_STRATEGY_CONFIG;
}

export function RecentlyFundedStartupStrategyContent({ config }: RecentlyFundedStartupStrategyContentProps) {
  const { copy } = config;

  return (
    <>
      <Box sx={styles.strategyHeader()}>
        <Typography variant="h4" sx={styles.mainStrategyTitle()}>
          {copy.title}
        </Typography>
        <Typography variant="body1" sx={styles.strategySubtitle()}>
          {copy.subtitle}
        </Typography>
      </Box>

      {/* What It Is */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.whatItIs.title}
        </Typography>

        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.whatItIs.goal.title}
          </Typography>
          <Typography variant="body1" sx={styles.sectionContent()}>
            {copy.sections.whatItIs.goal.content}
          </Typography>
        </Box>

        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.whatItIs.whyItWorks.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.whatItIs.whyItWorks.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>

        {copy.sections.whatItIs.note && (
          <Box sx={styles.subsection()}>
            <Typography variant="body1" sx={styles.sectionContent()}>
              {copy.sections.whatItIs.note}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Workflow */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.workflow.title}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.workflow.description}
        </Typography>

        {/* Prep */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.workflow.prep.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.workflow.prep.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Find Startups */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.workflow.findStartups.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.workflow.findStartups.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* For Each Startup */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.workflow.forEachStartup.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.workflow.forEachStartup.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Find Decision Makers */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.workflow.findDecisionMakers.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.workflow.findDecisionMakers.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Send Connection Requests */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.workflow.sendConnectionRequests.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.workflow.sendConnectionRequests.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Convert to Conversations */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.workflow.convertToConversations.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.workflow.convertToConversations.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Follow Up */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.workflow.followUp.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.workflow.followUp.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Templates */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.templates.title}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.templates.description}
        </Typography>

        {/* Connection Request */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.templates.connectionRequest.title}
          </Typography>
          <Typography variant="body2" sx={styles.sectionContent()}>
            {copy.sections.templates.connectionRequest.context}
          </Typography>
          <Box sx={styles.templateBox()}>
            {copy.sections.templates.connectionRequest.template}
          </Box>
          <Typography variant="body2" sx={styles.sectionContent()}>
            {copy.sections.templates.connectionRequest.note}
          </Typography>
        </Box>

        {/* If They Accept */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.templates.ifTheyAccept.title}
          </Typography>
          <Box sx={styles.templateBox()}>
            {copy.sections.templates.ifTheyAccept.template}
          </Box>
        </Box>

        {/* If Not Hiring */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.templates.ifNotHiring.title}
          </Typography>
          <Box sx={styles.templateBox()}>
            {copy.sections.templates.ifNotHiring.template}
          </Box>
        </Box>

        {/* If Job Posting */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.templates.ifJobPosting.title}
          </Typography>
          <Box sx={styles.templateBox()}>
            {copy.sections.templates.ifJobPosting.template}
          </Box>
        </Box>

        {/* Follow-up Nudge */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.templates.followUpNudge.title}
          </Typography>
          <Box sx={styles.templateBox()}>
            {copy.sections.templates.followUpNudge.template}
          </Box>
        </Box>

        {/* Final Follow-up */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.templates.finalFollowUp.title}
          </Typography>
          <Box sx={styles.templateBox()}>
            {copy.sections.templates.finalFollowUp.template}
          </Box>
        </Box>
      </Box>

      {/* Tracking Structure */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.trackingStructure.title}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.trackingStructure.description}
        </Typography>

        {/* Company Fields */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.trackingStructure.companyFields.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.trackingStructure.companyFields.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                • {item}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Contact Fields */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.trackingStructure.contactFields.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.trackingStructure.contactFields.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                • {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>

      {/* How to Track in App */}
      {copy.sections.howToTrackInApp && (
        <Box sx={styles.section()}>
          <Typography variant="h5" sx={styles.sectionTitle()}>
            {copy.sections.howToTrackInApp.title}
          </Typography>
          <Typography variant="body1" sx={styles.sectionContent()}>
            {copy.sections.howToTrackInApp.description}
          </Typography>

          {copy.sections.howToTrackInApp.step1 && (
            <Box sx={styles.subsection()}>
              <Typography variant="h6" sx={styles.subsectionTitle()}>
                {copy.sections.howToTrackInApp.step1.title}
              </Typography>
              <Box sx={styles.sectionContent()}>
                {copy.sections.howToTrackInApp.step1.items.map((item, index) => (
                  <Typography key={index} component="p" sx={styles.listItem()}>
                    {item}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}

          {copy.sections.howToTrackInApp.step2 && (
            <Box sx={styles.subsection()}>
              <Typography variant="h6" sx={styles.subsectionTitle()}>
                {copy.sections.howToTrackInApp.step2.title}
              </Typography>
              <Box sx={styles.sectionContent()}>
                {copy.sections.howToTrackInApp.step2.items.map((item, index) => (
                  <Typography key={index} component="p" sx={styles.listItem()}>
                    {item}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}

          {copy.sections.howToTrackInApp.step3 && (
            <Box sx={styles.subsection()}>
              <Typography variant="h6" sx={styles.subsectionTitle()}>
                {copy.sections.howToTrackInApp.step3.title}
              </Typography>
              <Box sx={styles.sectionContent()}>
                {copy.sections.howToTrackInApp.step3.items.map((item, index) => (
                  <Typography key={index} component="p" sx={styles.listItem()}>
                    {item}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}

          {copy.sections.howToTrackInApp.step4 && (
            <Box sx={styles.subsection()}>
              <Typography variant="h6" sx={styles.subsectionTitle()}>
                {copy.sections.howToTrackInApp.step4.title}
              </Typography>
              <Box sx={styles.sectionContent()}>
                {copy.sections.howToTrackInApp.step4.items.map((item, index) => (
                  <Typography key={index} component="p" sx={styles.listItem()}>
                    {item}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}

          {copy.sections.howToTrackInApp.step5 && (
            <Box sx={styles.subsection()}>
              <Typography variant="h6" sx={styles.subsectionTitle()}>
                {copy.sections.howToTrackInApp.step5.title}
              </Typography>
              <Box sx={styles.sectionContent()}>
                {copy.sections.howToTrackInApp.step5.items.map((item, index) => (
                  <Typography key={index} component="p" sx={styles.listItem()}>
                    {item}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}

          {copy.sections.howToTrackInApp.tip && (
            <Box sx={styles.subsection()}>
              <Typography variant="body2" sx={{ ...styles.sectionContent(), fontStyle: 'italic', fontWeight: 500 }}>
                💡 {copy.sections.howToTrackInApp.tip}
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </>
  );
}

