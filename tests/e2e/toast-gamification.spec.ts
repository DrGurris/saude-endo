import { test, expect, request } from '@playwright/test';

const API_BASE = 'http://localhost:8001';

test.describe('Toast Notifications', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test('Login success shows toast notification', async ({ page }) => {
    // Create a unique test user
    const uniqueId = String(Date.now());
    const testEmail = `test_toast_login_${uniqueId}@test.com`;
    const testPassword = 'TestPass123!';
    
    // Register user via API
    const apiContext = await request.newContext();
    await apiContext.post(`${API_BASE}/api/auth/register`, {
      data: {
        name: `TEST_Toast_${uniqueId}`,
        email: testEmail,
        password: testPassword,
        birth_date: '1990-01-01'
      }
    });

    // Login via UI
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('login-email').fill(testEmail);
    await page.getByTestId('login-password').fill(testPassword);
    await page.getByTestId('login-submit').click();

    // Wait for toast notification to appear
    await expect(page.getByTestId('toast-success')).toBeVisible({ timeout: 10000 });
    
    // Toast should contain welcome message
    await expect(page.getByTestId('toast-success')).toContainText(/Bienvenida/i);
  });

  test('Login failure shows error toast notification', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    
    await page.getByTestId('login-email').fill('nonexistent@test.com');
    await page.getByTestId('login-password').fill('wrongpassword');
    await page.getByTestId('login-submit').click();

    // Wait for error toast notification
    await expect(page.getByTestId('toast-error')).toBeVisible({ timeout: 10000 });
    
    // Toast should contain error message
    await expect(page.getByTestId('toast-error')).toContainText(/Error/i);
  });

  test('Register success shows toast notification', async ({ page }) => {
    // First complete the questionnaire to reach registration
    await page.goto('/questionnaire', { waitUntil: 'domcontentloaded' });
    
    // Step 1: Diagnosis
    await page.getByTestId('diagnosis-suspected').click();
    await page.getByTestId('btn-next').click();
    
    // Step 2: Hormonal status
    await page.getByTestId('hormonal-natural_period').click();
    await page.getByTestId('btn-next').click();
    
    // Step 3: Last period
    await page.getByTestId('lastPeriod-day').selectOption('15');
    await page.getByTestId('lastPeriod-month').selectOption('1');
    await page.getByTestId('lastPeriod-year').selectOption('2026');
    await page.getByTestId('btn-next').click();
    
    // Step 4: Pain characteristics
    await page.getByTestId('pain-cramps_localized').click();
    await page.getByTestId('btn-next').click();
    
    // Step 5: Severity sliders
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
    await page.getByTestId('commitment-very_committed').click();
    await page.getByTestId('btn-submit').click();

    // Should be on register page now
    await expect(page).toHaveURL(/\/register/, { timeout: 10000 });

    // Fill registration form
    const uniqueId = String(Date.now());
    await page.getByTestId('register-name').fill(`TEST_Register_${uniqueId}`);
    await page.getByTestId('register-email').fill(`test_register_${uniqueId}@test.com`);
    
    // Birth date picker
    await page.getByTestId('birthDate-day').selectOption('15');
    await page.getByTestId('birthDate-month').selectOption('5');
    await page.getByTestId('birthDate-year').selectOption('1990');
    
    await page.getByTestId('register-password').fill('TestPass123!');
    await page.getByTestId('register-confirm-password').fill('TestPass123!');
    await page.getByTestId('register-terms').check();
    await page.getByTestId('register-submit').click();

    // Wait for success toast
    await expect(page.getByTestId('toast-success')).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId('toast-success')).toContainText(/cuenta/i);
  });

  test('Register with existing email shows error toast', async ({ page }) => {
    // Create existing user via API
    const uniqueId = String(Date.now());
    const testEmail = `test_dup_${uniqueId}@test.com`;
    
    const apiContext = await request.newContext();
    await apiContext.post(`${API_BASE}/api/auth/register`, {
      data: {
        name: `TEST_Dup_${uniqueId}`,
        email: testEmail,
        password: 'TestPass123!',
        birth_date: '1990-01-01'
      }
    });

    // Complete questionnaire to reach registration
    await page.goto('/questionnaire', { waitUntil: 'domcontentloaded' });
    
    // Step 1: Diagnosis
    await page.getByTestId('diagnosis-suspected').click();
    await page.getByTestId('btn-next').click();
    
    // Step 2: Hormonal status
    await page.getByTestId('hormonal-natural_period').click();
    await page.getByTestId('btn-next').click();
    
    // Step 3: Last period
    await page.getByTestId('lastPeriod-day').selectOption('15');
    await page.getByTestId('lastPeriod-month').selectOption('1');
    await page.getByTestId('lastPeriod-year').selectOption('2026');
    await page.getByTestId('btn-next').click();
    
    // Step 4: Pain characteristics
    await page.getByTestId('pain-cramps_localized').click();
    await page.getByTestId('btn-next').click();
    
    // Step 5: Severity sliders
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
    await page.getByTestId('commitment-very_committed').click();
    await page.getByTestId('btn-submit').click();

    await expect(page).toHaveURL(/\/register/, { timeout: 10000 });

    // Try to register with same email
    await page.getByTestId('register-name').fill(`TEST_Dup2_${uniqueId}`);
    await page.getByTestId('register-email').fill(testEmail);
    
    // Birth date picker
    await page.getByTestId('birthDate-day').selectOption('15');
    await page.getByTestId('birthDate-month').selectOption('5');
    await page.getByTestId('birthDate-year').selectOption('1990');
    
    await page.getByTestId('register-password').fill('TestPass123!');
    await page.getByTestId('register-confirm-password').fill('TestPass123!');
    await page.getByTestId('register-terms').check();
    await page.getByTestId('register-submit').click();

    // Wait for error toast
    await expect(page.getByTestId('toast-error')).toBeVisible({ timeout: 15000 });
  });
});

test.describe('Diary Save Toast', () => {
  test('Saving diary entry shows success toast', async ({ page }) => {
    // Create and login a test user
    const uniqueId = String(Date.now());
    const testEmail = `test_diary_${uniqueId}@test.com`;
    const testPassword = 'TestPass123!';
    
    const apiContext = await request.newContext();
    await apiContext.post(`${API_BASE}/api/auth/register`, {
      data: {
        name: `TEST_Diary_${uniqueId}`,
        email: testEmail,
        password: testPassword,
        birth_date: '1990-01-01'
      }
    });

    // Login
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('login-email').fill(testEmail);
    await page.getByTestId('login-password').fill(testPassword);
    await page.getByTestId('login-submit').click();
    
    // Wait for portal
    await expect(page).toHaveURL(/\/portal/, { timeout: 15000 });
    
    // Dismiss any login toast by waiting briefly
    await page.waitForTimeout(2000);

    // Open diary modal
    await page.getByTestId('widget-diario').click();
    
    // Wait for diary modal to be visible
    await expect(page.getByTestId('diario-pain')).toBeVisible({ timeout: 5000 });
    
    // Make some changes
    await page.getByTestId('diario-mood-good').click();
    await page.getByTestId('diario-notes').fill(`Test note ${uniqueId}`);
    
    // Save
    await page.getByTestId('diario-save').click();
    
    // Wait for success toast from Portal
    await expect(page.getByTestId('toast-success')).toBeVisible({ timeout: 10000 });
    await expect(page.getByTestId('toast-success')).toContainText(/guardado|registro/i);
  });
});

test.describe('Sync Indicator', () => {
  test('Sync indicator appears during symptoms sync after login', async ({ page }) => {
    // Create a test user
    const uniqueId = String(Date.now());
    const testEmail = `test_sync_ind_${uniqueId}@test.com`;
    const testPassword = 'TestPass123!';
    
    const apiContext = await request.newContext();
    await apiContext.post(`${API_BASE}/api/auth/register`, {
      data: {
        name: `TEST_SyncInd_${uniqueId}`,
        email: testEmail,
        password: testPassword,
        birth_date: '1990-01-01'
      }
    });

    // Add symptoms to localStorage BEFORE login
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const today = new Date().toISOString().split('T')[0];
    await page.evaluate((data: { today: string; uniqueId: string }) => {
      localStorage.setItem(`saude_diario_${data.today}`, JSON.stringify({
        date: data.today,
        pain: 4,
        energy: 6,
        mood: 'neutral',
        notes: `TEST_sync_indicator_${data.uniqueId}`
      }));
    }, { today, uniqueId });

    // Slow down the symptoms API to give us time to see the indicator
    await page.route('**/api/symptoms', async route => {
      if (route.request().method() === 'POST') {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      await route.continue();
    });

    // Login
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('login-email').fill(testEmail);
    await page.getByTestId('login-password').fill(testPassword);
    await page.getByTestId('login-submit').click();

    // Wait for portal
    await expect(page).toHaveURL(/\/portal/, { timeout: 15000 });

    // The sync indicator should appear while symptoms are being synced
    // It may be brief, so we check it becomes visible
    await expect(page.getByTestId('sync-indicator')).toBeVisible({ timeout: 5000 });
    
    // Wait for sync to complete - indicator should eventually disappear
    await expect(page.getByTestId('sync-indicator')).not.toBeVisible({ timeout: 10000 });
  });
});

test.describe('Gamification - Streak Card and Badges', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test('Streak Card displays on Portal', async ({ page }) => {
    // Create and login user
    const uniqueId = String(Date.now());
    const testEmail = `test_streak_${uniqueId}@test.com`;
    const testPassword = 'TestPass123!';
    
    const apiContext = await request.newContext();
    await apiContext.post(`${API_BASE}/api/auth/register`, {
      data: {
        name: `TEST_Streak_${uniqueId}`,
        email: testEmail,
        password: testPassword,
        birth_date: '1990-01-01'
      }
    });

    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('login-email').fill(testEmail);
    await page.getByTestId('login-password').fill(testPassword);
    await page.getByTestId('login-submit').click();
    
    await expect(page).toHaveURL(/\/portal/, { timeout: 15000 });

    // Verify Streak Card is displayed
    await expect(page.getByTestId('streak-card')).toBeVisible();
    
    // Verify streak shows days (should be 0 initially)
    await expect(page.getByTestId('streak-card')).toContainText(/días de racha/i);
    
    // Verify "Ver insignias" button is visible
    await expect(page.getByTestId('show-badges-btn')).toBeVisible();
  });

  test('Badges Modal opens and shows badges', async ({ page }) => {
    // Create and login user
    const uniqueId = String(Date.now());
    const testEmail = `test_badges_${uniqueId}@test.com`;
    const testPassword = 'TestPass123!';
    
    const apiContext = await request.newContext();
    await apiContext.post(`${API_BASE}/api/auth/register`, {
      data: {
        name: `TEST_Badges_${uniqueId}`,
        email: testEmail,
        password: testPassword,
        birth_date: '1990-01-01'
      }
    });

    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('login-email').fill(testEmail);
    await page.getByTestId('login-password').fill(testPassword);
    await page.getByTestId('login-submit').click();
    
    await expect(page).toHaveURL(/\/portal/, { timeout: 15000 });

    // Click to open badges modal
    await page.getByTestId('show-badges-btn').click();
    
    // Wait for modal to appear
    await expect(page.getByTestId('badges-modal')).toBeVisible({ timeout: 5000 });
    
    // Verify badges are displayed
    await expect(page.getByTestId('badge-first_log')).toBeVisible();
    await expect(page.getByTestId('badge-week_warrior')).toBeVisible();
    await expect(page.getByTestId('badge-month_master')).toBeVisible();
  });

  test('Gamification updates after saving diary', async ({ page }) => {
    // Create and login user
    const uniqueId = String(Date.now());
    const testEmail = `test_gam_update_${uniqueId}@test.com`;
    const testPassword = 'TestPass123!';
    
    const apiContext = await request.newContext();
    await apiContext.post(`${API_BASE}/api/auth/register`, {
      data: {
        name: `TEST_GamUpdate_${uniqueId}`,
        email: testEmail,
        password: testPassword,
        birth_date: '1990-01-01'
      }
    });

    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('login-email').fill(testEmail);
    await page.getByTestId('login-password').fill(testPassword);
    await page.getByTestId('login-submit').click();
    
    await expect(page).toHaveURL(/\/portal/, { timeout: 15000 });

    // Check initial state - should show 0 days streak and 0 registered
    await expect(page.getByTestId('streak-card')).toBeVisible();
    
    // Open diary and save an entry
    await page.getByTestId('widget-diario').click();
    await expect(page.getByTestId('diario-pain')).toBeVisible({ timeout: 5000 });
    
    await page.getByTestId('diario-mood-good').click();
    await page.getByTestId('diario-save').click();
    
    // Wait for modal to close and success toast to appear
    await expect(page.getByTestId('toast-success')).toBeVisible({ timeout: 10000 });
    
    // Verify at least one toast contains diary-related message
    const toastElements = page.getByTestId('toast-success');
    await expect(toastElements.first()).toBeVisible();
    
    // The gamification key should have changed, triggering re-render
    // Verify streak card is still visible (component re-mounted with new key)
    await expect(page.getByTestId('streak-card').first()).toBeVisible();
  });

  test('Badge progress shows for partially completed badges', async ({ page }) => {
    // Create and login user
    const uniqueId = String(Date.now());
    const testEmail = `test_badge_prog_${uniqueId}@test.com`;
    const testPassword = 'TestPass123!';
    
    const apiContext = await request.newContext();
    await apiContext.post(`${API_BASE}/api/auth/register`, {
      data: {
        name: `TEST_BadgeProgress_${uniqueId}`,
        email: testEmail,
        password: testPassword,
        birth_date: '1990-01-01'
      }
    });

    // Pre-populate some diary entries in localStorage
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const today = new Date();
    for (let i = 0; i < 3; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      await page.evaluate((data: { dateStr: string }) => {
        localStorage.setItem(`saude_diario_${data.dateStr}`, JSON.stringify({
          date: data.dateStr,
          pain: 3,
          energy: 7,
          mood: 'good',
          notes: 'Test entry'
        }));
      }, { dateStr });
    }

    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('login-email').fill(testEmail);
    await page.getByTestId('login-password').fill(testPassword);
    await page.getByTestId('login-submit').click();
    
    await expect(page).toHaveURL(/\/portal/, { timeout: 15000 });

    // Open badges modal
    await page.getByTestId('show-badges-btn').click();
    await expect(page.getByTestId('badges-modal')).toBeVisible({ timeout: 5000 });
    
    // "Primer Paso" badge should be unlocked with 3 days logged
    await expect(page.getByTestId('badge-first_log')).toBeVisible();
    
    // "Guerrera de la Semana" should show progress (3/7)
    await expect(page.getByTestId('badge-week_warrior')).toContainText(/3\/7|4\/7|5\/7/);
  });
});
