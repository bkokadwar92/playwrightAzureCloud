# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Login.spec.ts >> Login Page >> Login Scenario
- Location: src\tests\Login.spec.ts:10:9

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*inventory/
Received string:  "https://app.thetestingacademy.com/playwright/ttacart/"

Call log:
  - Expect "toHaveURL" with timeout 10000ms
    4 × unexpected value "https://app.thetestingacademy.com/playwright/ttacart/"

```

```yaml
- heading "TTACart" [level=1]
- textbox "Username": standard_user
- textbox "Password"
- button "Login"
- heading "Accepted usernames are:" [level=4]
- paragraph: standard_user locked_out_user problem_user performance_glitch_user error_user visual_user
- heading "Password for all users:" [level=4]
- paragraph: tta_secret
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test';
  2  | import { LoginPage } from '../pages/LoginPage';
  3  | 
  4  | test.describe('Login Page', ()=>{
  5  |     test.beforeEach(async ({page})=>{
  6  |         let loginPage = new LoginPage(page);
  7  |         await loginPage.open();
  8  |     })
  9  | 
  10 |     test('Login Scenario',async ({page})=>{
  11 |         test.step('Login as standard_user', async ()=>{
  12 |             let loginPage = new LoginPage(page);
  13 |             await loginPage.loginAs('standard_user','tta_secret');
  14 |         });
  15 |         
  16 |         test.step('Verify Successful Login', async ()=>{
> 17 |             await expect(page).toHaveURL(/.*inventory/);
     |                                ^ Error: expect(page).toHaveURL(expected) failed
  18 | 
  19 |         });
  20 | 
  21 |     })
  22 | 
  23 | })
```