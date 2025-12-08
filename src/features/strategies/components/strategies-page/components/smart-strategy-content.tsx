'use client';

import { Box, Typography } from '@mui/material';
import { styles } from '../strategies-page.styles';
import type { SMART_STRATEGY_CONFIG } from '../strategies-page.config';

interface SmartStrategyContentProps {
  config: typeof SMART_STRATEGY_CONFIG;
}

export function SmartStrategyContent({ config }: SmartStrategyContentProps) {
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

      {/* Core Idea */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.coreIdea.title}
        </Typography>
        <Box sx={styles.sectionContent()}>
          {copy.sections.coreIdea.content.map((item, index) => (
            <Typography key={index} component="p" sx={styles.listItem()}>
              {item}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Warm Referrals */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.warmReferrals.title}
        </Typography>

        {/* Steps */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.warmReferrals.steps.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.warmReferrals.steps.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Templates */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.warmReferrals.templates.title}
          </Typography>

          {/* Well Known Template */}
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.warmReferrals.templates.wellKnown.title}
            </Typography>
            <Box sx={styles.templateBox()}>
              {copy.sections.warmReferrals.templates.wellKnown.content}
            </Box>
          </Box>

          {/* Loose Connection Template */}
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.warmReferrals.templates.looseConnection.title}
            </Typography>
            <Box sx={styles.templateBox()}>
              {copy.sections.warmReferrals.templates.looseConnection.content}
            </Box>
          </Box>

          {/* Follow-ups */}
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.warmReferrals.templates.followUps.title}
            </Typography>
            {copy.sections.warmReferrals.templates.followUps.items.map((followUp, index) => (
              <Box key={index} sx={styles.subsection()}>
                <Typography variant="subtitle2" sx={styles.subsectionTitle()}>
                  {followUp.title}
                </Typography>
                <Box sx={styles.templateBox()}>
                  {followUp.content}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Cold Referrals */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.coldReferrals.title}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.coldReferrals.description}
        </Typography>

        {/* Choose Targets */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.coldReferrals.chooseTargets.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.coldReferrals.chooseTargets.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Find Connection Points */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.coldReferrals.findConnectionPoints.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.coldReferrals.findConnectionPoints.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Make Profile Referral-Worthy */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.coldReferrals.makeProfileReferralWorthy.title}
          </Typography>

          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.coldReferrals.makeProfileReferralWorthy.beforeReachingOut.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.coldReferrals.makeProfileReferralWorthy.beforeReachingOut.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>

          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.coldReferrals.makeProfileReferralWorthy.assume.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.coldReferrals.makeProfileReferralWorthy.assume.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Connection Request */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.coldReferrals.connectionRequest.title}
          </Typography>
          <Typography variant="body2" sx={styles.sectionContent()}>
            {copy.sections.coldReferrals.connectionRequest.goal}
          </Typography>
          <Box sx={styles.templateBox()}>
            {copy.sections.coldReferrals.connectionRequest.template}
          </Box>
        </Box>

        {/* Ask for Referral */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.coldReferrals.askForReferral.title}
          </Typography>
          <Box sx={styles.templateBox()}>
            {copy.sections.coldReferrals.askForReferral.template}
          </Box>

          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.coldReferrals.askForReferral.ifYes.title}
            </Typography>
            <Box sx={styles.templateBox()}>
              {copy.sections.coldReferrals.askForReferral.ifYes.content}
            </Box>
          </Box>

          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.coldReferrals.askForReferral.ifNo.title}
            </Typography>
            <Box sx={styles.templateBox()}>
              {copy.sections.coldReferrals.askForReferral.ifNo.content}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Daily Routine */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.dailyRoutine.title}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.dailyRoutine.description}
        </Typography>
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.dailyRoutine.everyDay.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.dailyRoutine.everyDay.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Spreadsheet Structure */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.spreadsheetStructure.title}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.spreadsheetStructure.description}
        </Typography>
        <Box sx={styles.sectionContent()}>
          {copy.sections.spreadsheetStructure.columns.map((column, index) => (
            <Typography key={index} component="p" sx={styles.listItem()}>
              • {column}
            </Typography>
          ))}
        </Box>
        <Typography variant="body2" sx={styles.sectionContent()}>
          {copy.sections.spreadsheetStructure.note}
        </Typography>
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

