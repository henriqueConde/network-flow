'use client';

import { Box, Typography } from '@mui/material';
import { styles } from '../../strategies-page.styles';
import type { PROOF_OF_WORK_OUTREACH_STRATEGY_CONFIG } from '../../strategies-page.config';
import { StrategyItem, SectionTitle, SubsectionTitle, InfoBox, QuoteBox } from '../strategy-content-elements';

interface ProofOfWorkOutreachStrategyContentProps {
  config: typeof PROOF_OF_WORK_OUTREACH_STRATEGY_CONFIG;
}

export function ProofOfWorkOutreachStrategyContent({ config }: ProofOfWorkOutreachStrategyContentProps) {
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

      {/* Intro */}
      <Box sx={styles.section()}>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.intro}
        </Typography>
        <Box sx={styles.sectionContent()}>
          {copy.introSteps.map((step, index) => (
            <Typography key={index} component="p" sx={styles.listItem()}>
              {step}
            </Typography>
          ))}
        </Box>

        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.worksWellFor.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.worksWellFor.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                • {item}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.layersWithOtherStrategies.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.layersWithOtherStrategies.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                • {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Two Flavors */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.twoFlavors.title}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.twoFlavors.description}
        </Typography>

        {/* Flavor A */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.twoFlavors.flavorA.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.twoFlavors.flavorA.steps.map((step, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                {step}
              </Typography>
            ))}
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.twoFlavors.flavorA.worksGreatOn.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.twoFlavors.flavorA.worksGreatOn.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  • {item}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Flavor B */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.twoFlavors.flavorB.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.twoFlavors.flavorB.steps.map((step, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                {step}
              </Typography>
            ))}
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.twoFlavors.flavorB.worksEspeciallyWellFor.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.twoFlavors.flavorB.worksEspeciallyWellFor.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  • {item}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Bugs & UX Strategy */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.bugsUxStrategy.title}
        </Typography>

        {/* Step 1 */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.bugsUxStrategy.step1.title}
          </Typography>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.bugsUxStrategy.step1.prioritize.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.bugsUxStrategy.step1.prioritize.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Step 2 */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.bugsUxStrategy.step2.title}
          </Typography>
          <Typography variant="body1" sx={styles.sectionContent()}>
            {copy.sections.bugsUxStrategy.step2.goal}
          </Typography>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.bugsUxStrategy.step2.focusFirst.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.bugsUxStrategy.step2.focusFirst.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.bugsUxStrategy.step2.thenIfPossible.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.bugsUxStrategy.step2.thenIfPossible.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.bugsUxStrategy.step2.optionalAdvanced.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.bugsUxStrategy.step2.optionalAdvanced.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  {item}
                </Typography>
              ))}
            </Box>
            <Typography variant="body2" sx={styles.sectionContent()}>
              {copy.sections.bugsUxStrategy.step2.optionalAdvanced.note}
            </Typography>
          </Box>
        </Box>

        {/* Step 3 */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.bugsUxStrategy.step3.title}
          </Typography>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.bugsUxStrategy.step3.forEachIssue.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.bugsUxStrategy.step3.forEachIssue.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.bugsUxStrategy.step3.aimFor.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.bugsUxStrategy.step3.aimFor.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  • {item}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Step 4 */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.bugsUxStrategy.step4.title}
          </Typography>
          <Typography variant="body1" sx={styles.sectionContent()}>
            {copy.sections.bugsUxStrategy.step4.description}
          </Typography>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.bugsUxStrategy.step4.channels.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.bugsUxStrategy.step4.channels.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  • {item}
                </Typography>
              ))}
            </Box>
          </Box>
          <Typography variant="body2" sx={styles.sectionContent()}>
            {copy.sections.bugsUxStrategy.step4.avoid}
          </Typography>
        </Box>

        {/* Step 5 */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.bugsUxStrategy.step5.title}
          </Typography>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.bugsUxStrategy.step5.ifFewIssues.title}
            </Typography>
            <Typography variant="body1" sx={styles.sectionContent()}>
              {copy.sections.bugsUxStrategy.step5.ifFewIssues.content}
            </Typography>
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.bugsUxStrategy.step5.ifLongerList.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.bugsUxStrategy.step5.ifLongerList.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  • {item}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.bugsUxStrategy.step5.optional.title}
            </Typography>
            <Typography variant="body1" sx={styles.sectionContent()}>
              {copy.sections.bugsUxStrategy.step5.optional.content}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Build With Product Strategy */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.buildWithProductStrategy.title}
        </Typography>

        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.buildWithProductStrategy.whenToUse.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.buildWithProductStrategy.whenToUse.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                • {item}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Step 1 */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.buildWithProductStrategy.step1.title}
          </Typography>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.buildWithProductStrategy.step1.choose.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.buildWithProductStrategy.step1.choose.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Step 2 */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.buildWithProductStrategy.step2.title}
          </Typography>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.buildWithProductStrategy.step2.examples.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.buildWithProductStrategy.step2.examples.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.buildWithProductStrategy.step2.guidelines.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.buildWithProductStrategy.step2.guidelines.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Step 3 */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.buildWithProductStrategy.step3.title}
          </Typography>
          <Typography variant="body1" sx={styles.sectionContent()}>
            {copy.sections.buildWithProductStrategy.step3.description}
          </Typography>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.buildWithProductStrategy.step3.loom.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.buildWithProductStrategy.step3.loom.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.buildWithProductStrategy.step3.liveProject.title}
            </Typography>
            <Typography variant="body1" sx={styles.sectionContent()}>
              {copy.sections.buildWithProductStrategy.step3.liveProject.content}
            </Typography>
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.buildWithProductStrategy.step3.github.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.buildWithProductStrategy.step3.github.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Step 4 */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.buildWithProductStrategy.step4.title}
          </Typography>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.buildWithProductStrategy.step4.whereToPost.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.buildWithProductStrategy.step4.whereToPost.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.buildWithProductStrategy.step4.ruleOfThumb.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.buildWithProductStrategy.step4.ruleOfThumb.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  • {item}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Step 5 */}
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.buildWithProductStrategy.step5.title}
          </Typography>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.buildWithProductStrategy.step5.onceYouveShared.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.buildWithProductStrategy.step5.onceYouveShared.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.buildWithProductStrategy.step5.youCanAlsoDm.title}
            </Typography>
            <Box sx={styles.templateBox()}>
              {copy.sections.buildWithProductStrategy.step5.youCanAlsoDm.template}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* When to DM vs Post */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.whenToDmVsPost.title}
        </Typography>

        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.whenToDmVsPost.ifBugs.title}
          </Typography>
          <Typography variant="body1" sx={styles.sectionContent()}>
            {copy.sections.whenToDmVsPost.ifBugs.do}
          </Typography>
          <Typography variant="body1" sx={styles.sectionContent()}>
            {copy.sections.whenToDmVsPost.ifBugs.dont}
          </Typography>
          <Typography variant="body1" sx={styles.sectionContent()}>
            {copy.sections.whenToDmVsPost.ifBugs.attach}
          </Typography>
        </Box>

        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.whenToDmVsPost.ifBuilt.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.whenToDmVsPost.ifBuilt.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>

      {/* How Much Is Enough */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.howMuchIsEnough.title}
        </Typography>

        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.howMuchIsEnough.forBugReports.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.howMuchIsEnough.forBugReports.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.howMuchIsEnough.forProjects.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.howMuchIsEnough.forProjects.items.map((item, index) => (
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

        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.whyItWorks.jobMarket.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.whyItWorks.jobMarket.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                • {item}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.whyItWorks.thisStrategy.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.whyItWorks.thisStrategy.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>

      {/* How to Track in App */}
      {copy.sections.howToTrackInApp && (
        <Box sx={styles.section()}>
          <SectionTitle title={copy.sections.howToTrackInApp.title} icon={copy.sections.howToTrackInApp.icon} />
          <Typography variant="body1" sx={styles.sectionContent()}>
            {copy.sections.howToTrackInApp.description}
          </Typography>

          {copy.sections.howToTrackInApp.step1 && (
            <Box sx={styles.subsection()}>
              <SubsectionTitle 
                title={copy.sections.howToTrackInApp.step1.title} 
                icon={copy.sections.howToTrackInApp.step1.icon}
                link={'link' in copy.sections.howToTrackInApp.step1 ? (copy.sections.howToTrackInApp.step1.link as { text: string; route: string }) : undefined}
              />
              <Box sx={styles.sectionContent()}>
                {copy.sections.howToTrackInApp.step1.items.map((item, index) => (
                  <StrategyItem key={index} item={item} index={index} />
                ))}
              </Box>
            </Box>
          )}

          {copy.sections.howToTrackInApp.step2 && (
            <Box sx={styles.subsection()}>
              <SubsectionTitle 
                title={copy.sections.howToTrackInApp.step2.title} 
                icon={copy.sections.howToTrackInApp.step2.icon}
                link={'link' in copy.sections.howToTrackInApp.step2 ? (copy.sections.howToTrackInApp.step2.link as { text: string; route: string }) : undefined}
              />
              <Box sx={styles.sectionContent()}>
                {copy.sections.howToTrackInApp.step2.items.map((item, index) => (
                  <StrategyItem key={index} item={item} index={index} />
                ))}
              </Box>
            </Box>
          )}

          {copy.sections.howToTrackInApp.step3 && (
            <Box sx={styles.subsection()}>
              <SubsectionTitle 
                title={copy.sections.howToTrackInApp.step3.title} 
                icon={copy.sections.howToTrackInApp.step3.icon}
                link={'link' in copy.sections.howToTrackInApp.step3 ? (copy.sections.howToTrackInApp.step3.link as { text: string; route: string }) : undefined}
              />
              <Box sx={styles.sectionContent()}>
                {copy.sections.howToTrackInApp.step3.items.map((item, index) => (
                  <StrategyItem key={index} item={item} index={index} />
                ))}
              </Box>
            </Box>
          )}

          {copy.sections.howToTrackInApp.step4 && (
            <Box sx={styles.subsection()}>
              <SubsectionTitle 
                title={copy.sections.howToTrackInApp.step4.title} 
                icon={copy.sections.howToTrackInApp.step4.icon}
                link={'link' in copy.sections.howToTrackInApp.step4 ? (copy.sections.howToTrackInApp.step4.link as { text: string; route: string }) : undefined}
              />
              <Box sx={styles.sectionContent()}>
                {copy.sections.howToTrackInApp.step4.items.map((item, index) => (
                  <StrategyItem key={index} item={item} index={index} />
                ))}
              </Box>
            </Box>
          )}

          {copy.sections.howToTrackInApp.step5 && (
            <Box sx={styles.subsection()}>
              <SubsectionTitle 
                title={copy.sections.howToTrackInApp.step5.title} 
                icon={copy.sections.howToTrackInApp.step5.icon}
                link={'link' in copy.sections.howToTrackInApp.step5 ? (copy.sections.howToTrackInApp.step5.link as { text: string; route: string }) : undefined}
              />
              <Box sx={styles.sectionContent()}>
                {copy.sections.howToTrackInApp.step5.items.map((item, index) => (
                  <StrategyItem key={index} item={item} index={index} />
                ))}
              </Box>
            </Box>
          )}

          {copy.sections.howToTrackInApp.step6 && (
            <Box sx={styles.subsection()}>
              <SubsectionTitle 
                title={copy.sections.howToTrackInApp.step6.title} 
                icon={copy.sections.howToTrackInApp.step6.icon}
                link={'link' in copy.sections.howToTrackInApp.step6 ? (copy.sections.howToTrackInApp.step6.link as { text: string; route: string }) : undefined}
              />
              <Box sx={styles.sectionContent()}>
                {copy.sections.howToTrackInApp.step6.items.map((item, index) => (
                  <StrategyItem key={index} item={item} index={index} />
                ))}
              </Box>
            </Box>
          )}

          {copy.sections.howToTrackInApp.tip && (
            <Box sx={styles.subsection()}>
              {typeof copy.sections.howToTrackInApp.tip === 'string' ? (
                <Typography variant="body2" sx={{ ...styles.sectionContent(), fontStyle: 'italic', fontWeight: 500 }}>
                  💡 {copy.sections.howToTrackInApp.tip}
                </Typography>
              ) : (
                <InfoBox 
                  text={copy.sections.howToTrackInApp.tip.text} 
                  type={copy.sections.howToTrackInApp.tip.type}
                  link={copy.sections.howToTrackInApp.tip.link}
                />
              )}
            </Box>
          )}
        </Box>
      )}
    </>
  );
}

