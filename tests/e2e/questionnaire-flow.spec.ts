import { test, expect } from '@playwright/test';

test.describe('Questionnaire Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/questionnaire', { waitUntil: 'domcontentloaded' });
  });

  test('Questionnaire step 1 loads correctly', async ({ page }) => {
    // Step 1: Tu diagnóstico
    await expect(page.getByTestId('step-title-1')).toBeVisible();
    await expect(page.getByTestId('step-title-1')).toHaveText('Tu diagnóstico');
    
    // Verify diagnosis options are visible
    await expect(page.getByTestId('diagnosis-confirmed')).toBeVisible();
    await expect(page.getByTestId('diagnosis-suspected')).toBeVisible();
    await expect(page.getByTestId('diagnosis-adenomyosis')).toBeVisible();
    await expect(page.getByTestId('diagnosis-unsure')).toBeVisible();
  });

  test('Next button is disabled without selection', async ({ page }) => {
    const nextBtn = page.getByTestId('btn-next');
    await expect(nextBtn).toBeDisabled();
  });

  test('Selecting diagnosis enables next button', async ({ page }) => {
    await page.getByTestId('diagnosis-confirmed').click();
    
    const nextBtn = page.getByTestId('btn-next');
    await expect(nextBtn).toBeEnabled();
  });

  test('Can navigate through questionnaire steps', async ({ page }) => {
    // Step 1: Select diagnosis
    await page.getByTestId('diagnosis-suspected').click();
    await page.getByTestId('btn-next').click();
    
    // Step 2: Estado hormonal
    await expect(page.getByTestId('step-title-2')).toBeVisible();
    await expect(page.getByTestId('step-title-2')).toHaveText('Estado hormonal');
    
    await page.getByTestId('hormonal-natural_period').click();
    await page.getByTestId('btn-next').click();
    
    // Step 3: Último periodo (date picker)
    await expect(page.getByTestId('step-title-3')).toBeVisible();
    await expect(page.getByTestId('step-title-3')).toHaveText('Último periodo');
  });

  test('Back button returns to previous step', async ({ page }) => {
    // Step 1: Select and proceed
    await page.getByTestId('diagnosis-confirmed').click();
    await page.getByTestId('btn-next').click();
    
    // Step 2: Go back
    await page.getByTestId('btn-prev').click();
    
    // Should be back at step 1
    await expect(page.getByTestId('step-title-1')).toBeVisible();
  });

  test('Complete questionnaire flow to registration', async ({ page }) => {
    // Step 1: Diagnosis
    await page.getByTestId('diagnosis-suspected').click();
    await page.getByTestId('btn-next').click();
    
    // Step 2: Hormonal status
    await page.getByTestId('hormonal-natural_period').click();
    await page.getByTestId('btn-next').click();
    
    // Step 3: Last period - use date picker
    // Set day, month, year using the DatePicker selects
    await page.getByTestId('lastPeriod-day').selectOption('15');
    await page.getByTestId('lastPeriod-month').selectOption('1'); // January (0-indexed)
    await page.getByTestId('lastPeriod-year').selectOption('2026');
    await page.getByTestId('btn-next').click();
    
    // Step 4: Pain characteristics (select multiple)
    await page.getByTestId('pain-cramps_localized').click();
    await page.getByTestId('pain-worse_with_menstruation').click();
    await page.getByTestId('pain-burning_sensation').click();
    await page.getByTestId('btn-next').click();
    
    // Step 5: Severity sliders - set values
    await page.getByTestId('severity-pelvic').fill('7');
    await page.getByTestId('severity-nervous').fill('5');
    await page.getByTestId('severity-fatigue').fill('6');
    await page.getByTestId('severity-digestive').fill('4');
    await page.getByTestId('severity-mood').fill('5');
    await page.getByTestId('btn-next').click();
    
    // Step 6: Goal
    await page.getByTestId('goal-reduce_pain').click();
    await page.getByTestId('btn-next').click();
    
    // Step 7: Commitment
    await expect(page.getByTestId('step-title-7')).toBeVisible();
    await page.getByTestId('commitment-very_committed').click();
    
    // Submit button should be visible on last step
    await expect(page.getByTestId('btn-submit')).toBeEnabled();
    await page.getByTestId('btn-submit').click();
    
    // Should navigate to register page
    await expect(page).toHaveURL(/\/register/);
    
    // Registration form should now be visible (since phenotype is set)
    await expect(page.getByTestId('register-name')).toBeVisible();
  });
});
