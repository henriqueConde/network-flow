'use client';

import { Box, Typography } from '@mui/material';
import { styles } from '../strategies-page.styles';
import type { LOOM_EMAIL_OUTREACH_STRATEGY_CONFIG } from '../strategies-page.config';

interface LoomEmailOutreachStrategyContentProps {
  config: typeof LOOM_EMAIL_OUTREACH_STRATEGY_CONFIG;
}

export function LoomEmailOutreachStrategyContent({ config }: LoomEmailOutreachStrategyContentProps) {
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
          {copy.description.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              {index < copy.description.split('\n').length - 1 && <br />}
            </span>
          ))}
        </Typography>
      </Box>

      {/* What This Strategy Is */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.whatThisStrategyIs.title}
        </Typography>

        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.whatThisStrategyIs.insteadOf.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.whatThisStrategyIs.insteadOf.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                • {item}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.whatThisStrategyIs.youDo.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.whatThisStrategyIs.youDo.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Why It Works */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.whyItWorks.title}
        </Typography>
        {copy.sections.whyItWorks.reasons.map((reason, index) => (
          <Box key={index} sx={styles.subsection()}>
            <Typography variant="h6" sx={styles.subsectionTitle()}>
              {reason.title}
            </Typography>
            <Typography variant="body1" sx={styles.sectionContent()}>
              {reason.content.split('\n').map((line, lineIndex) => (
                <span key={lineIndex}>
                  {line}
                  {lineIndex < reason.content.split('\n').length - 1 && <br />}
                </span>
              ))}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Step-by-step */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.stepByStep.title}
        </Typography>

        {/* Step 1 */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.stepByStep.step1.title}
          </Typography>
          <Typography variant="body1" sx={styles.sectionContent()}>
            {copy.sections.stepByStep.step1.description}
          </Typography>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.stepByStep.step1.narrowDown.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.stepByStep.step1.narrowDown.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  • {item}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.stepByStep.step1.fromList.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.stepByStep.step1.fromList.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  • {item}
                </Typography>
              ))}
            </Box>
          </Box>
          <Typography variant="body1" sx={styles.sectionContent()}>
            {copy.sections.stepByStep.step1.note.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < copy.sections.stepByStep.step1.note.split('\n').length - 1 && <br />}
              </span>
            ))}
          </Typography>
        </Box>

        {/* Step 2 */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.stepByStep.step2.title}
          </Typography>
          <Typography variant="body1" sx={styles.sectionContent()}>
            {copy.sections.stepByStep.step2.description}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.stepByStep.step2.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Step 3 */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.stepByStep.step3.title}
          </Typography>
          <Typography variant="body1" sx={styles.sectionContent()}>
            {copy.sections.stepByStep.step3.description}
          </Typography>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.stepByStep.step3.smallCompanies.title}
            </Typography>
            <Typography variant="body1" sx={styles.sectionContent()}>
              {copy.sections.stepByStep.step3.smallCompanies.content}
            </Typography>
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.stepByStep.step3.mediumCompanies.title}
            </Typography>
            <Typography variant="body1" sx={styles.sectionContent()}>
              {copy.sections.stepByStep.step3.mediumCompanies.content}
            </Typography>
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.stepByStep.step3.largerCompanies.title}
            </Typography>
            <Typography variant="body1" sx={styles.sectionContent()}>
              {copy.sections.stepByStep.step3.largerCompanies.content.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < copy.sections.stepByStep.step3.largerCompanies.content.split('\n').length - 1 && <br />}
                </span>
              ))}
            </Typography>
          </Box>
          <Typography variant="body1" sx={styles.sectionContent()}>
            {copy.sections.stepByStep.step3.note}
          </Typography>
        </Box>

        {/* Step 4 */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.stepByStep.step4.title}
          </Typography>
          <Typography variant="body1" sx={styles.sectionContent()}>
            {copy.sections.stepByStep.step4.description}
          </Typography>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.stepByStep.step4.structure.title}
            </Typography>
            <Box sx={styles.subsection()}>
              <Typography variant="subtitle2" sx={styles.subsectionTitle()}>
                {copy.sections.stepByStep.step4.structure.whoYouAre.title}
              </Typography>
              <Typography variant="body2" sx={styles.sectionContent()}>
                {copy.sections.stepByStep.step4.structure.whoYouAre.description}
              </Typography>
              <Box sx={styles.templateBox()}>
                {copy.sections.stepByStep.step4.structure.whoYouAre.example}
              </Box>
            </Box>
            <Box sx={styles.subsection()}>
              <Typography variant="subtitle2" sx={styles.subsectionTitle()}>
                {copy.sections.stepByStep.step4.structure.connectionPoint.title}
              </Typography>
              <Typography variant="body2" sx={styles.sectionContent()}>
                {copy.sections.stepByStep.step4.structure.connectionPoint.description}
              </Typography>
              <Box sx={styles.sectionContent()}>
                {copy.sections.stepByStep.step4.structure.connectionPoint.items.map((item, index) => (
                  <Typography key={index} component="p" sx={styles.listItem()}>
                    • {item}
                  </Typography>
                ))}
              </Box>
              <Box sx={styles.templateBox()}>
                {copy.sections.stepByStep.step4.structure.connectionPoint.example}
              </Box>
            </Box>
            <Box sx={styles.subsection()}>
              <Typography variant="subtitle2" sx={styles.subsectionTitle()}>
                {copy.sections.stepByStep.step4.structure.clearAsk.title}
              </Typography>
              <Typography variant="body2" sx={styles.sectionContent()}>
                {copy.sections.stepByStep.step4.structure.clearAsk.description}
              </Typography>
              <Box sx={styles.templateBox()}>
                {copy.sections.stepByStep.step4.structure.clearAsk.example}
              </Box>
            </Box>
            <Box sx={styles.subsection()}>
              <Typography variant="subtitle2" sx={styles.subsectionTitle()}>
                {copy.sections.stepByStep.step4.structure.optionalLinks.title}
              </Typography>
              <Typography variant="body2" sx={styles.sectionContent()}>
                {copy.sections.stepByStep.step4.structure.optionalLinks.description}
              </Typography>
              <Box sx={styles.sectionContent()}>
                {copy.sections.stepByStep.step4.structure.optionalLinks.items.map((item, index) => (
                  <Typography key={index} component="p" sx={styles.listItem()}>
                    • {item}
                  </Typography>
                ))}
              </Box>
            </Box>
            <Typography variant="body2" sx={styles.sectionContent()}>
              {copy.sections.stepByStep.step4.structure.note}
            </Typography>
          </Box>
        </Box>

        {/* Step 5 */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.stepByStep.step5.title}
          </Typography>
          <Typography variant="body1" sx={styles.sectionContent()}>
            {copy.sections.stepByStep.step5.description}
          </Typography>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.stepByStep.step5.whatIsLoom.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.stepByStep.step5.whatIsLoom.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  • {item}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.stepByStep.step5.outline.title}
            </Typography>
            <Box sx={styles.subsection()}>
              <Typography variant="subtitle2" sx={styles.subsectionTitle()}>
                {copy.sections.stepByStep.step5.outline.intro.title}
              </Typography>
              <Box sx={styles.sectionContent()}>
                {copy.sections.stepByStep.step5.outline.intro.items.map((item, index) => (
                  <Typography key={index} component="p" sx={styles.listItem()}>
                    {item}
                  </Typography>
                ))}
              </Box>
            </Box>
            <Box sx={styles.subsection()}>
              <Typography variant="subtitle2" sx={styles.subsectionTitle()}>
                {copy.sections.stepByStep.step5.outline.showProjects.title}
              </Typography>
              <Box sx={styles.sectionContent()}>
                {copy.sections.stepByStep.step5.outline.showProjects.items.map((item, index) => (
                  <Typography key={index} component="p" sx={styles.listItem()}>
                    {item}
                  </Typography>
                ))}
              </Box>
            </Box>
            <Box sx={styles.subsection()}>
              <Typography variant="subtitle2" sx={styles.subsectionTitle()}>
                {copy.sections.stepByStep.step5.outline.shareIdeas.title}
              </Typography>
              <Box sx={styles.sectionContent()}>
                {copy.sections.stepByStep.step5.outline.shareIdeas.items.map((item, index) => (
                  <Typography key={index} component="p" sx={styles.listItem()}>
                    {item}
                  </Typography>
                ))}
              </Box>
            </Box>
            <Box sx={styles.subsection()}>
              <Typography variant="subtitle2" sx={styles.subsectionTitle()}>
                {copy.sections.stepByStep.step5.outline.clearCta.title}
              </Typography>
              <Box sx={styles.templateBox()}>
                {copy.sections.stepByStep.step5.outline.clearCta.example}
              </Box>
            </Box>
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.stepByStep.step5.whyLoomWorks.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.stepByStep.step5.whyLoomWorks.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  • {item}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Step 6 */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.stepByStep.step6.title}
          </Typography>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.stepByStep.step6.timing.title}
            </Typography>
            <Typography variant="body1" sx={styles.sectionContent()}>
              {copy.sections.stepByStep.step6.timing.bestDays}
            </Typography>
            <Typography variant="body1" sx={styles.sectionContent()}>
              {copy.sections.stepByStep.step6.timing.bestTime}
            </Typography>
            <Box sx={styles.subsection()}>
              <Typography variant="subtitle2" sx={styles.subsectionTitle()}>
                {copy.sections.stepByStep.step6.timing.avoid.title}
              </Typography>
              <Box sx={styles.sectionContent()}>
                {copy.sections.stepByStep.step6.timing.avoid.items.map((item, index) => (
                  <Typography key={index} component="p" sx={styles.listItem()}>
                    • {item}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.stepByStep.step6.followUps.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.stepByStep.step6.followUps.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Tracking */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.tracking.title}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.tracking.description}
        </Typography>
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.tracking.forEachEmail.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.tracking.forEachEmail.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                • {item}
              </Typography>
            ))}
          </Box>
        </Box>
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.tracking.thenYouCanSee.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.tracking.thenYouCanSee.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                • {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>

      {/* How It Fits */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.howItFits.title}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.howItFits.description}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.howItFits.strategy}
        </Typography>
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.howItFits.worksBestWith.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.howItFits.worksBestWith.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                • {item}
              </Typography>
            ))}
          </Box>
        </Box>
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.howItFits.pipelineIdea.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.howItFits.pipelineIdea.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

