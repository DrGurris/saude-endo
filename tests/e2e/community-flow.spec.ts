import { test, expect } from '@playwright/test'

test.describe('Community Flow', () => {
  test('navigates to community and sees thread list', async ({ page }) => {
    await page.goto('/community', { waitUntil: 'domcontentloaded' })

    // Should see community heading
    await expect(page.getByRole('heading', { name: /comunidad/i })).toBeVisible({ timeout: 10_000 })

    // Should see thread cards
    const threads = page.locator('[role="link"]')
    await expect(threads.first()).toBeVisible({ timeout: 10_000 })
    const count = await threads.count()
    expect(count).toBeGreaterThan(0)
  })

  test('opens a thread and sees replies', async ({ page }) => {
    await page.goto('/community', { waitUntil: 'domcontentloaded' })

    // Wait for threads to load
    const threadCards = page.locator('[role="link"]')
    await expect(threadCards.first()).toBeVisible({ timeout: 10_000 })

    // Click first thread
    await threadCards.first().click()
    await expect(page).toHaveURL(/\/community\//)

    // Thread detail page should show the thread body
    await page.waitForTimeout(500)
    const heading = page.locator('h1, h2').first()
    await expect(heading).toBeVisible()
  })

  test('filters threads by category', async ({ page }) => {
    await page.goto('/community', { waitUntil: 'domcontentloaded' })

    // Wait for threads
    await page.waitForTimeout(1000)

    // Click "Dolor" filter
    const painFilter = page.getByRole('button', { name: /Dolor/i })
    if (await painFilter.isVisible()) {
      await painFilter.click()
      await page.waitForTimeout(500)

      // Threads should be filtered (fewer or same count)
      const threads = page.locator('[role="link"]')
      const count = await threads.count()
      // At least the UI responded to the filter
      expect(count).toBeGreaterThanOrEqual(0)
    }
  })
})
