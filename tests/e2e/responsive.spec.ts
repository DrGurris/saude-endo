import { test, expect } from '@playwright/test'

test.describe('Mobile Responsive (375px)', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test('home page renders on mobile', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })

    // Hero CTA should be visible
    await expect(page.getByTestId('hero-cta-btn')).toBeVisible()

    // Nav should still be accessible (may be collapsed)
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
  })

  test('library works on mobile', async ({ page }) => {
    await page.goto('/library', { waitUntil: 'domcontentloaded' })

    // Articles should render in single column
    await page.waitForSelector('[data-testid^="article-"]', { timeout: 10_000 })
    const cards = page.locator('[data-testid^="article-"]')
    const count = await cards.count()
    expect(count).toBeGreaterThan(0)
  })

  test('community page renders on mobile', async ({ page }) => {
    await page.goto('/community', { waitUntil: 'domcontentloaded' })

    // Community heading should be visible
    await expect(page.getByRole('heading', { name: /comunidad/i })).toBeVisible({ timeout: 10_000 })
  })

  test('legal pages render on mobile', async ({ page }) => {
    await page.goto('/terms', { waitUntil: 'domcontentloaded' })
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    await page.goto('/privacy', { waitUntil: 'domcontentloaded' })
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
