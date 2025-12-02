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

