import { Page, Locator, expect } from '@playwright/test';

/**
 * PolicyPage — Page Object for policy management workflows
 * Covers: create, view, update, renew, cancel
 */
export class PolicyPage {
  readonly page: Page;

  readonly createPolicyButton: Locator;
  readonly policyTypeDropdown: Locator;
  readonly policyHolderNameInput: Locator;
  readonly startDateInput: Locator;
  readonly endDateInput: Locator;
  readonly premiumAmountInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly policyIdLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createPolicyButton = page.getByRole('button', { name: 'Create Policy' });
    this.policyTypeDropdown = page.locator('[data-testid="policy-type"]');
    this.policyHolderNameInput = page.getByPlaceholder('Policy Holder Name');
    this.startDateInput = page.locator('[data-testid="start-date"]');
    this.endDateInput = page.locator('[data-testid="end-date"]');
    this.premiumAmountInput = page.locator('[data-testid="premium-amount"]');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.successMessage = page.locator('[data-testid="success-toast"]');
    this.policyIdLabel = page.locator('[data-testid="policy-id"]');
  }

  async navigateToPolicyModule() {
    await this.page.goto('/dashboard/policies');
    await expect(this.createPolicyButton).toBeVisible();
  }

  async createPolicy(policyData: {
    type: string;
    holderName: string;
    startDate: string;
    endDate: string;
    premium: string;
  }) {
    await this.createPolicyButton.click();
    await this.policyTypeDropdown.selectOption(policyData.type);
    await this.policyHolderNameInput.fill(policyData.holderName);
    await this.startDateInput.fill(policyData.startDate);
    await this.endDateInput.fill(policyData.endDate);
    await this.premiumAmountInput.fill(policyData.premium);
    await this.submitButton.click();
  }

  async verifyPolicyCreated() {
    await expect(this.successMessage).toBeVisible();
    await expect(this.policyIdLabel).not.toBeEmpty();
    return await this.policyIdLabel.textContent();
  }
}
