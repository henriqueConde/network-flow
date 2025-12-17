/**
 * UI state hook for analytics formatting utilities.
 * Component-level hook for local UI formatting only (no I/O).
 */
export function useAnalyticsFormatters() {
  const formatResponseHours = (hours: number | null): string => {
    if (hours === null) return 'N/A';
    if (hours < 24) return `${hours.toFixed(1)}h`;
    return `${(hours / 24).toFixed(1)}d`;
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return {
    formatResponseHours,
    formatDate,
  };
}



