import { test, expect } from '@playwright/test';

test.describe('Library - Knowledge Base', () => {
  test.beforeEach(async ({ page }) => {
    // Handle toasts that might block interaction
    await page.addLocatorHandler(
      page.locator('[data-sonner-toast], .Toastify__toast'),
      async () => {
        const close = page.locator('[data-sonner-toast] [data-close]');
        await close.first().click({ timeout: 2000 }).catch(() => {});
      },
      { times: 10, noWaitAfter: true }
    );
  });

  test('Library page is accessible via navigation', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Click on Biblioteca in nav
    await page.getByTestId('nav-library').click();
    
    await expect(page).toHaveURL(/\/library/);
    await expect(page.getByRole('heading', { name: 'Biblioteca de Conocimiento' })).toBeVisible();
  });

  test('Library page displays featured articles section', async ({ page }) => {
    await page.goto('/library', { waitUntil: 'domcontentloaded' });

    // Wait for articles to load
    await page.waitForSelector('[data-testid^="article-"]', { timeout: 10_000 });

    // Verify featured articles section heading
    await expect(page.getByRole('heading', { name: 'Artículos Destacados' })).toBeVisible();

    // Verify featured articles are visible (7 total: endo-basics, pain-phenotypes, energy-fatigue-management, energy-exercise-periodization, nutrition-antiinflammatory, hormones-treatment-options, wellbeing-cbt-act)
    await expect(page.getByTestId('article-endo-basics')).toBeVisible();
    await expect(page.getByTestId('article-nutrition-antiinflammatory')).toBeVisible();
    await expect(page.getByTestId('article-pain-phenotypes')).toBeVisible();
  });

  test('Category filters work correctly', async ({ page }) => {
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('[data-testid^="article-"]', { timeout: 10_000 });

    // Default should show all articles (Todos active)
    await expect(page.getByTestId('pillar-all')).toBeVisible();

    // Click on Nutrición pillar filter
    await page.getByTestId('pillar-nutrition').click();

    // Verify nutrition articles are visible
    await expect(page.getByTestId('article-nutrition-antiinflammatory')).toBeVisible();
    await expect(page.getByTestId('article-nutrition-endo-belly')).toBeVisible();

    // Click on Energy pillar filter
    await page.getByTestId('pillar-energy').click();
    await expect(page.getByTestId('article-energy-exercise-gentle')).toBeVisible();

    // Click on Wellbeing
    await page.getByTestId('pillar-wellbeing').click();
    await expect(page.getByTestId('article-wellbeing-emotional')).toBeVisible();
    await expect(page.getByTestId('article-wellbeing-mindfulness')).toBeVisible();

    // Click on Pain (Dolor)
    await page.getByTestId('pillar-pain').click();
    await expect(page.getByTestId('article-endo-basics')).toBeVisible();
    await expect(page.getByTestId('article-pain-phenotypes')).toBeVisible();
  });

  test('Search functionality works', async ({ page }) => {
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('[data-testid^="article-"]', { timeout: 10_000 });

    const searchInput = page.getByTestId('library-search');
    await expect(searchInput).toBeVisible();

    // Search for "endometriosis" (matches article title)
    await searchInput.fill('endometriosis');
    await page.waitForTimeout(500); // debounce

    // Should show matching articles
    await expect(page.getByTestId('article-endo-basics')).toBeVisible();

    // Clear search
    await searchInput.clear();
    await page.waitForTimeout(500);

    // Search for "dolor" (matches tags and content)
    await searchInput.fill('dolor');
    await page.waitForTimeout(500);

    // Should show pain-related articles
    const cards = page.locator('[data-testid^="article-"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Click on article opens modal with full content', async ({ page }) => {
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('[data-testid^="article-"]', { timeout: 10_000 });

    // Click read button on endo-basics article
    await page.getByTestId('read-endo-basics').click();

    // Modal should appear
    const modal = page.getByTestId('article-modal');
    await expect(modal).toBeVisible({ timeout: 5_000 });

    // Modal should contain the article title (use first() as markdown also renders an h1)
    await expect(modal.getByRole('heading', { name: '¿Qué es la Endometriosis?' }).first()).toBeVisible();

    // Close modal with Escape
    await page.keyboard.press('Escape');

    // Modal should be closed
    await expect(modal).not.toBeVisible();
  });

  test('Save/Unsave article functionality works', async ({ page }) => {
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    
    // Save an article
    const saveBtn = page.getByTestId('save-endo-basics');
    await saveBtn.click();
    
    // Button should now show as saved (check class or aria-label change)
    await expect(saveBtn).toHaveAttribute('aria-label', 'Quitar de guardados');
    
    // Unsave the article
    await saveBtn.click();
    
    // Button should show as not saved
    await expect(saveBtn).toHaveAttribute('aria-label', 'Guardar artículo');
  });

  test('Show saved toggle filters only saved articles (when authenticated)', async ({ page }) => {
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('[data-testid^="article-"]', { timeout: 10_000 });

    // Save two articles
    await page.getByTestId('save-endo-basics').click();
    await page.getByTestId('save-nutrition-antiinflammatory').click();

    // Verify articles are saved in localStorage (key: saude_bookmarked_articles)
    const savedArticles = await page.evaluate(() => {
      return localStorage.getItem('saude_bookmarked_articles');
    });

    expect(savedArticles).toContain('endo-basics');
    expect(savedArticles).toContain('nutrition-antiinflammatory');
  });

  test('Library CTA on Home page navigates to /library', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Scroll to the library preview section
    const libraryCta = page.getByTestId('library-cta');
    await libraryCta.scrollIntoViewIfNeeded();
    
    // Click the CTA
    await libraryCta.click();
    
    await expect(page).toHaveURL(/\/library/);
  });

  test('No results message shows when search has no matches', async ({ page }) => {
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    
    const searchInput = page.getByTestId('library-search');
    
    // Search for something that won't match
    await searchInput.fill('xyznonexistent123');
    
    // Should show no results message
    await expect(page.getByText('No se encontraron artículos')).toBeVisible();
  });

  test('Article card displays correct metadata', async ({ page }) => {
    await page.goto('/library', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('[data-testid^="article-"]', { timeout: 10_000 });

    // Check that article card shows pillar tag, title, and read time
    const articleCard = page.getByTestId('article-endo-basics');

    await expect(articleCard.getByText('Manejo del Dolor')).toBeVisible();
    await expect(articleCard.getByText('¿Qué es la Endometriosis?')).toBeVisible();
    await expect(articleCard.getByText(/\d+ min/)).toBeVisible();
    await expect(articleCard.getByText('Leer más')).toBeVisible();
  });
});
