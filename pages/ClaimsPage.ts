import { Page, Locator, expect } from '@playwright/test';

/**
 * ClaimsPage — Page Object for insurance claims workflows
 * Covers: new claim, document upload, status tracking
 */
export class ClaimsPage {
  readonly page: Page;

  readonly newClaimButton: Locator;
  readonly claimTypeDropdown: Locator;
  readonly policyNumberInput: Locator;
  readonly claimDescriptionInput: Locator;
  readonly documentUploadInput: Locator;
  readonly submitClaimButton: Locator;
  readonly successMessage: Locator;
  readonly claimIdLabel: Locator;
  readonly claimStatusLabel: Locator;
  readonly claimsTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newClaimButton = page.getByRole('button', { name: 'New Claim' });
    this.claimTypeDropdown = page.locator('[data-testid="claim-type"]');
    this.policyNumberInput = page.getByPlaceholder('Policy Number');
    this.claimDescriptionInput = page.locator('[data-testid="claim-description"]');
    this.documentUploadInput = page.locator('input[type="file"]');
    this.submitClaimButton = page.getByRole('button', { name: 'Submit Claim' });
    this.successMessage = page.locator('[data-testid="success-toast"]');
    this.claimIdLabel = page.locator('[data-testid="claim-id"]');
    this.claimStatusLabel = page.locator('[data-testid="claim-status"]');
    this.claimsTable = page.locator('[data-testid="claims-table"]');
  }

  async navigateToClaimsModule() {
    await this.page.goto('/dashboard/claims');
    await expect(this.newClaimButton).toBeVisible();
  }

  async submitNewClaim(claimData: {
    type: string;
    policyNumber: string;
    description: string;
  }) {
    await this.newClaimButton.click();
    await this.claimTypeDropdown.selectOption(claimData.type);
    await this.policyNumberInput.fill(claimData.policyNumber);
    await this.claimDescriptionInput.fill(claimData.description);
    await this.submitClaimButton.click();
  }

  async getClaimId(): Promise<string | null> {
    await expect(this.successMessage).toBeVisible();
    return await this.claimIdLabel.textContent();
  }

  async verifyClaimStatus(expectedStatus: string) {
    await expect(this.claimStatusLabel).toHaveText(expectedStatus);
  }

  async verifyClaimsTableVisible() {
    await expect(this.claimsTable).toBeVisible();
  }
}
