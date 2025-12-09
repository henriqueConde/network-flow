export interface StrategyItemProps {
  item: string | { text: string; link?: string | { text: string; route: string }; type?: string };
  index: number;
}

export interface SectionTitleProps {
  title: string;
  icon?: string;
}

export interface SubsectionTitleProps {
  title: string;
  icon?: string;
  link?: { text: string; route: string };
}

export interface InfoBoxProps {
  text: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  icon?: string;
  link?: { text: string; route: string };
}

export interface QuoteBoxProps {
  text: string;
  author?: string;
}

export interface GoalBoxProps {
  content: string;
}

