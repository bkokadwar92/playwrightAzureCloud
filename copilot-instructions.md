# GitHub Copilot Instructions

## Code Quality Rules & Standards

When generating or suggesting code for this Playwright automation framework, follow these mandatory rules:

### TypeScript Type Checking ✅
- All functions must have explicit return types
- No implicit `any` types allowed - use proper typing
- Unused variables must be prefixed with underscore `_`
- Strict mode is enabled
- Run validation: `npm run type-check`

### Code Style & Linting ✅
- Use **single quotes** for strings: `'string'` not `"string"`
- **2-space indentation** (no tabs)
- **Semicolons required** at end of statements
- **Trailing commas** in multi-line objects/arrays
- **Object spacing**: `{ key: value }` with spaces
- **No console.log** - use `console.warn()` or `console.error()` instead
- Comma-dangle rule applies to multi-line structures
- No unused variables (add `_` prefix if intentionally unused)

### ESLint Rules
- Run validation: `npm run lint`
- Auto-fix issues: `npm run lint:fix`
- Combined check: `npm run validate` (type-check + lint)

## Project Structure

```
src/
├── pages/          - Page Object Models for UI interactions
├── tests/          - Test specifications (*.spec.ts)
├── testdata/       - Test data and fixtures
└── utils/          - Utility functions & helpers
```

## Import Path Aliases

**Always use these aliases for cleaner, maintainable imports:**

```typescript
// ✅ Correct
import { HomePage } from '@pages/HomePage';
import { LoginUtil } from '@utils/LoginUtil';
import { testData } from '@testdata/users.json';
import { apiHelper } from '@tests/helpers';

// ❌ Avoid
import { HomePage } from '../../../pages/HomePage';
import { LoginUtil } from '../../utils/LoginUtil';
```

Alias mappings:
- `@pages/*` → `src/pages/*`
- `@utils/*` → `src/utils/*`
- `@testdata/*` → `src/testdata/*`
- `@tests/*` → `src/tests/*`

## Test File Standards (*.spec.ts)

- Descriptive test names that explain the scenario
- Use Page Object Models from `@pages/*`
- Use utilities from `@utils/*` for common functions
- Import test data from `@testdata/*`
- Follow Arrange-Act-Assert (AAA) pattern
- Add explicit return types to helper functions

Example:
```typescript
import { test, expect } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { LoginUtil } from '@utils/LoginUtil';
import { users } from '@testdata/testUsers';

test('User should successfully login with valid credentials', async ({ page }) => {
  // Arrange
  const homePage = new HomePage(page);
  const loginUtil = new LoginUtil(page);
  const user = users.validUser;

  // Act
  await homePage.navigateTo();
  await homePage.clickLoginButton();
  await loginUtil.login(user.email, user.password);

  // Assert
  await expect(page).toHaveTitle(/Dashboard/);
});
```

## Before Committing Code

Run the validation pipeline:
```bash
npm run validate    # Runs type-check + lint
npm run test        # Run all tests
```

All checks must pass before committing.

## Key Rules Summary

| Rule | Standard | Command |
|------|----------|---------|
| Type Safety | Strict TypeScript, explicit types | `npm run type-check` |
| Code Style | Single quotes, 2-space indent, semicolons | `npm run lint` |
| Auto-fix | Fix style issues automatically | `npm run lint:fix` |
| Validation | Complete quality check | `npm run validate` |
| Testing | Run all tests before commit | `npm run test` |
