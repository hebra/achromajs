# Design System Specification: AchromaJS Browser Extension

## 1. Overview & Creative North Star
The Creative North Star for the AchromaJS design system is **"The Luminous Obsidian."**

This aesthetic is tailored for a professional browser extension that needs to feel like a native tool while providing a premium, high-tech experience. It focuses on deep, dark backgrounds paired with vibrant, luminous accents that guide the user's attention.

### Core Principles
- **Functional Precision:** Every element has a clear purpose. The interface is compact but never cramped.
- **Glassmorphism & Depth:** Subtle transparency and blurs create a sense of layering and hierarchy without needing heavy borders.
- **Luminous Guidance:** Use of a single primary accent color (#7C4DFF / #B0C6FF) to highlight active states and primary actions.

---

## 2. Visual Language

### Color Palette
- **Surface (Primary):** `#131315` - Deep obsidian, used for the main background.
- **Surface (Secondary):** `#1B1B1D` - Slightly lighter for section containers and cards.
- **Accent (Primary):** `#B0C6FF` - A luminous, desaturated blue used for active selection states and toggles.
- **Text (Primary):** `#E5E1E4` - High contrast for readability against dark surfaces.
- **Text (Secondary):** `#E5E1E4` at 60% opacity - Used for labels and descriptions.

### Typography
- **Primary Font:** `Manrope` - Modern, geometric, and highly readable at small sizes.
- **Headings:** Bold weight, tracking -0.02em, used sparingly for section headers.
- **Body:** Regular weight, optimized for 12px-14px in a compact popup environment.

### Shapes & Spacing
- **Border Radius:** `ROUND_FULL` for segmented controls and selection states to create a friendly, modern feel.
- **Elevation:** Subtle shadows (`shadow-[0px_12px_32px_rgba(0,0,0,0.4)]`) to define the popup's edges and floating elements.

---

## 3. Components & Interaction

### Segmented Controls (Filters)
- Used for General Filters and Visual Effects.
- **Active State:** Solid primary blue background with high-contrast text.
- **Inactive State:** Transparent background with subtle hover states.

### List Items (Color Deficiencies)
- Vertical list of options with high-quality Material Design toggles.
- Each item includes a label and a brief description for accessibility and clarity.

### Popup Shell
- Optimized for a narrow vertical format (~400px wide).
- Minimal chrome: No title bar or bottom toolbar to maximize space for controls.
