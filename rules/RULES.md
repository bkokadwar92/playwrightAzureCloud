# Code Quality Rules & Guidelines

## Overview
This document outlines the code quality standards and automated checks that must pass before adding new test cases or making code changes.

## Automated Checks

### 1. TypeScript Type Checking
- Run: `npm run type-check`
- Ensures all TypeScript files are type-safe
- No implicit `any` types allowed
- Strict mode enabled

### 2. ESLint - Code Quality & Style
- Run: `npm run lint`
- Run with fix: `npm run lint:fix`
- Enforces consistent code style
- Catches common JavaScript/TypeScript errors

### 3. Combined Validation
- Run: `npm run validate`
- Runs both type checking and linting in sequence

## Code Quality Standards

### TypeScript Rules
- ✅ Explicit return types on functions
- ✅ No `any` types (use proper typing)
- ✅ Unused variables must be prefixed with `_`
- ✅ Proper import organization

### Code Style Rules
- ✅ Single quotes for strings
- ✅ 2-space indentation
- ✅ Semicolons required
- ✅ Trailing commas in multi-line objects/arrays
- ✅ Object spacing: `{ key: value }`
- ✅ No console.log (use console.warn or console.error)

### Test File Rules (*.spec.ts)
- ✅ Descriptive test names
- ✅ Use page objects from `@pages/*`
- ✅ Use utilities from `@utils/*`
- ✅ Test data from `@testdata/*`

## Before Committing Code

1. Run `npm run type-check` - Fix any type errors
2. Run `npm run lint:fix` - Auto-fix style issues
3. Review remaining lint warnings
4. Run tests: `npm run test`
5. Commit only if all checks pass

## Project Structure

```
src/
├── pages/         - Page Object Models
├── tests/         - Test specifications
├── testdata/      - Test data and fixtures
└── utils/         - Utility functions & helpers
```

## Import Aliases

Use these aliases for cleaner imports:
- `@pages/` → `src/pages/`
- `@utils/` → `src/utils/`
- `@testdata/` → `src/testdata/`
- `@tests/` → `src/tests/`

Example:
```typescript
import { HomePage } from '@pages/HomePage';
import { LoginUtil } from '@utils/LoginUtil';
import { testData } from '@testdata/users.json';
```
