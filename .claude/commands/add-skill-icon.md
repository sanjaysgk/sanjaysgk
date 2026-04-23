---
description: Add a new tech skill SVG icon to the portfolio
---

Add a new technology/skill icon to the portfolio. Follow these steps:

1. Check existing icons in `src/components/ui/svgs/` for reference patterns
2. Create a new React component in `src/components/ui/svgs/` for the SVG icon
   - Use a functional component that accepts SVGProps
   - Support both light and dark mode if needed (check existing patterns like nextjsLogoDark.tsx)
3. Export the new component from any barrel file if one exists
4. Add the skill to the appropriate category in `src/data/resume.tsx` under the `skills` section, referencing the new icon component
5. Verify rendering with `npm run dev`

Skill/technology to add: $ARGUMENTS
