'use client';

import { Box, Typography } from '@mui/material';
import { styles } from '../strategies-page.styles';
import type { THE_100_CONNECTION_WEEK_STRATEGY_CONFIG } from '../strategies-page.config';

interface The100ConnectionWeekStrategyContentProps {
  config: typeof THE_100_CONNECTION_WEEK_STRATEGY_CONFIG;
}

export function The100ConnectionWeekStrategyContent({ config }: The100ConnectionWeekStrategyContentProps) {
  const { copy } = config;

  return (
    <>
      <Box sx={styles.strategyHeader()}>
        <Typography variant="h4" sx={styles.mainStrategyTitle()}>
          {copy.title}
        </Typography>
        <Typography variant="h6" sx={styles.strategySubtitle()}>
          {copy.subtitle}
        </Typography>
        <Typography variant="body1" sx={styles.strategySubtitle()}>
          {copy.description}
        </Typography>
      </Box>

      {/* Top of Funnel */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.topOfFunnel.title}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.topOfFunnel.description}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.topOfFunnel.note}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.topOfFunnel.commitment}
        </Typography>
        <Box sx={styles.sectionContent()}>
          {copy.sections.topOfFunnel.requirements.map((item, index) => (
            <Typography key={index} component="p" sx={styles.listItem()}>
              • {item}
            </Typography>
          ))}
        </Box>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.topOfFunnel.linkedInLimit}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.topOfFunnel.mindset}
        </Typography>
      </Box>

      {/* Conversion 1 */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.conversion1.title}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.conversion1.description}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.conversion1.conservativeNumbers}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.conversion1.acceptRate}
        </Typography>
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.conversion1.whatYouGet.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.conversion1.whatYouGet.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Conversion 2 */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.conversion2.title}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.conversion2.description}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.conversion2.conservativeAgain}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.conversion2.replyRate}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.conversion2.result}
        </Typography>
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.conversion2.whatThisMeans.title}
          </Typography>
          <Typography variant="body1" sx={styles.sectionContent()}>
            {copy.sections.conversion2.whatThisMeans.description}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.conversion2.whatThisMeans.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                • {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Conversion 3 */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.conversion3.title}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.conversion3.description}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.conversion3.lowEstimate}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.conversion3.interviewRate}
        </Typography>
        <Box sx={styles.sectionContent()}>
          {copy.sections.conversion3.interviewTypes.map((type, index) => (
            <Typography key={index} component="p" sx={styles.listItem()}>
              • {type}
            </Typography>
          ))}
        </Box>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.conversion3.whatTheseAre}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.conversion3.whyItMatters}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.conversion3.summary.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              {index < copy.sections.conversion3.summary.split('\n').length - 1 && <br />}
            </span>
          ))}
        </Typography>
      </Box>

      {/* Endgame */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.endgame.title}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.endgame.description}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.endgame.goal}
        </Typography>
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.endgame.ifThatOffer.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.endgame.ifThatOffer.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                • {item}
              </Typography>
            ))}
          </Box>
        </Box>
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.endgame.impact.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.endgame.impact.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                • {item}
              </Typography>
            ))}
          </Box>
        </Box>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.endgame.conclusion}
        </Typography>
      </Box>

      {/* The Challenge */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.theChallenge.title}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.theChallenge.description}
        </Typography>
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.theChallenge.pickWeek.title}
          </Typography>
          <Typography variant="body1" sx={styles.sectionContent()}>
            {copy.sections.theChallenge.pickWeek.note}
          </Typography>
        </Box>
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.theChallenge.setGoal.title}
          </Typography>
          <Box sx={styles.templateBox()}>
            {copy.sections.theChallenge.setGoal.goal}
          </Box>
        </Box>
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.theChallenge.prepare.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.theChallenge.prepare.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                • {item}
              </Typography>
            ))}
          </Box>
        </Box>
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.theChallenge.duringWeek.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.theChallenge.duringWeek.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.theChallenge.afterWeek.title}
          </Typography>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.theChallenge.afterWeek.doRecap.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.theChallenge.afterWeek.doRecap.questions.map((question, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  • {question}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.theChallenge.afterWeek.adjust.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.theChallenge.afterWeek.adjust.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  • {item}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.theChallenge.communityWrap.title}
          </Typography>
          <Box sx={styles.templateBox()}>
            {copy.sections.theChallenge.communityWrap.content.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < copy.sections.theChallenge.communityWrap.content.split('\n').length - 1 && <br />}
              </span>
            ))}
          </Box>
        </Box>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.theChallenge.finalNote.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              {index < copy.sections.theChallenge.finalNote.split('\n').length - 1 && <br />}
            </span>
          ))}
        </Typography>
      </Box>
    </>
  );
}

