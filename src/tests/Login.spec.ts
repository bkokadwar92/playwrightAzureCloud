import {test,expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Page', ()=>{
    test.beforeEach(async ({page})=>{
        let loginPage = new LoginPage(page);
        await loginPage.open();

    })

    test('Login test case',async ({page})=>{
        test.step('Login as standard_user', async ()=>{
            let loginPage = new LoginPage(page);
            await loginPage.loginAs('standard_user','tta_secret');
        });
        
        test.step('Verify Successful Login', async ()=>{
            await expect(page).toHaveURL(/.*ttacart/);

        });

    })

})