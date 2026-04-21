import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { PolicyPage } from '../../pages/PolicyPage';
import policyData from '../../test-data/policy-data.json';

/**
 * Test Suite: Policy Management
 * Covers: create policy, validate UI, verify data persistence
 */
test.describe('Policy Management Tests', () => {
  let policyPage: PolicyPage;

  test.beforeEach(async ({ page }) => {
    // Login before each test
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(
      process.env.TEST_USERNAME || 'testuser@insurance.com',
      process.env.TEST_PASSWORD || 'TestPass@123'
    );

    policyPage = new PolicyPage(page);
    await policyPage.navigateToPolicyModule();
  });

  test('@smoke Create a new health insurance policy', async () => {
    await policyPage.createPolicy(policyData.healthPolicy);
    const policyId = await policyPage.verifyPolicyCreated();
    console.log(`Policy created with ID: ${policyId}`);
    expect(policyId).not.toBeNull();
  });

  test('Create auto insurance policy with valid data', async () => {
    await policyPage.createPolicy(policyData.autoPolicy);
    await policyPage.verifyPolicyCreated();
  });

  test('Policy creation fails with missing mandatory fields', async ({ page }) => {
    await policyPage.createPolicyButton.click();
    await policyPage.submitButton.click();
    // Verify validation messages appear
    await expect(page.getByText('Policy type is required')).toBeVisible();
    await expect(page.getByText('Policy holder name is required')).toBeVisible();
  });
});
