# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Favycon is a Next.js-based favicon generator tool that converts uploaded images into multiple favicon formats and sizes for web applications. The app processes PNG/SVG uploads and generates complete favicon packages with all necessary files and HTML code.

**Current Version**: Next.js 15.4 with React 18.3.1 and TypeScript 5.5.2

## Development Commands

### Installation

```bash
yarn install
# or
pnpm install
```

### Development Server

```bash
yarn dev
# Starts Next.js dev server on http://localhost:3000
```

### Build & Production

```bash
yarn build    # Build for production
yarn start    # Start production server
```

### Linting & Code Quality

```bash
yarn lint                # Run all linting (scripts, styles, JSON)
yarn lint:scripts        # ESLint for TypeScript/JavaScript
yarn lint:styles         # Stylelint for SCSS/CSS
yarn lint:json          # Prettier for JSON files
```

### Storybook

```bash
yarn storybook           # Start Storybook dev server on http://localhost:6006
yarn storybook:build     # Build Storybook for production
```

### Testing

```bash
yarn e2e                 # Run Cypress e2e tests (starts dev server + opens Cypress)
yarn cy:open            # Open Cypress test runner
```

### Git & Release

```bash
yarn commit             # Use commitizen for conventional commits
```

## Architecture Overview

### Core Application Flow

1. **Upload/Drop Zone** (`components/drag-and-drop`) - Handles file upload with validation
2. **Image Processing** (`pages/api/favycon.ts`) - Server-side Sharp.js processing to generate multiple sizes
3. **Zip Generation** - Creates downloadable package with favicon files, manifest, and HTML code
4. **UI Feedback** - Real-time validation feedback and download interface

### Key Technologies

- **Next.js 15.4** - React framework with API routes and Pages Router
- **React 18.3.1** - UI framework with concurrent features
- **TypeScript 5.5.2** - Full type safety with modern syntax
- **Sharp 0.33.0** - Server-side image processing for resizing and format conversion
- **SCSS Modules** - Component-scoped styling
- **Storybook** - Component development and documentation

### File Structure

- `components/` - Reusable UI components with SCSS modules and Storybook stories
- `pages/` - Next.js pages and API routes
- `pages/api/favycon.ts` - Main favicon generation API endpoint
- `utils/` - Utility functions for favicon templates, file handling, device detection
- `hooks/` - Custom React hooks (dark mode, toggle states)
- `styles/` - Global SCSS files (variables, breakpoints, reset)
- `public/` - Static assets including example favicons

### Component Patterns

- Components use TypeScript interfaces for props
- SCSS modules for styling (`index.module.scss`)
- Storybook stories for component documentation (`index.stories.tsx`)
- Consistent naming: PascalCase for components, kebab-case for directories

### Image Processing Pipeline

The core favicon generation happens in `pages/api/favycon.ts`:

1. Validates uploaded file (type, size, dimensions)
2. Uses Sharp to resize image to multiple favicon sizes (16x16 to 512x512)
3. Generates ICO file using @fiahfy/ico-convert
4. Creates PWA manifest and browser config files
5. Packages everything in a ZIP file with HTML template

### Validation Logic

- SVG: No minimum size requirement
- PNG/other: Minimum 310px for standard, 512px for PWA compatibility
- File size limit: 1MB
- Supported formats: PNG, SVG, JPG, JPEG, WEBP

### State Management

- React useState for local component state
- Custom hooks for common patterns (useToggle, useDarkMode)
- No global state management library

## Development Notes

### Dependencies

- Uses Yarn lock file but package.json shows npm scripts
- Sharp dependency has resolution pinned to ^0.28.0
- Next.js Image component used throughout for optimized loading

### Code Quality

- ESLint + TypeScript rules enforced
- Stylelint for SCSS consistency
- Prettier for JSON formatting
- Husky git hooks for pre-commit linting
- Conventional commits enforced via commitizen

### Browser Support

- Modern browsers with ES6+ support
- Progressive Web App compatibility available
- Touch/mobile gesture support via @use-gesture/react

### Analytics

- Splitbee integration for usage tracking
- Events tracked: file uploads, generation success/errors, downloads

### Security

- Content Security Policy headers in production
- File type validation and size limits
- No user data storage (client-side processing only)

### Testing

- Cypress for e2e testing
- Tests focused on drag-and-drop functionality
- Test files in cypress/e2e/
