---
description: Review the design system and check for consistency issues
---

Review the portfolio's design system for consistency. Check:

1. Read `src/app/globals.css` for design tokens (oklch colors, spacing, typography)
2. Scan components in `src/components/` for:
   - Consistent use of design tokens (no hardcoded colors)
   - Proper dark mode support (`.dark` variants)
   - Responsive breakpoints (mobile-first with sm:, md:, lg:)
   - Consistent spacing and typography scale
3. Check `src/app/layout.tsx` and `src/app/page.tsx` for layout consistency
4. Report any inconsistencies or improvements

Focus area: $ARGUMENTS
