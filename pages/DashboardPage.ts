import { Page, Locator, expect } from '@playwright/test';

/**
 * DashboardPage — Page Object for main dashboard
 * Covers: navigation, widgets, quick stats
 */
export class DashboardPage {
  readonly page: Page;

  readonly welcomeMessage: Locator;
  readonly policyCountWidget: Locator;
  readonly activeClaimsWidget: Locator;
  readonly premiumDueWidget: Locator;
  readonly policiesNavLink: Locator;
  readonly claimsNavLink: Locator;
  readonly paymentsNavLink: Locator;
  readonly profileNavLink: Locator;
  readonly logoutButton: Locator;
  readonly notificationBell: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeMessage = page.locator('[data-testid="welcome-message"]');
    this.policyCountWidget = page.locator('[data-testid="policy-count"]');
    this.activeClaimsWidget = page.locator('[data-testid="active-claims"]');
    this.premiumDueWidget = page.locator('[data-testid="premium-due"]');
    this.policiesNavLink = page.getByRole('link', { name: 'Policies' });
    this.claimsNavLink = page.getByRole('link', { name: 'Claims' });
    this.paymentsNavLink = page.getByRole('link', { name: 'Payments' });
    this.profileNavLink = page.getByRole('link', { name: 'Profile' });
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
    this.notificationBell = page.locator('[data-testid="notification-bell"]');
  }

  async verifyDashboardLoaded() {
    await expect(this.welcomeMessage).toBeVisible();
    await expect(this.policyCountWidget).toBeVisible();
  }

  async navigateToPolicies() {
    await this.policiesNavLink.click();
    await expect(this.page).toHaveURL(/policies/);
  }

  async navigateToClaims() {
    await this.claimsNavLink.click();
    await expect(this.page).toHaveURL(/claims/);
  }

  async logout() {
    await this.logoutButton.click();
    await expect(this.page).toHaveURL(/login/);
  }

  async getPolicyCount(): Promise<string | null> {
    return await this.policyCountWidget.textContent();
  }
}
