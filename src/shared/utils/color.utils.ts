/**
 * Converts a hex color to RGBA format.
 * @param hex - Hex color string (with or without #)
 * @param alpha - Alpha value between 0 and 1
 * @returns RGBA color string (e.g., "rgba(30, 41, 59, 0.3)")
 */
export function hexToRgba(hex: string, alpha: number): string {
  // Remove # if present
  const cleanHex = hex.replace('#', '');

  // Parse hex values
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  // Validate alpha
  const validAlpha = Math.max(0, Math.min(1, alpha));

  return `rgba(${r}, ${g}, ${b}, ${validAlpha})`;
}

/**
 * Predefined palette of colors that work well for dark themes.
 * Colors are chosen to be distinct and have good contrast with dark backgrounds.
 */
const CONTACT_COLOR_PALETTE = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#F97316', // Orange
  '#84CC16', // Lime
  '#6366F1', // Indigo
  '#14B8A6', // Teal
  '#F43F5E', // Rose
];

/**
 * Generates a consistent color for a contact based on their ID.
 * Uses a simple hash function to map contact IDs to colors from a predefined palette.
 * @param contactId - The contact's unique identifier
 * @returns A hex color string
 */
export function getContactColor(contactId: string): string {
  // Simple hash function to convert string to number
  let hash = 0;
  for (let i = 0; i < contactId.length; i++) {
    const char = contactId.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Use absolute value and modulo to get index
  const index = Math.abs(hash) % CONTACT_COLOR_PALETTE.length;
  return CONTACT_COLOR_PALETTE[index];
}

/**
 * Darkens a color by mixing it with black for better contrast with white text.
 * @param hex - Hex color string (with or without #)
 * @param factor - Darkening factor (0-1), where 0 = no change, 1 = black
 * @returns A hex color string
 */
export function darkenColor(hex: string, factor: number): string {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  
  // Darken by interpolating towards black (0)
  const newR = Math.round(r * (1 - factor));
  const newG = Math.round(g * (1 - factor));
  const newB = Math.round(b * (1 - factor));
  
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

