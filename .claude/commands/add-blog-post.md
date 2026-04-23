---
description: Create a new blog post with proper MDX structure and frontmatter
---

Create a new MDX blog post in `content/`. Follow these steps:

1. Ask the user for the blog topic if not provided as $ARGUMENTS
2. Create the MDX file in `content/` with kebab-case filename
3. Include required frontmatter:
   ```
   ---
   title: "Post Title"
   publishedAt: "YYYY-MM-DD"
   summary: "Brief description"
   author: "Sanjay"
   ---
   ```
4. Write well-structured content with proper headings, code blocks (use language tags for syntax highlighting), and paragraphs
5. Use GitHub Flavored Markdown features where appropriate (tables, task lists)
6. Verify the post renders correctly by checking that `npm run build` succeeds

Topic: $ARGUMENTS
