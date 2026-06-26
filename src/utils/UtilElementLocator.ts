//Common Utilities will be available here
import {Locator, Page, expect} from '@playwright/test';
import { AppLogger } from './Logger';

export const DEFAULT_ACTION_TIMEOUT_MS = 15_000;

export type Flex = 'string' | Locator

export class UtilElementLocator {

    private readonly page:Page;
    private readonly log: AppLogger;

    constructor(page:Page, scope: string = 'UtilElementLocator', log?: AppLogger){
        this.page = page;
        this.log = log || new AppLogger(scope);
    }

    private toLocator(target:Flex):Locator{
        return typeof target === 'string' ? this.page.locator(target) : target
    }

    private describe(target: Flex): string {
        return typeof target === 'string' ? target : target.toString();
    }

    async click(target:Flex, timeout:number = DEFAULT_ACTION_TIMEOUT_MS):Promise<void>{
        const loc = this.toLocator(target);
        this.log.debug(`click ${this.describe(target)}`);
        await expect(loc).toBeVisible({ timeout });
        await expect(loc).toBeEnabled({ timeout });
        await loc.click({ timeout });
    }

    async doubleClick(target: Flex, timeout: number = DEFAULT_ACTION_TIMEOUT_MS): Promise<void> {
        const loc = this.toLocator(target);
        this.log.debug(`doubleClick ${this.describe(target)}`);
        await loc.dblclick({ timeout });
    }
    
    async rightClick(target: Flex, timeout: number = DEFAULT_ACTION_TIMEOUT_MS): Promise<void> {
        const loc = this.toLocator(target);
        await loc.click({ button: 'right', timeout });
    }

    async hover(target: Flex, timeout: number = DEFAULT_ACTION_TIMEOUT_MS): Promise<void> {
        const loc = this.toLocator(target);
        await loc.hover({ timeout });
    }

     // ---------- input actions ----------

    async fill(target: Flex, value: string, timeout: number = DEFAULT_ACTION_TIMEOUT_MS): Promise<void> {
        const loc = this.toLocator(target);
        this.log.debug(`fill ${this.describe(target)} with value: ${value}`);
        await expect(loc).toBeVisible({ timeout });
        await loc.fill(value, { timeout });
    }
    async type(target: Flex, value: string, timeout: number = DEFAULT_ACTION_TIMEOUT_MS): Promise<void> {
        // Note: Playwright deprecated .type() in favour of .pressSequentially().
        // We keep the public method name so the API still reads naturally for
        // students used to the older verb.
        const loc = this.toLocator(target);
        this.log.debug(`type ${this.describe(target)} with value: ${value}`);
        await loc.pressSequentially(value, { timeout });
    }
    async clear(target: Flex, timeout: number = DEFAULT_ACTION_TIMEOUT_MS): Promise<void> {
        const loc = this.toLocator(target);
        await loc.clear({ timeout });
    }
    async pressSequentially(
        target: Flex,
        value: string,
        timeout: number = DEFAULT_ACTION_TIMEOUT_MS,
    ): Promise<void> {
        const loc = this.toLocator(target);
        await loc.pressSequentially(value, { timeout });
    }

    // ---------- text & content getters ----------

    async getText(target: Flex): Promise<string> {
        const loc = this.toLocator(target);
        const txt = (await loc.textContent()) ?? '';
        const result = txt.trim();
        this.log.debug(`getText ${this.describe(target)}: ${result}`);
        return result;
    }

    async getInnerText(target: Flex): Promise<string> {
        const loc = this.toLocator(target);
        return (await loc.innerText()).trim();
    }
    async getAllTexts(target: Flex): Promise<string[]> {
        const loc = this.toLocator(target);
        const texts = await loc.allTextContents();
        return texts.map((t) => t.trim());
    }

    async getAttr(target: Flex, name: string): Promise<string | null> {
        const loc = this.toLocator(target);
        return loc.getAttribute(name);
    }

    async getValue(target: Flex): Promise<string> {
        const loc = this.toLocator(target);
        return loc.inputValue();
    }

    // ---------- count ----------

    async count(target: Flex): Promise<number> {
        const loc = this.toLocator(target);
        return loc.count();
    }

    // ---------- state checks ----------

    async isVisible(target: Flex): Promise<boolean> {
        const loc = this.toLocator(target);
        return loc.isVisible();
    }

    async isEnabled(target: Flex): Promise<boolean> {
        const loc = this.toLocator(target);
        return loc.isEnabled();
    }

    async isChecked(target: Flex): Promise<boolean> {
        const loc = this.toLocator(target);
        return loc.isChecked();
    }

    // ---------- waits ----------

    async waitForVisible(target: Flex, timeout: number = DEFAULT_ACTION_TIMEOUT_MS): Promise<void> {
        const loc = this.toLocator(target);
        this.log.debug(`waitForVisible ${this.describe(target)}`);
        await expect(loc).toBeVisible({ timeout });
    }

    async waitForHidden(target: Flex, timeout: number = DEFAULT_ACTION_TIMEOUT_MS): Promise<void> {
        const loc = this.toLocator(target);
        await expect(loc).toBeHidden({ timeout });
    }

    async waitForPageLoad(): Promise<void> {
       
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle').catch(() => {
            // TTACart is static + localStorage so networkidle is fast,
            // but we swallow the rare timeout so the test isn't punished
            // by background analytics calls on the demo origin.
        });
    }

    // ---------- selects ----------

    async selectByText(target: Flex, text: string): Promise<void> {
        const loc = this.toLocator(target);
        this.log.debug(`selectByText ${this.describe(target)} with text: ${text}`);
        await loc.selectOption({ label: text });
    }

    async selectByValue(target: Flex, value: string): Promise<void> {
        const loc = this.toLocator(target);
        await loc.selectOption({ value });
    }

    async selectByIndex(target: Flex, index: number): Promise<void> {
        const loc = this.toLocator(target);
        await loc.selectOption({ index });
    }

}