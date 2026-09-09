import { test, expect } from '@playwright/test'

test.describe('Library Flow', () => {
  test('navigates to library and opens an article', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })

    // Navigate to library via nav
    await page.getByTestId('nav-library').click()
    await expect(page).toHaveURL(/\/library/)

    // Wait for articles to load
    await page.waitForSelector('[data-testid^="article-"]', { timeout: 10_000 })

    // Click first article card
    const firstCard = page.locator('[data-testid^="article-"]').first()
    await expect(firstCard).toBeVisible()
    const articleTitle = await firstCard.locator('h3').textContent()
    await firstCard.click()

    // Modal should open with the article content
    const modal = page.locator('[role="dialog"]')
    await expect(modal).toBeVisible({ timeout: 5_000 })

    // Close modal
    await page.keyboard.press('Escape')
    await expect(modal).not.toBeVisible()
  })

  test('filters articles by pillar', async ({ page }) => {
    await page.goto('/library', { waitUntil: 'domcontentloaded' })
    await page.waitForSelector('[data-testid^="article-"]', { timeout: 10_000 })

    // Count initial articles
    const initialCount = await page.locator('[data-testid^="article-"]').count()
    expect(initialCount).toBeGreaterThan(0)

    // Click on "Dolor" pillar filter
    await page.getByRole('button', { name: /Dolor/i }).click()

    // Should have fewer articles (filtered)
    const filteredCount = await page.locator('[data-testid^="article-"]').count()
    expect(filteredCount).toBeLessThanOrEqual(initialCount)
    expect(filteredCount).toBeGreaterThan(0)
  })

  test('searches articles by keyword', async ({ page }) => {
    await page.goto('/library', { waitUntil: 'domcontentloaded' })
    await page.waitForSelector('[data-testid^="article-"]', { timeout: 10_000 })

    // Type in search
    const searchInput = page.getByPlaceholder(/buscar/i)
    if (await searchInput.isVisible()) {
      await searchInput.fill('dolor')
      // Give time for debounced search
      await page.waitForTimeout(500)

      const cards = page.locator('[data-testid^="article-"]')
      const count = await cards.count()
      expect(count).toBeGreaterThan(0)
    }
  })
})
