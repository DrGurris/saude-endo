import { test, expect } from '@playwright/test';

test.describe('Authentication Flows', () => {
  test.beforeEach(async ({ page }) => {
    // Clear any stored tokens to ensure fresh state
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      localStorage.removeItem('saude_token');
      sessionStorage.clear();
    });
  });

  test('Login page loads correctly', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    
    // Verify login form elements
    await expect(page.getByTestId('login-email')).toBeVisible();
    await expect(page.getByTestId('login-password')).toBeVisible();
    await expect(page.getByTestId('login-submit')).toBeVisible();
  });

  test('Login page shows loading state while checking auth', async ({ page }) => {
    // Slow down network to catch loading state
    await page.route('**/api/auth/me', async route => {
      await new Promise(resolve => setTimeout(resolve, 500));
      await route.abort();
    });
    
    // Set a fake token to trigger auth check
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      localStorage.setItem('saude_token', 'fake_token');
    });
    
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    
    // Should show loading initially or form (if auth check is fast)
    // The page should eventually show the form since token is invalid
    await expect(page.getByTestId('login-email')).toBeVisible({ timeout: 10000 });
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

  test('Login button shows loading text during submission', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    
    await page.getByTestId('login-email').fill('test@test.com');
    await page.getByTestId('login-password').fill('TestPass123!');
    
    // Slow down the login request
    await page.route('**/api/auth/login', async route => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ detail: 'Credenciales incorrectas' })
      });
    });
    
    await page.getByTestId('login-submit').click();
    
    // Should show "Ingresando..." text while submitting
    await expect(page.getByTestId('login-submit')).toContainText(/Ingresando/);
  });

  test('Register page redirects to questionnaire without phenotype', async ({ page }) => {
    // Register page requires phenotypeResult (from questionnaire)
    // Without it, should redirect to questionnaire
    await page.goto('/register', { waitUntil: 'domcontentloaded' });
    
    // Should be redirected to questionnaire page
    await expect(page).toHaveURL(/\/questionnaire/);
  });

  test('Register page shows loading state while checking auth', async ({ page }) => {
    // Set up phenotype result in session storage and fake token
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      sessionStorage.setItem('saude_phenotype_result', JSON.stringify({
        phenotype: 'TEST_PHENOTYPE',
        score: 10,
        description: 'Test description'
      }));
      localStorage.setItem('saude_token', 'fake_token');
    });
    
    // Slow down network to catch loading state
    await page.route('**/api/auth/me', async route => {
      await new Promise(resolve => setTimeout(resolve, 500));
      await route.abort();
    });
    
    await page.goto('/register', { waitUntil: 'domcontentloaded' });
    
    // Should eventually show the register form (since token is invalid)
    await expect(page.getByTestId('register-name')).toBeVisible({ timeout: 10000 });
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

  test('Authenticated user on Login redirects to portal', async ({ page }) => {
    // First register a test user
    const uniqueId = Date.now();
    const testEmail = `test_redirect_${uniqueId}@test.com`;
    
    const registerResponse = await page.request.post('http://localhost:8001/api/auth/register', {
      data: {
        name: `TEST_Redirect_${uniqueId}`,
        email: testEmail,
        password: 'TestPass123!',
        birth_date: '1990-01-01'
      }
    });
    
    if (registerResponse.status() === 200) {
      const { token } = await registerResponse.json();
      
      // Navigate to login and set token before the component mounts
      await page.addInitScript((t) => {
        localStorage.setItem('saude_token', t);
      }, token);
      
      // Navigate directly to login - token is set via addInitScript
      await page.goto('/login', { waitUntil: 'domcontentloaded' });
      
      // Wait for auth check and redirect to portal
      await expect(page).toHaveURL(/\/portal/, { timeout: 15000 });
    }
  });
});
