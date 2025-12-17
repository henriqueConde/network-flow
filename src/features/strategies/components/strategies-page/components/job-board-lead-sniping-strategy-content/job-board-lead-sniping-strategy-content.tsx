'use client';

import { Box, Typography } from '@mui/material';
import { styles } from '../../strategies-page.styles';
import type { JOB_BOARD_LEAD_SNIPING_STRATEGY_CONFIG } from '../../strategies-page.config';
import { StrategyItem, SectionTitle, SubsectionTitle, InfoBox } from '../strategy-content-elements';

interface JobBoardLeadSnipingStrategyContentProps {
  config: typeof JOB_BOARD_LEAD_SNIPING_STRATEGY_CONFIG;
}

export function JobBoardLeadSnipingStrategyContent({ config }: JobBoardLeadSnipingStrategyContentProps) {
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
          <Typography variant="body1" sx={styles.sectionContent()}>
            {copy.sections.whatThisStrategyIs.insteadOf.content}
          </Typography>
        </Box>

        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.whatThisStrategyIs.youDo.title}
          </Typography>
          <Typography variant="body1" sx={styles.sectionContent()}>
            {copy.sections.whatThisStrategyIs.youDo.description}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.whatThisStrategyIs.youDo.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                • {item}
              </Typography>
            ))}
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.whatThisStrategyIs.youDo.treatAsLeads.title}
            </Typography>
            <Typography variant="body1" sx={styles.sectionContent()}>
              {copy.sections.whatThisStrategyIs.youDo.treatAsLeads.description}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.whatThisStrategyIs.youDo.treatAsLeads.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
          <Typography variant="body1" sx={styles.sectionContent()}>
            {copy.sections.whatThisStrategyIs.youDo.note.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < copy.sections.whatThisStrategyIs.youDo.note.split('\n').length - 1 && <br />}
              </span>
            ))}
          </Typography>
        </Box>
      </Box>

      {/* Why This Works */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.whyThisWorks.title}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.whyThisWorks.description}
        </Typography>
        <Box sx={styles.subsection()}>
          <Box sx={styles.sectionContent()}>
            {copy.sections.whyThisWorks.competition.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                • {item}
              </Typography>
            ))}
          </Box>
        </Box>
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.whyThisWorks.youImproveOdds.title}
          </Typography>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.whyThisWorks.youImproveOdds.beingEarly.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.whyThisWorks.youImproveOdds.beingEarly.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.whyThisWorks.youImproveOdds.notJustCv.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.whyThisWorks.youImproveOdds.notJustCv.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.whyThisWorks.note}
        </Typography>
      </Box>

      {/* Method 1 */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.method1.title}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.method1.goal}
        </Typography>
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.method1.steps.title}
          </Typography>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.method1.steps.step1.title}
            </Typography>
            <Typography variant="body1" sx={styles.sectionContent()}>
              {copy.sections.method1.steps.step1.description}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.method1.steps.step1.examples.map((example, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  • {example}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.method1.steps.step2.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.method1.steps.step2.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  • {item}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.method1.steps.step3.title}
            </Typography>
            <Box sx={styles.subsection()}>
              <Typography variant="subtitle2" sx={styles.subsectionTitle()}>
                {copy.sections.method1.steps.step3.ignore.title}
              </Typography>
              <Box sx={styles.sectionContent()}>
                {copy.sections.method1.steps.step3.ignore.items.map((item, index) => (
                  <Typography key={index} component="p" sx={styles.listItem()}>
                  • {item}
                  </Typography>
                ))}
              </Box>
            </Box>
            <Box sx={styles.subsection()}>
              <Typography variant="subtitle2" sx={styles.subsectionTitle()}>
                {copy.sections.method1.steps.step3.lookFor.title}
              </Typography>
              <Box sx={styles.sectionContent()}>
                {copy.sections.method1.steps.step3.lookFor.items.map((item, index) => (
                  <Typography key={index} component="p" sx={styles.listItem()}>
                  • {item}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.method1.steps.step4.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.method1.steps.step4.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.method1.benefits.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.method1.benefits.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                • {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Method 2 */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.method2.title}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.method2.goal}
        </Typography>
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.method2.steps.title}
          </Typography>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.method2.steps.step1.title}
            </Typography>
            <Typography variant="body1" sx={styles.sectionContent()}>
              {copy.sections.method2.steps.step1.description}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.method2.steps.step1.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  • {item}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.method2.steps.step2.title}
            </Typography>
            <Typography variant="body1" sx={styles.sectionContent()}>
              {copy.sections.method2.steps.step2.description}
            </Typography>
            <Box sx={styles.templateBox()}>
              {copy.sections.method2.steps.step2.example}
            </Box>
            <Typography variant="body1" sx={styles.sectionContent()}>
              {copy.sections.method2.steps.step2.explanation}
            </Typography>
            <Box sx={styles.subsection()}>
              <Typography variant="subtitle2" sx={styles.subsectionTitle()}>
                {copy.sections.method2.steps.step2.changeNumber.title}
              </Typography>
              <Box sx={styles.sectionContent()}>
                {copy.sections.method2.steps.step2.changeNumber.examples.map((example, index) => (
                  <Typography key={index} component="p" sx={styles.listItem()}>
                    • {example}
                  </Typography>
                ))}
              </Box>
            </Box>
            <Typography variant="body1" sx={styles.sectionContent()}>
              {copy.sections.method2.steps.step2.note.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < copy.sections.method2.steps.step2.note.split('\n').length - 1 && <br />}
                </span>
              ))}
            </Typography>
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.method2.steps.step3.title}
            </Typography>
            <Box sx={styles.sectionContent()}>
              {copy.sections.method2.steps.step3.items.map((item, index) => (
                <Typography key={index} component="p" sx={styles.listItem()}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box sx={styles.subsection()}>
            <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
              {copy.sections.method2.steps.step4.title}
            </Typography>
            <Box sx={styles.subsection()}>
              <Typography variant="subtitle2" sx={styles.subsectionTitle()}>
                {copy.sections.method2.steps.step4.stepA.title}
              </Typography>
              <Typography variant="body1" sx={styles.sectionContent()}>
                {copy.sections.method2.steps.step4.stepA.content}
              </Typography>
            </Box>
            <Box sx={styles.subsection()}>
              <Typography variant="subtitle2" sx={styles.subsectionTitle()}>
                {copy.sections.method2.steps.step4.stepB.title}
              </Typography>
              <Typography variant="body1" sx={styles.sectionContent()}>
                {copy.sections.method2.steps.step4.stepB.description}
              </Typography>
              <Box sx={styles.sectionContent()}>
                {copy.sections.method2.steps.step4.stepB.items.map((item, index) => (
                  <Typography key={index} component="p" sx={styles.listItem()}>
                    {item}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.method2.conclusion}
        </Typography>
      </Box>

      {/* How To Track */}
      <Box sx={styles.section()}>
        <Typography variant="h5" sx={styles.sectionTitle()}>
          {copy.sections.howToTrack.title}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.howToTrack.description}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.howToTrack.strategyName}
        </Typography>
        <Typography variant="body1" sx={styles.sectionContent()}>
          {copy.sections.howToTrack.type}
        </Typography>
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.howToTrack.forEachLead.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.howToTrack.forEachLead.items.map((item, index) => (
              <Typography key={index} component="p" sx={styles.listItem()}>
                • {item}
              </Typography>
            ))}
          </Box>
        </Box>
        <Box sx={styles.subsection()}>
          <Typography variant="h6" sx={styles.subsectionTitle()}>
            {copy.sections.howToTrack.yourAppCanShow.title}
          </Typography>
          <Box sx={styles.sectionContent()}>
            {copy.sections.howToTrack.yourAppCanShow.items.map((item, index) => (
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
          <SectionTitle title={copy.sections.howToTrackInApp.title} icon={copy.sections.howToTrackInApp.icon} />
          <Typography variant="body1" sx={styles.sectionContent()}>
            {copy.sections.howToTrackInApp.description}
          </Typography>

          {copy.sections.howToTrackInApp.step1 && (
            <Box sx={styles.subsection()}>
              <SubsectionTitle 
                title={copy.sections.howToTrackInApp.step1.title} 
                icon={copy.sections.howToTrackInApp.step1.icon}
                link={undefined}
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
                />
              )}
            </Box>
          )}
        </Box>
      )}
    </>
  );
}

