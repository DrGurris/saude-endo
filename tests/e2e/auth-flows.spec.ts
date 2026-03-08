import { test, expect } from '@playwright/test';

test.describe('Authentication Flows', () => {
  test('Login page loads correctly', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    
    // Verify login form elements
    await expect(page.getByTestId('login-email')).toBeVisible();
    await expect(page.getByTestId('login-password')).toBeVisible();
    await expect(page.getByTestId('login-submit')).toBeVisible();
  });

  test('Login form validation - empty fields', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    
    // Try to submit without filling anything
    await page.getByTestId('login-submit').click();
    
    // Should show validation errors (form should not navigate)
    await expect(page).toHaveURL(/\/login/);
  });

  test('Login with invalid credentials shows error', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    
    await page.getByTestId('login-email').fill('nonexistent@test.com');
    await page.getByTestId('login-password').fill('wrongpassword');
    await page.getByTestId('login-submit').click();
    
    // Should show error message or stay on login page
    await expect(page).toHaveURL(/\/login/);
  });

  test('Register page redirects to questionnaire without phenotype', async ({ page }) => {
    // Register page requires phenotypeResult (from questionnaire)
    // Without it, should redirect to questionnaire
    await page.goto('/register', { waitUntil: 'domcontentloaded' });
    
    // Should be redirected to questionnaire page
    await expect(page).toHaveURL(/\/questionnaire/);
  });

  test('Results page redirects without authentication', async ({ page }) => {
    // Results is a protected route
    await page.goto('/results', { waitUntil: 'domcontentloaded' });
    
    // Should be redirected (to login or questionnaire)
    await expect(page).not.toHaveURL(/\/results/);
  });

  test('Portal page redirects without authentication', async ({ page }) => {
    // Portal is a protected route
    await page.goto('/portal', { waitUntil: 'domcontentloaded' });
    
    // Should be redirected (to login or questionnaire)
    await expect(page).not.toHaveURL(/\/portal/);
  });
});
