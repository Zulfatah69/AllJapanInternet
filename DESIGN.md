---
name: AllJapanInternet
description: Reliable internet packages with a dynamic seasonal experience.
colors:
  background: "var(--background)"
  foreground: "var(--foreground)"
  theme-primary: "var(--theme-primary)"
  theme-primary-hover: "var(--theme-primary-hover)"
  theme-secondary: "var(--theme-secondary)"
  theme-muted: "var(--theme-muted)"
  theme-glow: "var(--theme-glow)"
  theme-accent-soft: "var(--theme-accent-soft)"
  theme-section: "var(--theme-section)"
  theme-footer: "var(--theme-footer)"
typography:
  body:
    fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif"
components:
  button-primary:
    backgroundColor: "{colors.theme-primary}"
    textColor: "{colors.background}"
---

# Design System: AllJapanInternet

## 1. Overview

**Creative North Star: "The Seasonal Guide"**

The AllJapanInternet design system is dynamic, adapting, and clear. It embraces the beauty of Japan's four seasons by dynamically shifting its overarching visual theme (Winter, Spring, Summer, Autumn) while maintaining a strict, reliable structural foundation. The aesthetic philosophy balances the professional need for clear eCommerce workflows with an immersive, localized feel that customers trust.

It explicitly rejects cluttered or overly colorful marketing pages and generic SaaS templates.

**Key Characteristics:**
- **Dynamic Themes:** Four distinct seasonal palettes that shift the mood.
- **Reliable Structure:** The layout and components remain consistent regardless of the season.
- **Tactile Elements:** Components feel interactive, grounded, and clear.

## 2. Colors

Four distinct seasonal palettes that shift the mood while keeping structure consistent. The base tokens adapt automatically via CSS data attributes (e.g., `data-theme="winter"`).

### Dynamic Tokens
- **Background** (`var(--background)`): The page surface color, adapting per season (e.g., icy white, soft pink).
- **Foreground** (`var(--foreground)`): Text and primary shapes, adapting to contrast safely against the background.
- **Primary** (`var(--theme-primary)`): The main brand and action color (Winter: Blue, Spring: Pink, Summer: Yellow, Autumn: Orange).
- **Secondary** (`var(--theme-secondary)`): Accent and highlight colors.
- **Muted** (`var(--theme-muted)`): Subdued text and inactive elements.

## 3. Typography

The typographic hierarchy prioritizes clarity for transactions while maintaining a modern feel.

- **Body:** `var(--font-sans), ui-sans-serif, system-ui, sans-serif`

## 4. Elevation

**Philosophy: Tactile and confident.**

Elements should feel tangible. Clear borders and distinct shadows are used to separate cards, modals, and dropdowns from the page surface. Seasonal glows (`--theme-glow`) may accent primary actions or hovered items without sacrificing structural clarity.

## 5. Components

Components are designed to be tactile, confident, and highly visible, ensuring users know exactly what actions are available.

- **Primary Button:** Uses `--theme-primary` for background and `--background` for text, providing high contrast and clear affordance.

## 6. Do's and Don'ts

### Do
- Ensure contrast ratios are maintained in every seasonal theme.
- Use `--theme-primary` for the most important actions on the page.
- Rely on structural consistency so users don't have to re-learn the interface when the season changes.

### Don't
- Mix seasonal color tokens manually; always rely on the CSS variables.
- Overcomplicate the UI with unnecessary cards or generic SaaS templates.
- Use low-contrast text, especially in "softer" seasonal modes like Spring or Summer.
