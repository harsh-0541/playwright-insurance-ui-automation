import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ClaimsPage } from '../../pages/ClaimsPage';

/**
 * Test Suite: Claims Management
 * Covers: new claim submission, validation, status tracking
 */
test.describe('Claims Management Tests', () => {
  let claimsPage: ClaimsPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(
      process.env.TEST_USERNAME || 'testuser@insurance.com',
      process.env.TEST_PASSWORD || 'TestPass@123'
    );
    claimsPage = new ClaimsPage(page);
    await claimsPage.navigateToClaimsModule();
  });

  test('@smoke Submit a new accident claim successfully', async () => {
    await claimsPage.submitNewClaim({
      type: 'Accident',
      policyNumber: 'POL-2024-001',
      description: 'Vehicle accident on highway'
    });
    const claimId = await claimsPage.getClaimId();
    expect(claimId).not.toBeNull();
    console.log(`Claim submitted with ID: ${claimId}`);
  });

  test('@smoke Claims table is visible on module load', async () => {
    await claimsPage.verifyClaimsTableVisible();
  });

  test('@regression Submit health claim successfully', async () => {
    await claimsPage.submitNewClaim({
      type: 'Health',
      policyNumber: 'POL-2024-002',
      description: 'Medical emergency hospitalization'
    });
    await claimsPage.verifyClaimStatus('Pending Review');
  });

  test('@regression Claim submission fails without policy number', async ({ page }) => {
    await claimsPage.newClaimButton.click();
    await claimsPage.submitClaimButton.click();
    await expect(page.getByText('Policy number is required')).toBeVisible();
  });
});
