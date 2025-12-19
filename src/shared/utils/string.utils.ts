/**
 * Utility functions for string transformations.
 * Shared across features for consistent formatting.
 */

/**
 * Formats a snake_case or kebab-case string to Title Case.
 * Example: "proof_of_work_bugs" -> "Proof Of Work Bugs"
 * Example: "email-status" -> "Email Status"
 */
export function formatEnumToTitleCase(str: string | null | undefined): string {
  if (!str) return '';
  return str
    .replace(/[_-]/g, ' ') // Replace underscores and hyphens with spaces
    .replace(/\b\w/g, (l) => l.toUpperCase()); // Capitalize first letter of each word
}

