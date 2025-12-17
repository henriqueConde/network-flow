'use client';

import { Box, Typography, Link as MuiLink, Button, Alert } from '@mui/material';
import Link from 'next/link';
import { 
  Lightbulb as LightbulbIcon,
  TrackChanges as TrackChangesIcon,
  PersonAdd as PersonAddIcon,
  Link as LinkIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  Handshake as HandshakeIcon,
  FilterList as FilterListIcon,
  Business as BusinessIcon,
  Assignment as AssignmentIcon,
  WorkOutline as WorkOutlineIcon,
  Category as CategoryIcon,
  BugReport as BugReportIcon,
  Code as CodeIcon,
  Reply as ReplyIcon,
  Email as EmailIcon,
  Videocam as VideocamIcon,
  Schedule as ScheduleIcon,
  ContentPaste as ContentPasteIcon,
  Analytics as AnalyticsIcon,
  Work as WorkIcon,
  Send as SendIcon,
  EmojiEvents as EmojiEventsIcon,
  Summarize as SummarizeIcon,
  Flag as FlagIcon,
  CheckCircle as CheckCircleIcon,
  TipsAndUpdates as TipsAndUpdatesIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import type {
  StrategyItemProps,
  SectionTitleProps,
  SubsectionTitleProps,
  InfoBoxProps,
  QuoteBoxProps,
  GoalBoxProps,
} from './strategy-content-elements.types';
import { styles } from './strategy-content-elements.styles';

const iconMap: Record<string, React.ComponentType<any>> = {
  track_changes: TrackChangesIcon,
  person_add: PersonAddIcon,
  link: LinkIcon,
  chat_bubble_outline: ChatBubbleOutlineIcon,
  handshake: HandshakeIcon,
  filter_list: FilterListIcon,
  business: BusinessIcon,
  assignment: AssignmentIcon,
  work_outline: WorkOutlineIcon,
  category: CategoryIcon,
  bug_report: BugReportIcon,
  code: CodeIcon,
  reply: ReplyIcon,
  email: EmailIcon,
  videocam: VideocamIcon,
  schedule: ScheduleIcon,
  content_paste: ContentPasteIcon,
  analytics: AnalyticsIcon,
  work: WorkIcon,
  send: SendIcon,
  emoji_events: EmojiEventsIcon,
  summarize: SummarizeIcon,
  lightbulb: LightbulbIcon,
  flag: FlagIcon,
  check_circle: CheckCircleIcon,
  tips_and_updates: TipsAndUpdatesIcon,
  trending_up: TrendingUpIcon,
};

export function StrategyItem({ item, index }: StrategyItemProps) {
  if (typeof item === 'string') {
    return (
      <Typography key={index} component="p" sx={styles.strategyItemText()}>
        {item}
      </Typography>
    );
  }

  const { text, link, type } = item;
  const hasLink = !!link;
  const linkHref = typeof link === 'string' ? link : link?.route;
  const linkText = typeof link === 'object' && link ? link.text : undefined;

  if (type === 'highlight') {
    return (
      <Box key={index} sx={styles.highlightBox()}>
        <Alert severity="info" sx={styles.highlightAlert()}>
          <Typography component="span" sx={styles.highlightText()}>
            {text}
          </Typography>
          {hasLink && linkHref && (
            <Box sx={styles.highlightButtonContainer()}>
              <Button
                size="small"
                variant="outlined"
                component={Link}
                href={linkHref}
              >
                {linkText || (typeof link === 'string' && (
                  <>
                    {link.includes('/contacts') && 'Go to Contacts'}
                    {link.includes('/conversations') && 'Go to Conversations'}
                    {link.includes('/companies') && 'Go to Companies'}
                    {link.includes('/opportunities') && 'Go to Opportunities'}
                    {link.includes('/challenges') && 'Go to Challenges'}
                    {link.includes('/pipeline') && 'Go to Pipeline'}
                    {link === '/' && 'Go to Today'}
                  </>
                ))}
              </Button>
            </Box>
          )}
        </Alert>
      </Box>
    );
  }

  if (type === 'stat') {
    return (
      <Box key={index} sx={styles.statBox()}>
        <Typography component="span" sx={styles.statText()}>
          {text}
        </Typography>
      </Box>
    );
  }

  return (
    <Typography key={index} component="p" sx={styles.strategyItemText()}>
      {text}
      {hasLink && linkHref && (
        <MuiLink
          component={Link}
          href={linkHref}
          sx={styles.linkText()}
        >
          →
        </MuiLink>
      )}
    </Typography>
  );
}

export function SectionTitle({ title, icon }: SectionTitleProps) {
  const IconComponent = icon ? iconMap[icon] : null;
  
  return (
    <Box sx={styles.sectionTitleContainer()}>
      {IconComponent && <IconComponent color="primary" />}
      <Typography variant="h5" sx={styles.sectionTitleText()}>
        {title}
      </Typography>
    </Box>
  );
}

export function SubsectionTitle({ title, icon, link }: SubsectionTitleProps) {
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <Box sx={styles.subsectionTitleContainer()}>
      <Box sx={styles.subsectionTitleInner()}>
        {IconComponent && <IconComponent color="primary" fontSize="small" />}
        <Typography variant="h6" sx={styles.subsectionTitleText()}>
          {title}
        </Typography>
      </Box>
      {link && (
        <Button
          size="small"
          variant="outlined"
          component={Link}
          href={link.route}
          sx={styles.subsectionTitleButton()}
        >
          {link.text}
        </Button>
      )}
    </Box>
  );
}

export function InfoBox({ text, type = 'info', icon, link }: InfoBoxProps) {
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <Alert 
      severity={type === 'success' ? 'success' : type === 'warning' ? 'warning' : type === 'error' ? 'error' : 'info'}
      icon={IconComponent ? <IconComponent /> : undefined}
      sx={styles.infoBox()}
    >
      <Typography component="span">{text}</Typography>
      {link && (
        <Box sx={styles.infoBoxLinkContainer()}>
          <Button
            size="small"
            variant="outlined"
            component={Link}
            href={link.route}
          >
            {link.text}
          </Button>
        </Box>
      )}
    </Alert>
  );
}

export function QuoteBox({ text, author }: QuoteBoxProps) {
  return (
    <Box sx={styles.quoteBox()}>
      <Typography variant="body1" sx={styles.quoteText(!!author)}>
        &ldquo;{text}&rdquo;
      </Typography>
      {author && (
        <Typography variant="caption" color="text.secondary" sx={styles.quoteAuthor()}>
          — {author}
        </Typography>
      )}
    </Box>
  );
}

export function GoalBox({ content }: GoalBoxProps) {
  return (
    <Box sx={styles.goalBox()}>
      <Typography variant="body1" sx={styles.goalText()}>
        {content}
      </Typography>
    </Box>
  );
}

