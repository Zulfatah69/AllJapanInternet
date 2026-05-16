/**
 * Apply theme to the website
 * @param {Object} theme - {name, primary_color, secondary_color, accent_color}
 */
export const applyTheme = (theme) => {
  if (!theme) return;

  const root = document.documentElement;

  // Set CSS variables for theme colors
  if (theme.primary_color) {
    root.style.setProperty('--color-primary', theme.primary_color);
  }

  if (theme.secondary_color) {
    root.style.setProperty('--color-secondary', theme.secondary_color);
  }

  if (theme.accent_color) {
    root.style.setProperty('--color-accent', theme.accent_color);
  }

  // Add theme class for seasonal styling
  document.body.classList.remove('theme-spring', 'theme-summer', 'theme-autumn', 'theme-winter');
  if (theme.name) {
    document.body.classList.add(`theme-${theme.name}`);
  }

  // Store in localStorage
  localStorage.setItem('appTheme', JSON.stringify(theme));
};

/**
 * Get current theme
 * @returns {Object|null}
 */
export const getStoredTheme = () => {
  const stored = localStorage.getItem('appTheme');
  return stored ? JSON.parse(stored) : null;
};

/**
 * Reset theme to default
 */
export const resetTheme = () => {
  const root = document.documentElement;
  root.style.removeProperty('--color-primary');
  root.style.removeProperty('--color-secondary');
  root.style.removeProperty('--color-accent');
  document.body.classList.remove('theme-spring', 'theme-summer', 'theme-autumn', 'theme-winter');
  localStorage.removeItem('appTheme');
};
