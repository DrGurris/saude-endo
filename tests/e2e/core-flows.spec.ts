import { test, expect } from '@playwright/test';

test.describe('Saude Platform - Core Flows', () => {
  test.beforeEach(async ({ page }) => {
    // Remove any overlays that might block clicks
    await page.addLocatorHandler(
      page.locator('[data-sonner-toast], .Toastify__toast'),
      async () => {
        const close = page.locator('[data-sonner-toast] [data-close]');
        await close.first().click({ timeout: 2000 }).catch(() => {});
      },
      { times: 10, noWaitAfter: true }
    );
  });

  test('Homepage loads with hero section', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Verify hero CTA button is visible
    await expect(page.getByTestId('hero-cta-btn')).toBeVisible();
    
    // Verify navigation elements - use first() to avoid strict mode violation
    await expect(page.getByRole('link', { name: /Inicio/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Evaluación', exact: true }).first()).toBeVisible();
  });

  test('Hero CTA navigates to questionnaire', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    await page.getByTestId('hero-cta-btn').click();
    
    await expect(page).toHaveURL(/\/questionnaire/);
  });

  test('CTA section button navigates to questionnaire', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Scroll to CTA section
    await page.getByTestId('cta-section-btn').scrollIntoViewIfNeeded();
    await page.getByTestId('cta-section-btn').click();
    
    await expect(page).toHaveURL(/\/questionnaire/);
  });

  test('Theme toggle works', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    const themeToggle = page.getByTestId('theme-toggle');
    await expect(themeToggle).toBeVisible();
    
    // Toggle theme
    await themeToggle.click();
    
    // Verify toggle state changed
    await expect(themeToggle).toHaveAttribute('aria-pressed', 'true');
  });

  test('Navigation links work', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Click on Evaluación link in nav (use first to target navigation, not CTA)
    await page.getByRole('link', { name: 'Evaluación', exact: true }).first().click();
    
    await expect(page).toHaveURL(/\/questionnaire/);
  });
});
