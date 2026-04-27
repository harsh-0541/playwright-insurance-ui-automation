import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

/**
 * Test Suite: Authentication
 * Covers: valid login, invalid credentials, empty fields
 */
test.describe('Authentication Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('@smoke Valid login with correct credentials', async ({ page }) => {
    await loginPage.login(
      process.env.TEST_USERNAME || 'testuser@insurance.com',
      process.env.TEST_PASSWORD || 'TestPass@123'
    );
    await expect(page).toHaveURL(/dashboard/);
  });

  test('Invalid login - wrong password shows error', async () => {
    await loginPage.login('testuser@insurance.com', 'WrongPassword');
    await loginPage.verifyErrorMessage('Invalid username or password');
  });

  test('Invalid login - empty username shows validation', async ({ page }) => {
    await loginPage.login('', 'TestPass@123');
    await expect(page.getByText('Username is required')).toBeVisible();
  });

  test('Invalid login - empty password shows validation', async ({ page }) => {
    await loginPage.login('testuser@insurance.com', '');
    await expect(page.getByText('Password is required')).toBeVisible();
  });
});
test('Session persists after page refresh', async ({ page }) => {
    await loginPage.login(
      process.env.TEST_USERNAME || 'testuser@insurance.com',
      process.env.TEST_PASSWORD || 'TestPass@123'
    );
    await expect(page).toHaveURL(/dashboard/);
    await page.reload();
    // After reload user should still be on dashboard
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByText('Welcome')).toBeVisible();
  });

  test('Login button is disabled during authentication', async ({ page }) => {
    await loginPage.login(
      process.env.TEST_USERNAME || 'testuser@insurance.com',
      process.env.TEST_PASSWORD || 'TestPass@123'
    );
    // Button should be disabled while request is processing
    // This prevents duplicate form submissions
    await expect(loginPage.loginButton).toBeDisabled();
  });
