'use client';

import { Box, Typography } from '@mui/material';
import { styles } from '../../strategies-page.styles';
import type { LOOM_EMAIL_OUTREACH_STRATEGY_CONFIG } from '../../strategies-page.config';
import { StrategyItem, SectionTitle, SubsectionTitle, InfoBox, QuoteBox } from '../strategy-content-elements';

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
          {typeof copy.description === 'string' ? copy.description.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              {index < copy.description.split('\n').length - 1 && <br />}
            </span>
          )) : copy.description}
        </Typography>
        {copy.note && typeof copy.note === 'object' && (
          <InfoBox 
            text={copy.note.text} 
            type={copy.note.type}
            icon={copy.note.icon}
          />
        )}
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
              {String(reason.content).split('\n').map((line, lineIndex, lines) => (
                <span key={lineIndex}>
                  {line}
                  {lineIndex < lines.length - 1 && <br />}
                </span>
              ))}
            </Typography>
            {'quote' in reason && reason.quote && (
              <QuoteBox text={reason.quote.text} author={reason.quote.author} />
            )}
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

