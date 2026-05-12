import { Page, Locator } from '@playwright/test';

/**
 * ShadowDOMHelper — Utility for handling Shadow DOM elements
 * Insurance apps often use web components with Shadow DOM
 * Standard locators fail on Shadow DOM — this utility handles them
 */
export class ShadowDOMHelper {

  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Click element inside Shadow DOM
   * Usage: await shadowHelper.clickShadowElement('my-component', 'button')
   */
  async clickShadowElement(
    hostSelector: string,
    innerSelector: string
  ): Promise<void> {
    await this.page.evaluate(
      ({ host, inner }) => {
        const hostElement = document.querySelector(host);
        if (hostElement && hostElement.shadowRoot) {
          const innerElement = hostElement.shadowRoot.querySelector(inner);
          if (innerElement) (innerElement as HTMLElement).click();
        }
      },
      { host: hostSelector, inner: innerSelector }
    );
  }

  /**
   * Get text from Shadow DOM element
   * Usage: const text = await shadowHelper.getShadowText('my-card', '.title')
   */
  async getShadowText(
    hostSelector: string,
    innerSelector: string
  ): Promise<string> {
    return await this.page.evaluate(
      ({ host, inner }) => {
        const hostElement = document.querySelector(host);
        if (hostElement && hostElement.shadowRoot) {
          const innerElement = hostElement.shadowRoot.querySelector(inner);
          return innerElement ? innerElement.textContent || '' : '';
        }
        return '';
      },
      { host: hostSelector, inner: innerSelector }
    );
  }

  /**
   * Fill input inside Shadow DOM
   * Usage: await shadowHelper.fillShadowInput('my-form', 'input', 'value')
   */
  async fillShadowInput(
    hostSelector: string,
    inputSelector: string,
    value: string
  ): Promise<void> {
    await this.page.evaluate(
      ({ host, input, val }) => {
        const hostElement = document.querySelector(host);
        if (hostElement && hostElement.shadowRoot) {
          const inputElement = hostElement.shadowRoot.querySelector(input);
          if (inputElement) (inputElement as HTMLInputElement).value = val;
        }
      },
      { host: hostSelector, input: inputSelector, val: value }
    );
  }
}
