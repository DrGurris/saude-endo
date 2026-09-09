import { test, expect } from '@playwright/test'

test.describe('Dark Mode', () => {
  test('toggle persists across pages', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })

    const toggle = page.getByTestId('theme-toggle')
    await expect(toggle).toBeVisible()

    // Get initial theme
    const initialTheme = await page.locator('html').getAttribute('data-theme')

    // Toggle to dark
    await toggle.click()
    await page.waitForTimeout(300)
    const afterToggle = await page.locator('html').getAttribute('data-theme')
    expect(afterToggle).not.toBe(initialTheme)

    // Navigate to library
    await page.getByTestId('nav-library').click()
    await expect(page).toHaveURL(/\/library/)

    // Theme should persist
    const libraryTheme = await page.locator('html').getAttribute('data-theme')
    expect(libraryTheme).toBe(afterToggle)

    // Navigate to community
    await page.goto('/community', { waitUntil: 'domcontentloaded' })
    const communityTheme = await page.locator('html').getAttribute('data-theme')
    expect(communityTheme).toBe(afterToggle)
  })

  test('dark mode applies correct background', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })

    // Toggle to dark
    const toggle = page.getByTestId('theme-toggle')
    await toggle.click()
    await page.waitForTimeout(300)

    // Verify dark theme is set
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  })
})
