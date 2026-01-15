---
name: audit
description: Run a comprehensive code review combining React/Next.js performance optimization and Web Interface Guidelines (accessibility, UX, design). Use when asked to "audit my code", "full audit", "check everything", or "review for performance and accessibility".
argument-hint: <file-or-pattern>
---

# Comprehensive Code Review

Run both React performance and Web Interface Guidelines audits in one pass.

## What This Reviews

### 1. React & Next.js Performance (vercel-react-best-practices)

45 rules across 8 categories:
- **Eliminating Waterfalls** - async/await patterns, Promise.all, Suspense
- **Bundle Size** - dynamic imports, barrel files, third-party scripts
- **Server-Side Performance** - caching, serialization, parallel fetching
- **Client-Side Data Fetching** - SWR, event listener deduplication
- **Re-render Optimization** - memo, dependencies, derived state
- **Rendering Performance** - content-visibility, hydration, SVG
- **JavaScript Performance** - loops, caching, early exits
- **Advanced Patterns** - refs, stable callbacks

### 2. Web Interface Guidelines (web-design-guidelines)

100+ rules covering:
- Accessibility (ARIA, focus states, screen readers)
- Performance (loading, animations, interactions)
- UX patterns (forms, navigation, feedback)
- Design consistency

## How to Run

1. **Fetch latest Web Interface Guidelines:**
   ```
   https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
   ```

2. **Read the React best practices rules** from:
   ```
   .claude/skills/vercel-react-best-practices/rules/
   ```

3. **Read the specified files** (or ask user for files/pattern if not provided)

4. **Apply all rules** from both guideline sets

5. **Output findings** in terse `file:line` format, grouped by category:
   - Performance issues first (CRITICAL/HIGH priority)
   - Then accessibility/UX issues
   - Then lower priority optimizations

## Output Format

```
## Performance Issues

src/components/Button.tsx:42 - async-parallel: Use Promise.all() for independent operations
src/app/page.tsx:15 - bundle-barrel-imports: Import directly from source, not barrel file

## Accessibility Issues

src/components/Modal.tsx:28 - Missing aria-label on close button
src/components/Form.tsx:55 - Form inputs missing associated labels

## Recommendations

src/components/List.tsx:100 - js-set-map-lookups: Consider Set for O(1) lookups
```

## Usage Examples

- `/audit src/components/` - Audit all components
- `/audit src/app/page.tsx` - Audit specific file
- `/audit **/*.tsx` - Audit all TSX files
